import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaComponent } from './pages/persona/persona.component';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { VentaComponent } from './pages/venta/venta.component';

const routes: Routes = [
  { path: 'persona', component: PersonaComponent },
  { path: 'producto', component: ProductoComponent, children: [
      { path: 'nuevo', component: ProductoEdicionComponent },
      { path: 'edicion/:id', component: ProductoEdicionComponent }
    ]
  },
  { path: 'venta', component: VentaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
