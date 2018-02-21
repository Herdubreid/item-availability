import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemFilter'
})
export class ItemFilterPipe implements PipeTransform {
  transform(value: any[], args?: any): any {
    if (value) {
      let [item] = args;
      return value.filter(r => r.item === args);
    }
    return [];
  }
}
