import { Pipe, PipeTransform } from '@angular/core';

import { IItem } from './store/state';

@Pipe({
  name: 'itemFilter'
})
export class ItemFilterPipe implements PipeTransform {
  transform(value: IItem[], args?: any): any {
    if (value) {
      let [item] = args;
      return value.filter(r => r.item === args);
    }
    return [];
  }
}
