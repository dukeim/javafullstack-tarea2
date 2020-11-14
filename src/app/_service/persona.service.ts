import { Persona } from './../_model/persona';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService  extends GenericService<Persona> {

  private personaCambio = new Subject<Persona[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/personas`
    );
  }  
  getPersonaCambio(){
    return this.personaCambio.asObservable();
  }

  setPersonaCambio(personas : Persona[]){
    this.personaCambio.next(personas);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }

}

