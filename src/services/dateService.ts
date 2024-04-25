import { format, setMinutes } from 'date-fns';

export const toLocalDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString('de-CH');
};

export const toStartOfHour = (date: Date): Date => {
  return setMinutes(date, 0);
};

export const formatEventTime = (date: Date): string => {
  return format(date, 'yyyy-MM-dd HH:mm');
};
