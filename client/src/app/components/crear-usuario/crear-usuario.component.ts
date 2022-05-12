import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuarioFrom: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService
              ) { 
    this.usuarioFrom = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required,Validators.email]],
    })
  }

  ngOnInit(): void {
  }
  agregarUsuario(){
    const USUARIO: Usuario = {
      nombre: this.usuarioFrom.get('nombre')?.value,
      correo: this.usuarioFrom.get('correo')?.value
    }
    this.toastr.success('El usuario fue creado con exito', 'Usuario creado');
    this.router.navigate(['/']);
  }
}
