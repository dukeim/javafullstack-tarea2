import { Producto } from './../../../_model/producto';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductoService } from 'src/app/_service/producto.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css']
})
export class ProductoEdicionComponent implements OnInit {

  id: number;
  producto: Producto;
  form: FormGroup;
  edicion: boolean = false;


  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    this.producto = new Producto();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'marca': new FormControl(''),
    });


    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.productoService.listarPorId(this.id).subscribe(data => {
        let id = data.idProducto;
        let nombre = data.nombre;
        let marca = data.marca

        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre),
          'marca': new FormControl(marca)
        });
      });
    }
  }

  operar() {
    this.producto.idProducto = this.form.value['id'];
    this.producto.nombre = this.form.value['nombre'];
    this.producto.marca = this.form.value['marca'];

    if (this.producto != null && this.producto.idProducto > 0) {
      this.productoService.modificar(this.producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio("Se modifico");
      });
    } else {
      this.productoService.registrar(this.producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(data => {
          this.productoService.setProductoCambio(data);
          this.productoService.setMensajeCambio("Se registro");
        });
     
    }
    this.router.navigate(['producto']);
  }


}
