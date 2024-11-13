export interface IUser {
  id: string;
  name: string;
  role: 'Admin' | 'User';
  email: string;
  password: string;
}
