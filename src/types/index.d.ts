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

export interface ITask {
  _id: string;
  name: string;
  categoryId: string;
  isCompleted: boolean;
  date: string;
  userId: string;
  isEditable: boolean;
  createdAt: Date;
  updatedAt: Date;
}
