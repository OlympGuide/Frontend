<template>
  <div class="page-container-placement">
    <p class="page-title">Reservieren</p>

    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>

<script setup lang="ts">
import { ScheduleXCalendar } from '@schedule-x/vue';
import { createCalendar, viewWeek, CalendarEvent } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import { formatEventTime, toStartOfHour } from '@/services/dateService.ts';
import { onMounted, ref } from 'vue';
import { Reservation } from '@/types/Reservation.ts';
import { useSportFieldStore } from '@/stores/SportFieldStore.ts';
import { useRoute } from 'vue-router';
import { addHours, format } from 'date-fns';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';

const sportFieldStore = useSportFieldStore();
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
  plugins: [createDragAndDropPlugin()],
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

  console.log(calendarApp);
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
</script>

<style scoped></style>
