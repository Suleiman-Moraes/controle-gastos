import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() resources: any = {};
  @Input('filter-form') filterForm: FormGroup | null = null;

  @Output('paginate') paginate: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onPaginate(event: any): void {
    this.paginate.emit(event);
  }
}
