import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../Interfaces/Producto.interface';
import { ProductoDescripcion } from '../Interfaces/productoDescripcion.interface';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {

      this.http.get<Producto[]>('https://angular-html-9cfec-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve;
        });

      });

  }

  getProducto(id: string) {
    return this.http.get<ProductoDescripcion>(`https://angular-html-9cfec-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0) {
    this.cargarProductos().then(() => {
      this.filtrarProductos(termino);
    })
    }
    else{
      this.filtrarProductos(termino);
    }

    console.log(this.productosFiltrado);
  }

  private filtrarProductos( termino: string) {
    
    this.productosFiltrado = [];

    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino.toLocaleLowerCase()) >= 0){
        this.productosFiltrado.push(prod);
      }
    });

  }
}


