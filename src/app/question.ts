import { Option } from './option';

export class Question {

  constructor(
    public text: string = '',
    public open: boolean = false,
    public options: Option[] = []
  ) {}
}
