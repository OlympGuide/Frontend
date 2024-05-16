import { expect, test, beforeEach } from 'vitest';
import {
  addEvent,
  createCalendarApp,
  getCollidingEvent,
  moveEventOnCollision,
  REMOVED_CLASSIFIER_ID,
} from '@/services/reservationService.ts';
import { formatEventTime } from '@/services/dateService.ts';
import { CalendarEvent } from '@schedule-x/calendar';
import { ReservationType } from '@/types/Reservation.ts';

const calendarApp = createCalendarApp();

beforeEach(() => {
  calendarApp.events.set([
    {
      id: '1',
      start: formatEventTime(new Date('2024-01-01T10:00:00')),
      end: formatEventTime(new Date('2024-01-01T12:00:00')),
    },
    {
      id: '2',
      start: formatEventTime(new Date('2024-01-01T13:00:00')),
      end: formatEventTime(new Date('2024-01-01T15:00:00')),
    },
  ]);
});

test('addEvent: adds event to calendarApp', () => {
  addEvent('2024-01-01T12:00:00');

  const event = calendarApp.events.getAll()[2];

  expect(event?.start).toBe(formatEventTime(new Date('2024-01-01T12:00:00')));
  expect(event?.end).toBe(formatEventTime(new Date('2024-01-01T13:00:00')));
  expect(event?.isNew).toBe(true);
  expect(event?.calendarId).toBe(ReservationType.ME);
  expect(event?.isEditable).toBe(true);
});

test('getCollidingEvent: returns nothing', () => {
  const event: CalendarEvent = {
    id: '3',
    start: formatEventTime(new Date('2024-01-01T12:00:00')),
    end: formatEventTime(new Date('2024-01-01T13:00:00')),
  };

  expect(getCollidingEvent(event)).toBe(undefined);
});

test('getCollidingEvent: returns event with id 1', () => {
  const event: CalendarEvent = {
    id: '3',
    start: formatEventTime(new Date('2024-01-01T10:30:00')),
    end: formatEventTime(new Date('2024-01-01T13:00:00')),
  };

  expect(getCollidingEvent(event)?.id).toBe(calendarApp.events.get('1')?.id);
});

test('moveEventOnCollision: moves event to 15:00', () => {
  const event: CalendarEvent = {
    id: '3',
    start: formatEventTime(new Date('2024-01-01T13:00:00')),
    end: formatEventTime(new Date('2024-01-01T14:00:00')),
  };

  const updatedEvent = moveEventOnCollision(event);
  expect(updatedEvent?.start).toBe(
    formatEventTime(new Date('2024-01-01T15:00:00'))
  );
  expect(updatedEvent?.end).toBe(
    formatEventTime(new Date('2024-01-01T16:00:00'))
  );
});

test('moveEventOnCollision: moves event 2 times to 15:00', () => {
  const event: CalendarEvent = {
    id: '3',
    start: formatEventTime(new Date('2024-01-01T10:00:00')),
    end: formatEventTime(new Date('2024-01-01T12:00:00')),
  };

  const updatedEvent = moveEventOnCollision(event);
  expect(updatedEvent?.start).toBe(
    formatEventTime(new Date('2024-01-01T15:00:00'))
  );
  expect(updatedEvent?.end).toBe(
    formatEventTime(new Date('2024-01-01T17:00:00'))
  );
});

test('moveEventOnCollision: remove event because its outside the day boundary', () => {
  calendarApp.events.add({
    id: '4',
    start: formatEventTime(new Date('2024-01-01T15:30:00')),
    end: formatEventTime(new Date('2024-01-01T21:00:00')),
  });

  const event: CalendarEvent = {
    id: '3',
    start: formatEventTime(new Date('2024-01-01T10:00:00')),
    end: formatEventTime(new Date('2024-01-01T12:00:00')),
  };

  const updatedEvent = moveEventOnCollision(event);
  expect(updatedEvent?.id).toBe(REMOVED_CLASSIFIER_ID);
  expect(calendarApp.events.get('4')).toBe(undefined);
});
