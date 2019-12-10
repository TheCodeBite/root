import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ControlComponent } from './control/control.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'control/:id', component: ControlComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
