import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFixed',
  standalone: true
})
export class DateFixedPipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

@Pipe({
  name: 'timeFixed',
  standalone: true
})
export class TimeFixedPipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = new Date(value);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
