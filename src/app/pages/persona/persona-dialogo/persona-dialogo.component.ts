import { PersonaService } from 'src/app/_service/persona.service';
import { Persona } from 'src/app/_model/persona';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-persona-dialogo',
  templateUrl: './persona-dialogo.component.html',
  styleUrls: ['./persona-dialogo.component.css']
})
export class PersonaDialogoComponent implements OnInit {
  persona : Persona;

  constructor(
    private dialogRef: MatDialogRef<PersonaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Persona,
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.persona = new Persona();
    this.persona.idPersona = this.data.idPersona;
    this.persona.nombres = this.data.nombres;
    this.persona.apellidos = this.data.apellidos;
  }

  operar(){
    if (this.persona != null && this.persona.idPersona > 0) {
      //MODIFICAR
      this.personaService.modificar(this.persona).pipe(switchMap( ()=> {
        return this.personaService.listar();
      })).subscribe(data => {
        this.personaService.setPersonaCambio(data);
        this.personaService.setMensajeCambio('SE MODIFICO');
      });
    }else{
      //REGISTRAR
      this.personaService.registrar(this.persona).pipe(switchMap(() => {
        return this.personaService.listar();
      })).subscribe(data => {
        this.personaService.setPersonaCambio(data);
        this.personaService.setMensajeCambio('SE REGISTRO');
      });      
    }
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }
}
