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

  // DELETE AUTO TANQUE

  // UPDATE AUTO TANQUE

  // LISTAR AUTO TANQUES

  // INFO POR ID
}
