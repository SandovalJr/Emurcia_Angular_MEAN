import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

export interface ReporteVentasDetails {
  id_RV: number;
  marca: string;
  region: string;
  auto: string;
  Cilidros_Vacios: number;
  Venta_Kilos: number;
  Precio_Prom: number;
  Importe_Liquidar: number;
  Recibe_caja_efectivo: number;
  credito_cilindro: number;
  Importe_credito: number;
  Cel_Tel_Cliente: string;
  Litros_Consumo: number;
  INV_CIL: number;
  Equiv_KG: number;
  Comentarios: string;
  exp: number;
  iat: number;
}

export interface ReporteVentasLoad {
  id_RV: number;
  marca: string;
  region: string;
  auto: string;
  Venta_Kilos: number;
  Precio_Prom: number;
  Importe_Liquidar: number;
  Recibe_caja_efectivo: number;
  credito_cilindro: number;
  Importe_credito: number;
  Cel_Tel_Cliente: string;
  Litros_Consumo: number;
  INV_CIL: number;
  Equiv_KG: number;
  Comentarios: string;
  Cilidros_Vacios: number;
}

@Injectable()
export class ReporteDeVentasService {
  baseUrl = "http://localhost:3000/api/Reportes_Ventas/";

  constructor(private http: HttpClient, private router: Router) {}

  // ADD RV
  public registerAuto(rv: any): Observable<any> {
    return this.http.post(`${this.baseUrl}AgregarVentaAlReporte`, rv);
  }
}
