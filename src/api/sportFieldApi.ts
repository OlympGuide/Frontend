
import { PostSportField, ShowSportField } from '@/types/Map.ts';
import { getApiClientInstance } from '@/api/axiosConfig.ts';
import { AxiosResponse } from 'axios';

const SPORT_FIELD_PATH = '/sportfields';

export const postSportField = async (data: PostSportField) => {
  const api = await getApiClientInstance();


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
};

export const getSportFields = async (): Promise<
  AxiosResponse<ShowSportField[], any>
> => {
  const api = await getApiClientInstance();
  return api.get<ShowSportField[]>(SPORT_FIELD_PATH);
};
