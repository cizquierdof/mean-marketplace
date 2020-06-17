import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  public newUsuario: Users;

  displayBasic2: boolean;

  // tslint:disable-next-line: no-inferrable-types
  public usuario?: string = '';
  // tslint:disable-next-line: no-inferrable-types
  public email?: string  = '';
  // tslint:disable-next-line: no-inferrable-types
  public password?: string = '';
  // tslint:disable-next-line: semicolon
  // tslint:disable-next-line: variable-name
  public id = '';
  public code = '';
  public usuari: Users;

  constructor(
    private usersSErvice: UsersService,
    private router: Router,
    private route: ActivatedRoute
    ) { this.usuari = new Users(); }

  ngOnInit(): void {

    this.code = this.route.snapshot.paramMap.get('id');
    this.usersSErvice.getUser(this.code).subscribe(
       serv => { this.usuari = serv, this.email = serv.email, this.usuario = serv.usuario, this.password = serv.password,
        this.id = serv._id; }

     );
  }

  showBasicDialog2() {
    this.displayBasic2 = true;
}


guardar(){
  // tslint:disable-next-line: deprecation
  event.preventDefault();
  console.log('usuario', this.usuario , this.email, this.password); // (  this.usuario, this.email, this.rol, this.password)
  // tslint:disable-next-line: new-parens
  const newUsuario: Users = new Users;
  newUsuario.usuario = this.usuario;
  newUsuario.email = this.email;
  newUsuario.password = this.password;

  this.usersSErvice.putUsers(newUsuario, this.code).subscribe(
      () => {
        this.router.navigate(['/editar-perfil']);
      });
   }
}