import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../Interfaces/productoDescripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {

  producto!: ProductoDescripcion;
  id!: string;

  constructor(private route: ActivatedRoute,
    public productosService: ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe( parametros => {
      console.log(parametros['id']);

      this.productosService.getProducto(parametros['id'])
      .subscribe( (prod: ProductoDescripcion) => {
        
        console.log(prod);
        this.producto = prod;
        this.id = parametros['id'];

      });
    });
  }
}
