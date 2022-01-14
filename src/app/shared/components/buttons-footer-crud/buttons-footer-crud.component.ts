import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-footer-crud',
  templateUrl: './buttons-footer-crud.component.html',
  styleUrls: ['./buttons-footer-crud.component.css']
})
export class ButtonsFooterCrudComponent implements OnInit {

  @Input('hidden-cancel') hiddenCancel: boolean = false;
  @Input('hidden-save') hiddenSave: boolean = false;

  @Output('click-save') clickSave: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back();
  }

  onClickSave(event: any): void {
    this.clickSave.emit(event);
  }
}
