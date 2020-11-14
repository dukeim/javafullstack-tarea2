import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Venta } from '../_model/venta';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService extends GenericService<Venta>{

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/ventas`
    );
  }  

  registrarVenta(venta: Venta) {
    return this.http.post(this.url, venta);
  }
}
