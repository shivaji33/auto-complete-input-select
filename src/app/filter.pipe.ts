import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, names: string[]): any {
    if (!items) {
      return [];
    }

    if (!searchText) {
      return items;
    }

    return items.filter(value => {
      for (const element of names) {
        if (element && searchText) {
          if (!isNaN(value[element])) {
            value[element] = value[element].toString();
            return value[element].includes(searchText);
          }
          return value[element].toLowerCase().includes(searchText.toLowerCase());
        }
      }
    });
  }
}
