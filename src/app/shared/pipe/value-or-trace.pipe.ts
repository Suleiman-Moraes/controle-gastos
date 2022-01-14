import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueOrTrace'
})
export class ValueOrTracePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? value : '-';
  }
}
