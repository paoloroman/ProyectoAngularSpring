import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  user: User;

  constructor(private sharingData : SharingDataService){
    this.user = new User();
  }

  onSubmit(){
    if(!this.user.usuario || !this.user.pwd){
      Swal.fire(
        'Error de validación',
        'Usuario y contraseña requeridos!',
        'error'
      );
    }else{
      this.sharingData.handlerLoginEventEmitter.emit({usuario:this.user.usuario , pwd: this.user.pwd});
    }
  }
}
