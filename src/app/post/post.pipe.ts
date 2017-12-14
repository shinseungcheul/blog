import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DatePipe implements PipeTransform {
  transform(value: string): string {
    let t = new Date(value)
    let result : string = "";
    result = t.getFullYear()+"."
    result += (t.getMonth()+1)+"."
    result += (t.getDate())+ " "
    result += (t.getHours())+ ":"
    result += (t.getMinutes())
    return result;
  }
}
