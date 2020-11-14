import { Producto } from './../../_model/producto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/_service/producto.service';
import { switchMap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionDialogoComponent } from 'src/app/material/confirmacion-dialogo/confirmacion-dialogo.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'marca', 'acciones'];
  dataSource: MatTableDataSource<Producto>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute 
    ) { }
    

  ngOnInit() {
    this.productoService.getProductoCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.productoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

    this.productoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(producto: Producto) {
    this.dialog.open(ConfirmacionDialogoComponent, {
      width: '350px',
      data: `¿Esta seguro de eliminar al producto ${producto.nombre}?`
    }).afterClosed().subscribe(confirmado => {
      if(confirmado){
        this.productoService.eliminar(producto.idProducto).pipe(switchMap(() => {
          return this.productoService.listar();
        })).subscribe(data => {
          this.productoService.setProductoCambio(data);
          this.productoService.setMensajeCambio('Se eliminó');
        });
      }
    });

  }

}
