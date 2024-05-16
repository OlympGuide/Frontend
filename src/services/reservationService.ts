import {
  CalendarApp,
  CalendarEvent,
  createCalendar,
  viewWeek,
} from '@schedule-x/calendar';
import {
  addHours,
  addMinutes,
  differenceInMinutes,
  format,
  isAfter,
  isBefore,
  isEqual,
  parse,
} from 'date-fns';
import { formatEventTime, toStartOfHour } from '@/services/dateService.ts';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createResizePlugin } from '@schedule-x/resize';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
// @ts-ignore
import ToastEventBus from 'primevue/toasteventbus';
import { ReservationType } from '@/types/Reservation.ts';

export const calendarControls = createCalendarControlsPlugin();

export const REMOVED_CLASSIFIER_ID = 'removed';

const dayBoundaries = {
  start: '06:00',
  end: '22:00',
};

export let calendarApp: CalendarApp | undefined;

export const createCalendarApp = () => {
  calendarApp = createCalendar({
    locale: 'de-CH',
    selectedDate: format(new Date(), 'yyyy-MM-dd'),
    views: [viewWeek],
    defaultView: viewWeek.name,
    dayBoundaries,
    weekOptions: {
      gridHeight: 700,
    },
    calendars: {
      [ReservationType.ME]: {
        colorName: ReservationType.ME,
      },
      [ReservationType.OTHERS]: {
        colorName: ReservationType.OTHERS,
      },
    },
    callbacks: {
      async onClickDateTime(dateTime: string) {
        addEvent(dateTime);
      },
      onEventUpdate(updatedEvent: CalendarEvent) {
        updateEvent(updatedEvent);
      },
    },
    events: [],
    plugins: [
      createDragAndDropPlugin(),
      createResizePlugin(),
      // @ts-ignore
      calendarControls,
    ],
  });

  return calendarApp;
};

export const goToReservation = (reservationId: string) => {
  const event: CalendarEvent | undefined = calendarApp?.events
    .getAll()
    .find((event: CalendarEvent) => event.id === reservationId);

  if (event) {
    calendarControls.setDate(format(event.start, 'yyyy-MM-dd'));
  } else {
    console.error(`Reservation: ${reservationId} not found!`);
  }
};

export const getEventClassName = (
  calendarEvent: CalendarEvent,
  reservationId: string
): string => {
  let className;

  if (calendarEvent.calendarId === ReservationType.OTHERS) {
    className = ReservationType.OTHERS;
  } else if (reservationId && calendarEvent.id === reservationId) {
    className = `${ReservationType.ME}-selected`;
  } else {
    className = ReservationType.ME;
  }

  return className;
};

export const addEvent = (dateTime: string) => {
  const startDateTime = formatEventTime(toStartOfHour(new Date(dateTime)));

  const event: CalendarEvent = {
    id: Date.now().toString(),
    start: startDateTime,
    end: formatEventTime(addHours(new Date(startDateTime), 1)),
    isEditable: true,
    isNew: true,
    calendarId: ReservationType.ME,
  };

  calendarApp?.events.add(event);
};

export const updateEvent = (updatedEvent: CalendarEvent) => {
  updatedEvent = moveEventOnCollision(updatedEvent);

  if (updatedEvent.id === REMOVED_CLASSIFIER_ID) return;

  calendarApp?.events.update(updatedEvent);
};

/**
 * Moves the event to the next available time slot if it collides with another event.
 * If the event collides with multiple events, it will be moved until it doesn't collide with any event.
 * If the event collides with the end of the day, it will be removed. The id of the event will be set to 'removed'!
 * @param updatedEvent
 */
export const moveEventOnCollision = (
  updatedEvent: CalendarEvent
): CalendarEvent => {
  const collidingEvent: CalendarEvent | undefined =
    getCollidingEvent(updatedEvent);

  if (!collidingEvent) {
    return updatedEvent;
  }

  const difference = differenceInMinutes(
    collidingEvent.end,
    updatedEvent.start
  );

  updatedEvent.start = formatEventTime(
    addMinutes(updatedEvent.start, difference)
  );
  updatedEvent.end = formatEventTime(addMinutes(updatedEvent.end, difference));

  const dayEndBoundary = parse(dayBoundaries.end, 'HH:mm', updatedEvent.end);

  if (isAfter(updatedEvent.end, dayEndBoundary)) {
    ToastEventBus.emit('add', {
      severity: 'warn',
      summary: 'Reservation überschneidet sich.',
      detail: 'Bitte wählen Sie ein anderes Zeitfenster.',
    });
    calendarApp?.events.remove(updatedEvent.id);
    updatedEvent.id = REMOVED_CLASSIFIER_ID;
    return updatedEvent;
  }

  moveEventOnCollision(updatedEvent);
  return updatedEvent;
};

/**
 * Returns the first event that collides with the updated event.
 * @param updatedEvent
 */
export const getCollidingEvent = (
  updatedEvent: CalendarEvent
): CalendarEvent | undefined => {
  return calendarApp?.events.getAll().find((event: CalendarEvent) => {
    if (updatedEvent.id === event.id) return false;

    return !(
      (isBefore(updatedEvent.start, event.start) &&
        isBefore(updatedEvent.end, event.start)) ||
      (isAfter(updatedEvent.start, event.end) &&
        isAfter(updatedEvent.end, event.end)) ||
      isEqual(updatedEvent.end, event.start) ||
      isEqual(updatedEvent.start, event.end)
    );
  });
};
