import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-dialogo',
  templateUrl: './confirmacion-dialogo.component.html',
  styleUrls: ['./confirmacion-dialogo.component.css']
})
export class ConfirmacionDialogoComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<ConfirmacionDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { 
  }

  ngOnInit(): void {
  }

  confirmado(){
    this.dialogRef.close(true);
  }

  cerrar(){
    this.dialogRef.close(false);
  }
}
