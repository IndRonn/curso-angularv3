// src/app/shared/pipes/order-list.pipe.spec.ts

import { OrderListPipe } from '../pipes/order-list.pipe';
// Importa datos simulados que se usarán en la prueba
import * as dataRow from '../../data/tracks.json'; 

describe('OrderListPipe', () => {
    
    // --- Prueba 1: Verificar la creación de la instancia ---
    it('create an instance', () => {
        // Arrange
        const pipe = new OrderListPipe();
        
        // Assert
        expect(pipe).toBeTruthy();
    });

    // --- Prueba 2: Validar que el Pipe devuelve el mismo dato sin ordenamiento ---
    it('should validate input and output', () => {
    // Arrange
      const pipe = new OrderListPipe();
      
      // 💡 CORRECCIÓN: Extrae el arreglo real de la clave 'data'
      // El valor que le damos al Pipe ahora es el arreglo de tracks.
      const rawTracks: any[] = (dataRow as any).default.data; 

      // Act
      // Le pasamos el arreglo (rawTracks) y un argumento nulo
      const orderedList = pipe.transform(rawTracks, null); 

      // Assert
      // 💡 CORRECCIÓN: Esperamos que el Pipe devuelva el mismo ARREGLO de tracks.
      // Usamos toEqual porque el Pipe debería devolver una copia o referencia del mismo arreglo.
      expect(orderedList).toEqual(rawTracks); 
    });
    // ...

    // --- PRUEBA PARA FORMULARIO INVÁLIDO (Basada en tu primera imagen) ---
    it('should order list by name ascending', () => {
        // Arrange
        const pipe = new OrderListPipe();
        
        // 💡 CORRECCIÓN AQUÍ: Accedes a la clave 'data' del objeto importado.
        const data: any[] = (dataRow as any).default.data; 

        // Act
        // Llama al método transform, ordenando por la clave 'name' y en orden 'asc' (ascendente)
        const orderedList = pipe.transform(data, 'name', 'asc'); 

        // Assert
        // Verifica que el primer elemento es el que alfabéticamente va primero.
        // El primer elemento alfabéticamente es "50 Cent - Candy Shop..."
        expect(orderedList[0].name).toBe('50 Cent - Candy Shop (feat. Olivia)'); 
    });

    // ... otras pruebas ...

});