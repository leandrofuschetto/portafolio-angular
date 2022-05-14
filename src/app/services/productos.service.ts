import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../Interfaces/Producto.interface';


@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  constructor( private http: HttpClient ) { 
    this.cargarProductos();
  }
  
  private cargarProductos() {
    
    this.http.get<Producto[]>('https://angular-html-9cfec-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe( (resp: Producto[]) => {
        console.log('prods' + resp);
        
        this.productos = resp;
        this.cargando = false;
        console.log(this.cargando);  
        
    });
  }
}
  