import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent implements OnInit {

  @Input()
  count: number;

  @Input()
  disabled: boolean = false;

  @Output()
  onFullfilled: any = new EventEmitter();

  public value: number = null;
  public limit: number = null;
  public placeholder: string = null;

  constructor() { 
  }

  ngOnInit() {
    
    // limit for count-digit
    this.limit = 1;
    for(let i = 0; i < this.count - 1; i++)
      this.limit *= 10;

    // placeholder to do it pretty
    this.placeholder = '';
    for(let i = 0; i < this.count; i++)
      this.placeholder = this.placeholder + '?';
  }

  // input changed
  changed(event) {

    // if the entered value is valid
    if(event.key == 'Backspace' || (!isNaN(event.key) && this.value < this.limit)) {
      this.value = event.target.value;

      // if the number of digit is ok, emit onFullfilled
      if(this.value >= this.limit)
        this.onFullfilled.emit({ 'value': this.value });
    }

    // else return to the previous state
    else 
      event.target.value = this.value;
  }
}
