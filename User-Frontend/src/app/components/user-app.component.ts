import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {

  users: User[] = [];

  paginator : any = {};

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService,
    private authService : AuthService,
    private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    //this.service.findAll().subscribe(users => this.users = users);
    this.route.paramMap.subscribe(params =>{
      
      const page = +(params.get('page') || '0');
      
      this.service.findAllPageable(page).subscribe(pageable => this.users = pageable.content as User[]);
    })
    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUsersEvent();
    this.handlerLogin();
  }

  handlerLogin(){
    this.sharingData.handlerLoginEventEmitter.subscribe(({usuario,pwd})=>{
      this.authService.loginUser({usuario,pwd}).subscribe({
        next: response =>{
          const token = response.token;
          const payLoad = this.authService.getPayLoad(token);
          const user = {usuario:payLoad.sub};
          const login = {
            user,
            isAuth: true,
            isAdmin: payLoad.isAdmin
          }

          this.authService.token = token;
          this.authService.user = login;
         
          this.router.navigate(['/users/page/0']);
        },
        error: error =>{
          if(error.status == 401){
            Swal.fire('Error en el login',error.error.message,'error');
          }else{
            throw error;
          }
        }
    });
    });
  }

  pageUsersEvent(){

    this.sharingData.pageUserEventEmitter.subscribe(pageable => {
      this.users = pageable.users;
      this.paginator = pageable.paginator;
    
    });
  }

  findUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {

      const user = this.users.find(user => user.id == id);

      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if (user.id > 0) {
        this.service.update(user).subscribe(
          {
            next: userActualizado => {// lo actualizamos en el backend los datos
              this.users = this.users.map(userFront => (userFront.id == userActualizado.id) ? { ...userActualizado } : userFront); // lo actualizamos en el frontend
              this.router.navigate(['/users'],{
                state:{
                  users:this.users,
                  paginator : this.paginator
                }
              });

              Swal.fire({
                title: "Actualizado !",
                text: "Usuario actualizado con exito!",
                icon: "success"
              });

            },
            error : (err) => {
             // console.log(err.error);
             if(err.status = 400){
              this.sharingData.errorUserFormEventEmitter.emit(err.error);
            }
          }
          })
      } else {
        this.service.create(user).subscribe(
          {
            next: userCreado => {
              console.log(userCreado)
              this.users = [... this.users, { ...userCreado }];
              this.router.navigate(['/users'],{
                state : {
                  users : this.users,
                  paginator : this.paginator
                }
              });

              Swal.fire({
                title: "Creado !",
                text: "Usuario creado con exito!",
                icon: "success"
              });
            },
            error: (err) => {
             // console.log(err.error);
             if(err.status = 400){
              this.sharingData.errorUserFormEventEmitter.emit(err.error);
            }
          }
          })
      }

      
    })
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el usuario sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.delete(id).subscribe(() => { // eliminamos en el backend
            this.users = this.users.filter(user => user.id != id); // lo eliminamos de la vista del frontend
            this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/users'], {
                state : {
                  users : this.users,
                  paginator : this.paginator
                }
              });
            });
          })

          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }

}
