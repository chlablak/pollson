import { Question } from './question';

export class Room {

  public name?: string;
  public creator?: {
    _id?: string;
    email?: string;
  }
  public id?: number;
  public password?: number;
  public questions?: Question[];
  public createdAt?: number;
  public updatedAt?: number;
  public open?: boolean;
  public _id?: boolean;
}
