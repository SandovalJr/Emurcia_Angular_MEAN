import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

export interface AutosDetails {
  id_auto: number;
  Num_eco: number;
  anio: number;
  ubicacion: string;
  num_serie: string;
  marca_auto: string;
  modelo: string;
  placas: string;
  chofer_ruta: string;
  cilindros_piezas: number;
  marca: string;
  exp: number;
  iat: number;
}

export interface AutosLoad {
  id_auto: number;
  Num_eco: number;
  anio: number;
  ubicacion: string;
  num_serie: string;
  marca_auto: string;
  modelo: string;
  placas: string;
  chofer_ruta: string;
  cilindros_piezas: number;
  marca: string;
}

@Injectable()
export class autosService {
  baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient, private router: Router) {}

  // ADD AUTO
  public registerAuto(auto: any): Observable<any> {
    // console.log("llego");
    // console.log(auto);

    return this.http.post(`${this.baseUrl}/api/autos/registerAutos`, auto);
  }

  // DELETE AUTO
  public EliminarAuto(id: any): Observable<any> {
    // console.log(`se eliminara el auto con el id: ${id}`);
    return this.http.get(`${this.baseUrl}/api/autos/EliminarAuto/${id}`);
  }
  // UPDATE AUTO
  public ActualizarInfoAuto(
    id: any,
    updateAutoInfo: AutosLoad
  ): Observable<any> {
    console.log(`el id de actualizar es ${id}`);
    console.log(updateAutoInfo);

    return this.http.put(
      this.baseUrl + `/api/autos/ActualizarAuto/${id}`,
      updateAutoInfo
    );
  }
  // LIST
  public ListarAuto(marcaempresa: any, region: any): Observable<any> {
    console.log(marcaempresa);
    console.log(` s ${region}`);

    return this.http.get(
      `${this.baseUrl}/api/autos/ListarAutos/${marcaempresa}/${region}`
    );
  }

  // Informacion del id a actualizar
  public InfoAutoEdit(id: any): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/api/autos/ListarActualizarAuto/${id}`
    );
  }
}
