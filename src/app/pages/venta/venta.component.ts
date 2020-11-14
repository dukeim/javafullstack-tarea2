import { Venta } from './../../_model/venta';
import { DetalleVenta } from './../../_model/detalleVenta';
import { Producto } from './../../_model/producto';
import { Persona } from './../../_model/persona';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonaService } from 'src/app/_service/persona.service';
import { ProductoService } from 'src/app/_service/producto.service';
import { VentaService } from 'src/app/_service/venta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  personas$: Observable<Persona[]>;
  productos$: Observable<Producto[]>;
  detalleVenta: DetalleVenta[] = [];

  idPersonaSeleccionada: number;
  idProductoSeleccionado: number;
  importe: number;
  productosSeleccionados: Producto[] = [];
  cantidad: number;
  fechaSeleccionada: Date = new Date();

  maxFecha: Date = new Date();
  
  constructor(
    private personaService : PersonaService,
    private productoService : ProductoService,
    private ventaService: VentaService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.personas$ = this.personaService.listar();
    this.productos$ = this.productoService.listar();
  }

  agregarProducto(){
    if (this.idProductoSeleccionado > 0) {
      let cont = 0;
      for (let i = 0; i < this.productosSeleccionados.length; i++) {
        let prod = this.productosSeleccionados[i];
        if (prod.idProducto === this.idProductoSeleccionado) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        let mensaje = 'El producto ya se encuentra en la lista';
        this.snackBar.open(mensaje, "Aviso", { duration: 2000 });
      } else {
        this.productoService.listarPorId(this.idProductoSeleccionado).subscribe(data => {
          this.productosSeleccionados.push(data);
          let det = new DetalleVenta();
          det.producto = data;
          det.cantidad = this.cantidad;
  
          this.detalleVenta.push(det);
  
          this.idProductoSeleccionado = 0;
          this.cantidad = 0;
        });
      }
    }
  }

  removerProducto(index : number){
    this.detalleVenta.splice(index, 1);
  }

  
  estadoBotonRegistrar() {
    return (this.detalleVenta.length === 0 || this.idPersonaSeleccionada === 0);
  }

  aceptar(){
    let persona = new Persona();
    persona.idPersona = this.idPersonaSeleccionada;

    let venta = new Venta();
    venta.persona = persona;
    venta.importe = this.importe;
    venta.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
    venta.detalleVenta = this.detalleVenta;

 
    //console.log(JSON.stringify(venta));

    this.ventaService.registrarVenta(venta).subscribe(() => {
      this.snackBar.open("Se registró venta", "Aviso", { duration: 2000 });

      setTimeout( () => {
        this.limpiarControles();
      }, 2000)
    });
  }

  limpiarControles() {
    this.detalleVenta = [];
    this.productosSeleccionados = [];
    this.idPersonaSeleccionada = 0;
    this.importe = 0;
    this.idProductoSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
  }

}
