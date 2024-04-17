export interface ApiState {
  errorMessage: string;
  isLoading: boolean;
}

export const instanceOfApiState = (object: any): object is ApiState => {
  return 'errorMessage' in object && 'isLoading' in object;
};
