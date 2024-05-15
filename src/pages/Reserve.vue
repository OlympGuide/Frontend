<template>
  <div class="page-container-placement">
    <ScheduleXCalendar :calendar-app="calendarApp" class="calendar">
      <template
        #timeGridEvent="{ calendarEvent }: { calendarEvent: CalendarEvent }"
      >
        <div
          class="event"
          :class="getEventClassName(calendarEvent, reservationId)"
        >
          {{ getEventTime(calendarEvent.start, calendarEvent.end) }}

          <div
            v-if="calendarEvent.isEditable"
            class="flex gap-1 absolute right-1 z-[1000]"
          >
            <a @click="reserve(calendarEvent)"
              ><i class="pi pi-check" style="font-size: 0.7rem"></i
            ></a>
            <a @click="cancel(calendarEvent)"
              ><i class="pi pi-trash" style="font-size: 0.7rem"></i
            ></a>
          </div>
        </div>
      </template>
    </ScheduleXCalendar>
  </div>
</template>

<script setup lang="ts">
import { ScheduleXCalendar } from '@schedule-x/vue';
import { CalendarEvent } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import { formatEventTime } from '@/services/dateService.ts';
import { onMounted, watch } from 'vue';
import {
  PostReservation,
  Reservation,
  ReservationType,
  UpdateReservation,
} from '@/types/Reservation.ts';
import { useSportFieldStore } from '@/stores/SportFieldStore.ts';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import { useReservationStore } from '@/stores/ReservationStore.ts';
import { useUserStore } from '@/stores/UserStore.ts';
import { instanceOfUser } from '@/types/User.ts';
import { storeToRefs } from 'pinia';
import { calendarApp } from '@/services/reservationService.ts';

const sportFieldStore = useSportFieldStore();
const reservationStore = useReservationStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const route = useRoute();

const reservationId: string = route.params.reservationId as string;

onMounted(async () => {
  await loadReservations();
});

watch(user, () => {
  const reservations: Reservation[] =
    sportFieldStore.selectedSportField?.reservations || [];

  const events = reservationsToCalenderEvents(reservations);
  calendarApp.events.set(events);
});

const loadReservations = async () => {
  const sportFieldId: string = route.params.id as string;
  await sportFieldStore.loadReservationsBySportField(sportFieldId);
  const reservations: Reservation[] =
    sportFieldStore.selectedSportField?.reservations || [];

  const events = reservationsToCalenderEvents(reservations);
  calendarApp.events.set(events);
};

const reservationsToCalenderEvents = (
  reservations: Reservation[]
): CalendarEvent[] => {
  return (
    reservations?.map((reservation: Reservation) => {
      return {
        id: reservation.id,
        start: formatEventTime(reservation.start),
        end: formatEventTime(reservation.end),
        isEditable: isMyReservation(reservation),
        isNew: false,
        calendarId: isMyReservation(reservation)
          ? ReservationType.ME
          : ReservationType.OTHERS,
      };
    }) || []
  );
};

const getEventTime = (start: string, end: string): string => {
  return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
};

const getEventClassName = (calendarEvent: CalendarEvent, reservationId: string): string => {
  let className = '';
  if (calendarEvent.calendarId === ReservationType.OTHERS) {
    className =  ReservationType.OTHERS;
  } else if (reservationId && calendarEvent.id === reservationId) {
    className =  `${ReservationType.ME}-selected`;
  } else {
    className =  ReservationType.ME;
  }
  return className;
}


const reserve = async (event: CalendarEvent) => {
  if (event.isNew) {
    await createNewReservation(event);
  } else {
    await updateReservation(event);
  }
};

const createNewReservation = async (event: CalendarEvent) => {
  if (!sportFieldStore.selectedSportField) {
    console.error('selectedSportField is undefined!');
    sportFieldStore.errorMessage = 'Sportfeld nicht gefunden.';
    return;
  }

  const reservation: PostReservation = {
    sportFieldId: sportFieldStore.selectedSportField.id,
    start: new Date(event.start),
    end: new Date(event.end),
  };

  const newReservation = await reservationStore.createReservation(reservation);

  if (!newReservation) {
    return;
  }

  event.isNew = false;
  event.id = newReservation.id;

  calendarApp.events.update(event);
};

const updateReservation = async (event: CalendarEvent) => {
  if (!sportFieldStore.selectedSportField) {
    console.error('selectedSportField is undefined!');
    sportFieldStore.errorMessage = 'Sportfeld nicht gefunden.';
    return;
  }

  const reservation: UpdateReservation = {
    id: event.id.toString(),
    sportFieldId: sportFieldStore.selectedSportField.id,
    start: new Date(event.start),
    end: new Date(event.end),
  };

  await reservationStore.updateReservation(reservation);
};

const cancel = async (event: CalendarEvent) => {
  if (event.isNew) {
    calendarApp.events.remove(event.id);
  } else {
    await reservationStore.removeReservation(event.id.toString());
    await loadReservations();
  }
};

const isMyReservation = (reservation: Reservation): boolean => {
  if (!instanceOfUser(userStore.user)) {
    return false;
  }

  return reservation.user.id === userStore.user.id;
};
</script>

<style lang="scss">
.calendar {
  --sx-color-primary: theme('colors.primaryRed');

  .sx__time-grid-event {
    overflow: visible !important;
  }

  .event {
    border-radius: 4px;
    background-color: theme('colors.primaryRedLight');
    color: white;
    padding: 0.2rem;
    width: 100%;
    height: 100%;

    div {
      bottom: -5px;
    }

    a {
      background-color: theme('colors.primaryRed');
      @apply flex justify-center items-center w-5 h-5 rounded-full shadow hover:cursor-pointer;
    }
  }

  .others {
    background-color: #6868c6;
  }

  .me {
    background-color: theme('colors.primaryRedLight');
  }

  .me-selected {
    background-color: theme('colors.primaryRedDark');
  }
}
</style>
