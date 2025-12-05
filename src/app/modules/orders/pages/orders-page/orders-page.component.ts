// orders-page.component.ts

import { Component, OnInit } from '@angular/core';

// Nota: La función generateManyOrders debe estar definida.

interface Order {
  id: string;
  customer: string;
  total: number;
}

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {

  orders: Order[] = generateManyOrders(5000);
  private _search: string = '';
  filteredOrders: Order[] = [];
  pagedOrders: Order[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
    this.currentPage = 1; 
    this.filterOrders();
  }

  ngOnInit(): void {
    this.filterOrders();
  }

  filterOrders(): void {
    // 1. FILTRADO
    this.filteredOrders = this.orders.filter(o =>
      o.customer.toLowerCase().includes(this.search.toLowerCase())
    );

    // 2. CÁLCULO DE PÁGINAS
    this.totalPages = Math.ceil(this.filteredOrders.length / this.pageSize);
    
    // 3. ACTUALIZACIÓN DE PÁGINA (Paginación)
    this.updatePagedOrders();
  }

  // MÉTODO RENOMBRADO para más coherencia
  updatePagedOrders(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.pagedOrders = this.filteredOrders.slice(startIndex, endIndex);
  }

  // --- Lógica de Navegación Refactorizada (Tu nueva implementación) ---

  goToPage(page: number): void {
    // La validación centralizada: garantiza el ORDEN
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedOrders(); // Llama al método para actualizar el array de la vista
    }
  }
  
  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }
  
  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }
}
function generateManyOrders(count: number): Order[] {
  const orders: Order[] = [];
  const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown'];
 
  for (let i = 0; i < count; i++) {
    orders.push({
      id: `ORD-${String(i + 1).padStart(6, '0')}`,
      customer: names[i % names.length],
      total: Math.round((Math.random() * 1000 + 50) * 100) / 100
    });
  }
 
  return orders;
}