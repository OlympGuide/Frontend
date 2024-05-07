export interface ApiState {
  errorMessage: string;
  successMessage: string;
  isLoading: boolean;
}

export const instanceOfApiState = (object: any): object is ApiState => {
  return (
    'errorMessage' in object &&
    'isLoading' in object &&
    'successMessage' in object
  );
};
