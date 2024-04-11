export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface EmailPassword {
  email: string;
  password: string;
}

export type RegisterType = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'email'
> &
  'password';
