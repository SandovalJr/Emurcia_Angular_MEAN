import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

export interface Autos_Tanques_Details {
  id_autoTanque: number;
  Num_eco: number;
  anio: number;
  ubicacion: string;
  num_serie: string;
  marca_auto: string;
  modelo: string;
  placas: string;
  chofer_ruta: string;
  cilindros_piezas: number;
  observaciones: string;
  AutoTanque: number;
  marca: string;
  Porcentaje_Salida_Llegada: number;
  exp: number;
  iat: number;
}

export interface Auto_TanquesLoad {
  id_autoTanque: number;
  Num_eco: number;
  anio: number;
  ubicacion: string;
  num_serie: string;
  marca_auto: string;
  modelo: string;
  placas: string;
  chofer_ruta: string;
  cilindros_piezas: number;
  observaciones: string;
  AutoTanque: number;
  marca: string;
  Porcentaje_Salida_Llegada: number;
}
@Injectable()
export class auto_Tanques_Service {
  baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient, private router: Router) {}

  // ADD AUTO TANQUE
  public registerAuto(auto: any): Observable<any> {
    console.log("llego");
    console.log(auto);
    return this.http.post(
      `${this.baseUrl}/api/auto_tanque/AgregarAutoTanque`,
      auto
    );
  }

  // DELETE AUTO TANQUE
  public EliminarAutoTanque(id: any): Observable<any> {
    console.log(id);
    return this.http.get(
      `${this.baseUrl}/api/auto_tanque/EliminarAutoTanque/${id}`
    );
  }
  // UPDATE AUTO TANQUE
  public EditarAutosTanques(
    id: any,
    InformacioAuto: Auto_TanquesLoad
  ): Observable<any> {
    console.log(id);
    console.log(InformacioAuto);
    return this.http.put(
      `${this.baseUrl}/api/auto_tanque/ActualizarAutoTanque/${id}`,
      InformacioAuto
    );
  }

  // LISTAR AUTO TANQUES
  public ListarAutoTanques(marcaempresa: any, region: any): Observable<any> {
    console.log(marcaempresa);
    console.log("ser" + region);

    return this.http.get(
      `${this.baseUrl}/api/auto_tanque/ListarAutoTanques/${marcaempresa}/${region}`
    );
  }
  // INFO POR ID
  public ListarInfoAT(id: any): Observable<any> {
    // console.log(id);
    return this.http.get(
      `${this.baseUrl}/api/auto_tanque/ListarActualizarAutoTanque/${id}`
    );
  }
}
