import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private authService : AuthService,
    private router : Router
  ){}

  @Input() users: User[] = [];
  @Input() paginator = {};

  get login(){
    return this.authService.user;
  }
  get admin(){ // lo mismo que en user.component.ts para ver si es usuario Admin para mostrar el boton new user
    return this.authService.isAdmin();
  }

  handlerLogOut(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
