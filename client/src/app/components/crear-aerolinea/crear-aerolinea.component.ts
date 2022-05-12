import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aerolinea } from 'src/app/models/aerolinea';
import { AerolineaService } from '../../services/aerolinea.service';

@Component({
  selector: 'app-crear-aerolinea',
  templateUrl: './crear-aerolinea.component.html',
  styleUrls: ['./crear-aerolinea.component.css']
})
export class CrearAerolineaComponent implements OnInit {

  aerolineaFrom: FormGroup;
  titulo =  'Crear usuario';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _aerolineaService: AerolineaService,
    private aRouter: ActivatedRoute
  ) { 
    this.aerolineaFrom = this.fb.group({
      nombre: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }


  agregarAerolinea(){
    const AEROLINEA: Aerolinea = {
      nombre: this.aerolineaFrom.get('nombre')?.value
    }

    if(this.id !== null) {
      //Editar producto
      this._aerolineaService.editarAerolinea(this.id, AEROLINEA).subscribe(data => {
        this.toastr.info('La aerolinea fue editada con exito', 'Aerolinea editada');
        this.router.navigate(['listar-aerolineas']);
      }, error => {
        this.toastr.warning(error.error.errors[0].msg, 'Error');
        this.aerolineaFrom.reset();
      })
    }else {
      //Crear producto
      this._aerolineaService.crearAerolinea(AEROLINEA).subscribe(data =>{
        this.toastr.success('La aerolinea fue creada con exito', 'Aerolinea creada');
        this.router.navigate(['listar-aerolineas']);
      }, error => {
        this.toastr.warning(error.error.msg, 'Error');
        this.aerolineaFrom.reset();
      })
    }
  }

  esEditar(){
    if (this.id !== null) {
      this.titulo = 'Editar aerolinea';
      this._aerolineaService.obtenerAerolinea(this.id).subscribe(data => {
        this.aerolineaFrom.setValue({
          nombre: data.nombre
        })
      }, error => {
        this.toastr.warning(error.error.errors[0].msg, 'Error');
      })
    }
  }
}
