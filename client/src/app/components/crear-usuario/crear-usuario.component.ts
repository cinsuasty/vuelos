import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuarioFrom: FormGroup;
  titulo =  'Crear usuario';
  id: string | null;
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _usuarioService: UsuarioService,
              private aRouter: ActivatedRoute) { 
    this.usuarioFrom = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required,Validators.email]],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarUsuario(){
    const USUARIO: Usuario = {
      nombre: this.usuarioFrom.get('nombre')?.value,
      correo: this.usuarioFrom.get('correo')?.value
    }

    if(this.id !== null) {
      //Editar producto
      this._usuarioService.editarUsuario(this.id, USUARIO).subscribe(data => {
        this.toastr.info('El usuario fue editado con exito', 'Usuario editado');
        this.router.navigate(['/']);
      }, error => {
        this.toastr.warning(error.error.errors[0].msg, 'Error');
        this.usuarioFrom.reset();
      })
    }else {
      //Crear producto
      this._usuarioService.crearUsuario(USUARIO).subscribe(data =>{
        this.toastr.success('El usuario fue creado con exito', 'Usuario creado');
        this.router.navigate(['/']);
      }, error => {
        this.toastr.warning(error.error.errors[0].msg, 'Error');
        this.usuarioFrom.reset();
      })
    }
  }

  esEditar(){
    if (this.id !== null) {
      this.titulo = 'Editar usuarios';
      this._usuarioService.obtenerUsuario(this.id).subscribe(data => {
        this.usuarioFrom.setValue({
          nombre: data.nombre,
          correo:  data.correo
        })
      }, error => {
        this.toastr.warning(error.error.errors[0].msg, 'Error');
      })
    }
  }
}
