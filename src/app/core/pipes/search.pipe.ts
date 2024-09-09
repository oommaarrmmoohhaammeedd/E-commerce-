import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], word: string): any[] {
    return array.filter((item) => item.title.toLowerCase().includes(word.toLowerCase()));
  }

}
