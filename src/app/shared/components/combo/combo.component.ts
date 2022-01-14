import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng-lts/api';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html'
})
export class ComboComponent implements OnInit {

  @Input('for-name') forName: string = 'id';
  @Input() text: string = 'description';
  @Input() value: string = 'id';
  @Input() disabled: boolean = false;
  @Input() name!: string;
  @Input() form!: FormGroup;
  @Input() options!: any[];

  @Output('change') change: EventEmitter<any> = new EventEmitter<any>();

  itens: SelectItem[] = new Array();

  constructor() { }

  ngOnInit(): void {
    this.mountItens();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.options = changes['options'].currentValue;
      this.mountItens();
    }
    else if (changes['disabled']) {
      this.disabled = changes['disabled'].currentValue;
    }
  }

  selectionChange(event: any): void {
    this.change.emit(event);
  }

  //PRIVATE METHODS
  private mountItens(): void {
    if (this.options) {
      this.itens = [];
      this.options.forEach(option => {
        this.itens.push({
          label: option[this.text],
          value: option[this.value]
        });
      });
    }
  }
}
