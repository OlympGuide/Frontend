export interface User {
  id: string;
  name: string;
  displayName: string;
  email?: string;
  picture?: string;
  roles: UserRole[];
}

export enum UserRole {
  DefaultUser,
  Operator,
  Administrator,
}

export type Auth0User = Omit<User, 'id' | 'roles'>;

export const instanceOfUser = (object: any): object is User => {
  return object && 'id' in object;
};
