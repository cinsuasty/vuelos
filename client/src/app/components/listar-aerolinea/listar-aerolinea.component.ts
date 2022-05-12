import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Aerolinea } from 'src/app/models/aerolinea';
import { AerolineaService } from 'src/app/services/aerolinea.service';

@Component({
  selector: 'app-listar-aerolinea',
  templateUrl: './listar-aerolinea.component.html',
  styleUrls: ['./listar-aerolinea.component.css']
})
export class ListarAerolineaComponent implements OnInit {

  listAerolineas: Aerolinea [] = [];

  constructor(
        private _aerolineaService: AerolineaService,
        private _toastr: ToastrService   
  ) { }


  ngOnInit(): void {
    this.obtenerAerolineas();
  }

  obtenerAerolineas(){
    this._aerolineaService.getAerolineas().subscribe(data => {
      this.listAerolineas = data.aerolineas;
    },err => {
      console.log(err);
    })
  }

  eliminarAerolinea(id: any){
    this._aerolineaService.eliminarAerolinea(id).subscribe(data => {
      this._toastr.error('La aerolinea fue eliminada con exito','Aerolinea eliminada');
      this.obtenerAerolineas();
    },err => {
      console.log(err);
    })
  }

}
