import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../Interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = []; 

  constructor( private http: HttpClient) {
      console.log('pruebita log')
      this.CargaInfo();
      this.CargarEquipo();
   }

   private CargaInfo() {
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina) => {

      this.cargada = true;
      this.info = resp;

      console.log( resp.twitter );

    });
   }

   private CargarEquipo() {
    this.http.get('https://angular-html-9cfec-default-rtdb.firebaseio.com/equipo.json')
    .subscribe( (resp: any) => {

      this.equipo = resp;
      
    });
   }
}

