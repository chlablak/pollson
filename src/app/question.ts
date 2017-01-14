import { Option } from './option';

export class Question {

  public text?: string;
  public options?: Option[];
  public answer?: number;
  public answered?: string[];
  public open?: boolean;
}
