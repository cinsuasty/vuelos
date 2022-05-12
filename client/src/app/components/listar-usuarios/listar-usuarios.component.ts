import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'],
})
export class ListarUsuariosComponent implements OnInit {

  listUsuarios: Usuario[] = [];

  constructor( private _usuarioService: UsuarioService,
              private _toastr: ToastrService       
    ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this._usuarioService.getUsuarios().subscribe(data => {
      this.listUsuarios = data.usuarios;
    },err => {
      console.log(err);
    })
  }

  eliminarUsuario(id: any){
    this._usuarioService.eliminarUsuario(id).subscribe(data => {
      this._toastr.error('El usuario fue eliminado con exito','Usuario eliminado');
      this.obtenerUsuarios();
    },err => {
      console.log(err);
    })
  }
}
