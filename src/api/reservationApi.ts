import { getApiClientInstance } from '@/api/axiosConfig.ts';
import { AxiosResponse } from 'axios';
import { PostReservation, Reservation } from '@/types/Reservation.ts';

const RESERVATION_PATH = '/reservations';

export const postReservation = async (data: PostReservation) => {
  const api = await getApiClientInstance();
  return api.post(RESERVATION_PATH, data);
};

export const getReservations = async (): Promise<
  AxiosResponse<Reservation[], any>
> => {
  const api = await getApiClientInstance();
  return api.get<Reservation[]>(RESERVATION_PATH);
};

export const getReservationById = async (
  id: string
): Promise<AxiosResponse<Reservation>> => {
  const api = await getApiClientInstance();
  return api.get<Reservation>(`${RESERVATION_PATH}/${id}`);
};

export const getReservationsBySportField = async (
  sportFieldId: string
): Promise<AxiosResponse<Reservation[]>> => {
  const api = await getApiClientInstance();
  return api.get<Reservation[]>(`${RESERVATION_PATH}`, {
    params: {
      sportField: sportFieldId,
    },
  });
};
