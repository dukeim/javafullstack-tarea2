
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonaComponent } from './pages/persona/persona.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonaDialogoComponent } from './pages/persona/persona-dialogo/persona-dialogo.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';
import { ConfirmacionDialogoComponent } from './material/confirmacion-dialogo/confirmacion-dialogo.component';
import { VentaComponent } from './pages/venta/venta.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    ProductoComponent,
    PersonaDialogoComponent,
    ProductoEdicionComponent,
    ConfirmacionDialogoComponent,
    VentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
