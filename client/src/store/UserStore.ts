import { makeAutoObservable } from "mobx";
import { IUser, IUserStore } from "../types/User";

export default class UserStore implements IUserStore {
  _isAuth: boolean;
  _user: IUser;
  constructor() {
    this._isAuth = false;
    this._user = {} as any;
    makeAutoObservable(this);
  }
  setIsAuth(isAuth: boolean) {
    this._isAuth = isAuth;
  }
  setUser(user: any) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
}
