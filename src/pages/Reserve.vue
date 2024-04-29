<template>
  <div class="page-container-placement">
    <ScheduleXCalendar :calendar-app="calendarApp" class="calendar">
      <template
        #timeGridEvent="{ calendarEvent }: { calendarEvent: CalendarEvent }"
      >
        <div class="event">
          {{ getEventTime(calendarEvent.start, calendarEvent.end) }}

          <div
            v-if="calendarEvent.isEditable"
            class="flex gap-1 absolute right-1"
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
import { createCalendar, viewWeek, CalendarEvent } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import { formatEventTime, toStartOfHour } from '@/services/dateService.ts';
import { onMounted } from 'vue';
import { PostReservation, Reservation } from '@/types/Reservation.ts';
import { useSportFieldStore } from '@/stores/SportFieldStore.ts';
import { useRoute } from 'vue-router';
import { addHours, format } from 'date-fns';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createResizePlugin } from '@schedule-x/resize';
import { useReservationStore } from '@/stores/ReservationStore.ts';
import { useUserStore } from '@/stores/UserStore.ts';
import { instanceOfUser, User } from '@/types/User.ts';

const sportFieldStore = useSportFieldStore();
const reservationStore = useReservationStore();
const userStore = useUserStore();
const route = useRoute();

const calendarApp = createCalendar({
  locale: 'de-CH',
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  views: [viewWeek],
  defaultView: viewWeek.name,
  dayBoundaries: {
    start: '08:00',
    end: '22:00',
  },
  weekOptions: {
    gridHeight: 700,
  },
  me: {
    colorName: 'me',
  },
  others: {
    colorName: 'others',
  },
  callbacks: {
    async onClickDateTime(dateTime: string) {
      const startDateTime = formatEventTime(toStartOfHour(new Date(dateTime)));

      const event: CalendarEvent = {
        id: Date.now().toString(),
        start: startDateTime,
        end: formatEventTime(addHours(new Date(startDateTime), 1)),
        isEditable: true,
        calendarId: 'me',
      };

      calendarApp.events.add(event);
    },
  },
  events: [],
  plugins: [createDragAndDropPlugin(), createResizePlugin()],
});

onMounted(async () => {
  const sportFieldId: string = route.params.id as string;
  await sportFieldStore.loadReservationsBySportField(sportFieldId);
  const reservations: Reservation[] =
    sportFieldStore.selectedSportField?.reservations || [];

  const events = reservationsToCalenderEvents(reservations);
  calendarApp.events.set(events);
});

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
        calendarId: isMyReservation(reservation) ? 'me' : 'others',
      };
    }) || []
  );
};

const getEventTime = (start: string, end: string): string => {
  return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
};

const reserve = (event: CalendarEvent) => {
  if (!sportFieldStore.selectedSportField) {
    console.error('selectedSportField is undefined!');
    // TODO: implement error handling
    return;
  }

  const reservation: PostReservation = {
    sportField: sportFieldStore.selectedSportField.id,
    start: new Date(event.start),
    end: new Date(event.end),
  };

  reservationStore.createReservation(reservation);
};

const cancel = (event: CalendarEvent) => {
  calendarApp.events.remove(event.id);
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
}
</style>
