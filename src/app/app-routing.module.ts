import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { HomePageComponent } from './components/home-page/home-page.component';


const routes: Routes = [
 { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'home-page', component: HomePageComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'add-user/:id', component: AddEmployeeComponent },
 // { path: 'test', component: TestComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
