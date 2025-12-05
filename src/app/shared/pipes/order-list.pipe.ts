import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@core/models/track.model'; // (Asumido)

@Pipe({
  name: 'orderList'
})
export class OrderListPipe implements PipeTransform {

  // Aseguramos que el valor de entrada es un arreglo para poder usar .sort()
  transform(value: Array<any> | null | undefined, args: string | null, sort: string = 'asc'): Array<any> { 
    
    // 💡 IMPORTANTE: Si 'value' no es un arreglo válido, devolvemos un arreglo vacío
    if (!Array.isArray(value)) { 
        return [];
    }

    try {
      if (args === null) {
        return value;
      } else {
        // Tu lógica de ordenamiento
        const tmplist = value.sort((a, b) => {
          if (a[args] < b[args]) {
            return -1;
          } else if (a[args] === b[args]) {
            return 0;
          } else if (a[args] > b[args]) {
            return 1;
          }
          return 0;
        });

        return (sort === 'asc') ? tmplist : tmplist.reverse();
      }
    } catch (error) {
      console.error('Error in OrderListPipe:', error);
      // En caso de error de lógica interna, devolvemos el valor original (el arreglo).
      return value; 
    }
  }
}