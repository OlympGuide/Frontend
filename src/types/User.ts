export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

export type Auth0User = Omit<User, 'id'>;

export const instanceOfUser = (object: any): object is User => {
  return 'id' in object;
};
