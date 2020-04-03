import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hashtags'
})
export class HashtagsPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): string {
    return value.slice(0, 2).join(', ');
  }
}
