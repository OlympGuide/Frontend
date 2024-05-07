import { getApiClientInstance } from '@/api/axiosConfig.ts';
import { AxiosResponse } from 'axios';
import {
  PostReservation,
  Reservation,
  UpdateReservation,
} from '@/types/Reservation.ts';

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

export const updateReservation = async (reservation: UpdateReservation) => {
  const api = await getApiClientInstance();
  return api.put(`${RESERVATION_PATH}/${reservation.id}`, reservation);
};

export const deleteReservation = async (id: string) => {
  const api = await getApiClientInstance();
  await api.delete(`${RESERVATION_PATH}/${id}`);
};
