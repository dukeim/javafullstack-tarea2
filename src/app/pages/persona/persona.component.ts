import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { Persona } from 'src/app/_model/persona';
import { PersonaService } from 'src/app/_service/persona.service';
import { PersonaDialogoComponent } from './persona-dialogo/persona-dialogo.component';
import { ConfirmacionDialogoComponent } from 'src/app/material/confirmacion-dialogo/confirmacion-dialogo.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  displayedColumns = ['idpersona', 'nombres', 'apellidos', 'acciones'];
  dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private personaService: PersonaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.personaService.getPersonaCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.personaService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.personaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(persona: Persona) {
    this.dialog.open(ConfirmacionDialogoComponent, {
      width: '300px',
      data: `¿Esta seguro de eliminar a ${persona.nombres}?`
    }).afterClosed().subscribe(confirmado => {
      if(confirmado){
        this.personaService.eliminar(persona.idPersona).pipe(switchMap(() => {
          return this.personaService.listar();
        })).subscribe(data => {
          this.personaService.setPersonaCambio(data);
          this.personaService.setMensajeCambio('SE ELIMNO');
        });
      }
    });
  }

  abrirDialogo(persona?: Persona) {
    let per = persona != null ? persona : new Persona();
    this.dialog.open(PersonaDialogoComponent, {
      width: '250px',
      data: per
    });
  }
}
