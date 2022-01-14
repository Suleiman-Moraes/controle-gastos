import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input('for-name') forName!: string;
  @Input('name') name!: string;
  @Input('form') form!: FormGroup;
  @Input() mask: string | null = null;
  @Input() imask: any = null;
  @Input('auto-clear') autoClear: boolean = true;

  @Output('blur') blur: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onBlur(event: any): void {
    this.blur.emit(event);
  }
}
