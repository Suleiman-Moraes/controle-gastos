import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-template',
  templateUrl: './input-template.component.html'
})
export class InputTemplateComponent implements OnInit {

  @Input('for-name') forName!: string;
  @Input('name') name!: string;
  @Input('form') form: FormGroup | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
