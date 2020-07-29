import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

export interface AutosDetails {
  id_auto: number;
  Num_eco: number;
  año: number;
  ubicacion: string;
  num_serie: string;
  marca_auto: string;
  modelo: string;
  placas: string;
  chofer_ruta: string;
  cilindros_piezas: string;
  marca: string;
  exp: number;
  iat: number;
}

export interface AutosLoad {
  id_auto: number;
  Num_eco: number;
  año: number;
  ubicacion: string;
  num_serie: string;
  marca_auto: string;
  modelo: string;
  placas: string;
  chofer_ruta: string;
  cilindros_piezas: string;
  marca: string;
}

@Injectable()
export class autosService {
  baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient, private router: Router) {}

  // ADD AUTO
  public registerAuto(auto: AutosLoad): Observable<any> {
    console.log(auto);
    return this.http.post(this.baseUrl + `/api/autos/registerAutos`, auto);
  }

  // DELETE AUTO

  // UPDATE AUTO
}
