import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  pure: false
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, ...args: number[]): string {
    if(value.length < args[0]) return value;
    return `${value.slice(0, args[0])}...`;
  }
}
