export interface IUser {
  email: string;
  password: string;
  name: string;
}

export interface IColor {
  id: string;
  name: string;
  code: string;
}

export interface IIcon {
  id: string;
  name: string;
  symbol: string;
}

export interface ICategory {
  _id: string;
  name: string;
  color: IColor;
  icon: IIcon;
  user: IUser | string;
  isEditable: boolean;
}
