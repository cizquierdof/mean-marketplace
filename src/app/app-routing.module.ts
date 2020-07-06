import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponentComponent } from './components/not-found-component/not-found-component.component';
import { ServicesListComponent } from './components/services-list/services-list.component';
import { ServiceAddComponent } from './components/service-add/service-add.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SuppliersListComponent } from './components/suppliers-list/suppliers-list.component';
import { Supplier } from './models/supplier';
import { SupplierviewComponent } from './components/supplierview/supplierview.component';

import { AdminGuard } from './services/guard/admin.guard';
import { UsuarioGuard  } from './services/guard/usuario.guard';
import { PasswordForgotComponent } from './components/password-forgot/password-forgot.component';
import { FormVendorComponent } from './components/form-vendor/form-vendor.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SupplierAddComponent } from './components/supplier-add/supplier-add.component';
import { SupplierEditComponent } from './components/supplier-edit/supplier-edit.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ContactInformComponent } from './components/contact-inform/contact-inform.component';
import { MisCarritosComponent } from './components/mis-carritos/mis-carritos.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'lista', component: UsersListComponent,  canActivate: [AdminGuard] },
  { path: 'service', component: ServicesListComponent },
  { path: 'supplier', component: SuppliersListComponent },
  { path: 'service/add', component: ServiceAddComponent },
  { path: 'service/add/:id', component: ServiceAddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'recuperar', component: PasswordForgotComponent },
  { path: 'buscador/:search', component: SearchComponent },
  { path: 'buscador/', component: SearchComponent },
  { path: 'editar-perfil', component: EditarPerfilComponent, canActivate: [UsuarioGuard] },
  { path: 'supplier/view/:id', component: SupplierviewComponent},
  { path: 'supplier/add', component: SupplierAddComponent, canActivate: [AdminGuard]},
  { path: 'supplier/edit/:id', component: SupplierAddComponent, canActivate: [AdminGuard]},
  { path: 'form-vendedor', component: FormVendorComponent},
  { path: 'contacto', component: ContactInformComponent},
  { path: 'contacta', component: ContactUsComponent},
  { path: 'carrito', component: CarritoComponent, canActivate: [UsuarioGuard]},
  { path: 'mis-carritos', component: MisCarritosComponent, canActivate: [UsuarioGuard]},

  { path: ':page', component: NotFoundComponentComponent },
  { path: '**', component: NotFoundComponentComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
