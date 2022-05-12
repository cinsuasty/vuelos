import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aerolinea } from '../models/aerolinea';

@Injectable({
  providedIn: 'root'
})
export class AerolineaService {
  url = 'http://localhost:8080/api/aerolineas/';
  constructor( private http: HttpClient) { }

    getAerolineas(): Observable<any>{
      return this.http.get(this.url);
    }

    eliminarAerolinea(id: string): Observable<any>{
      return this.http.delete(this.url + id)
    }

    crearAerolinea(aerolinea: Aerolinea): Observable<any>{
      return this.http.post(this.url, aerolinea);
    }

    obtenerAerolinea(id: string): Observable<any>{
      return this.http.get(this.url+id);
    }

    editarAerolinea(id: string, aerolinea: Aerolinea): Observable<any>{
      return this.http.put(this.url+id, aerolinea);
    }

}
