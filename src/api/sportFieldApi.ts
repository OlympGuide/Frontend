
import { PostSportField, ShowSportField } from '@/types/Map.ts';
import { getApiClientInstance } from '@/api/axiosConfig.ts';
import { AxiosResponse } from 'axios';

const SPORT_FIELD_PATH = '/SportField';

export const postSportField = async (data: PostSportField) => {
  const api = await getApiClientInstance();


  const formData = new FormData();

  formData.append('name', data.SportFieldName);
  formData.append('latitude', data.SportFieldLatitude.toString());
  formData.append('longitude', data.SportFieldLongitude.toString());

  if (data.SportFieldDescription) {
    formData.append('description', data.SportFieldDescription);
  }

  if (data.SportFieldAddress) {
    formData.append('address', data.SportFieldAddress);
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
