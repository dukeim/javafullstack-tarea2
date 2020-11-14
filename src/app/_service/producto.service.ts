import { Producto } from './../_model/producto';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto>{

  private productoCambio = new Subject<Producto[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/productos`
    );
  }  
  getProductoCambio(){
    return this.productoCambio.asObservable();
  }

  setProductoCambio(productos : Producto[]){
    this.productoCambio.next(productos);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }
}
