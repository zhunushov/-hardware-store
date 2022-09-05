export interface IUser {
  id: number;
  email: string;
  password: string;
  role: string;
}

export interface IUserStore {
  setUser: (user: IUser) => void;
  setIsAuth: (isAuth: boolean) => void;
  get isAuth(): boolean;
  get user(): IUser;
}
