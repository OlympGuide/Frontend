<template>
  <div class="page-container-placement">
    <p class="page-title">Reservieren</p>

    <ScheduleXCalendar :calendar-app="calendarApp" class="calendar">
      <template
        #timeGridEvent="{ calendarEvent }: { calendarEvent: CalendarEvent }"
      >
        <div class="event">
          {{ getEventTime(calendarEvent.start, calendarEvent.end) }}

          <div class="flex gap-1 absolute right-1">
            <a @click="reserve(calendarEvent)"
              ><i class="pi pi-check" style="font-size: 0.7rem"></i
            ></a>
            <a @click="cancel(calendarEvent)"
              ><i class="pi pi-times" style="font-size: 0.7rem"></i
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
import {
  formatEventTime,
  toLocalDate,
  toStartOfHour,
} from '@/services/dateService.ts';
import { onMounted, ref } from 'vue';
import { PostReservation, Reservation } from '@/types/Reservation.ts';
import { useSportFieldStore } from '@/stores/SportFieldStore.ts';
import { useRoute } from 'vue-router';
import { addHours, format } from 'date-fns';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createResizePlugin } from '@schedule-x/resize';
import { useReservationStore } from '@/stores/ReservationStore.ts';

const sportFieldStore = useSportFieldStore();
const reservationStore = useReservationStore();
const route = useRoute();

const reservations = ref<Reservation[]>([]);

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
  callbacks: {
    async onClickDateTime(dateTime: string) {
      const startDateTime = formatEventTime(toStartOfHour(new Date(dateTime)));

      const event: CalendarEvent = {
        id: Date.now().toString(),
        start: startDateTime,
        end: formatEventTime(addHours(new Date(startDateTime), 1)),
      };

      calendarApp.events.add(event);
    },
  },
  events: [],
  plugins: [createDragAndDropPlugin(), createResizePlugin()],
});

onMounted(() => {
  const sportFieldId: string = route.params.id as string;
  sportFieldStore.loadSelectedSportField(sportFieldId);

  reservations.value = [
    {
      id: 'blabla',
      user: {
        id: 'user',
        name: 'Dario Aubry',
        displayName: 'Dario Aubry',
        roles: [0],
      },
      start: new Date(),
      end: addHours(new Date(), 1),
    },
  ];

  const events = reservationsToCalenderEvents();
  calendarApp.events.set(events);
});

const reservationsToCalenderEvents = (): CalendarEvent[] => {
  return reservations.value.map((reservation: Reservation) => {
    return {
      id: reservation.id,
      start: formatEventTime(reservation.start),
      end: formatEventTime(reservation.end),
    };
  });
};

const getEventTime = (start: string, end: string): string => {
  return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
};

const reserve = (event: CalendarEvent) => {
  if (!sportFieldStore.selectedSportField) {
    console.error('selectedSportField is undefined!');
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
