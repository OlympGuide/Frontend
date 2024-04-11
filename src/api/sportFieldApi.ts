import { apiClient } from '@/api/axiosConfig.ts';
import { PostSportField, ShowSportField } from '@/types/Map.ts';
import { AxiosResponse } from 'axios';

const SPORT_FIELD_PATH = '/SportField';

export const postSportField = async (data: PostSportField) => {
    const api = await apiClient();

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('latitude', data.latitude.toString());
    formData.append('longitude', data.longitude.toString());

    if (data.description) {
        formData.append('description', data.description);
    }

    if (data.address) {
        formData.append('address', data.address);
    }

    if (data.file) {
        formData.append('file', data.file);
    }


    return api.post(SPORT_FIELD_PATH, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}


export const getSportFields = async (): Promise<
  AxiosResponse<SportField[], any>
> => {
  const api = await apiClient();
  return api.get<SportField[]>(SPORT_FIELD_PATH);
};
