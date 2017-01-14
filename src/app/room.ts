import { Question } from './question';

export class Room {

  public name?: string;
  public creator?: string;
  public id?: number;
  public password?: number;
  public questions?: Question[];
  public createdAt?: number;
  public updatedAt?: number;
}
