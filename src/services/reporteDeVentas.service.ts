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
export interface ReporteVentasLoad2 {
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
  createdAt: string;
}

@Injectable()
export class ReporteDeVentasService {
  baseUrl = "http://localhost:3000/api/Reportes_Ventas/";

  constructor(private http: HttpClient, private router: Router) {}

  // ADD RV
  public registerAuto(rv: any): Observable<any> {
    return this.http.post(`${this.baseUrl}AgregarVentaAlReporte`, rv);
  }
  // Listar Venta del dia actual
  public ListarRVHoy(marca: any, region: any, createdAt: any): Observable<any> {
    console.log(
      `la fecha es ${createdAt} la marca es ${marca} la region es ${region}`
    );
    return this.http.get(
      `${this.baseUrl}/listarReportesVentas/${marca}/${region}/${createdAt}`
    );
  }

  // Listar info por id
  public ObtenerInfoId(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}ListarIdRV/${id}`);
  }

  // Eliminar
  public EliminarVenta(id: any): Observable<any> {
    console.log(id);
    return this.http.get(`${this.baseUrl}EliminarVenta/${id}`);
  }

  // Actualizar
  public ActualizarInfoRV(
    id: any,
    dataInfo: ReporteVentasLoad2
  ): Observable<any> {
    console.log(dataInfo);
    console.log(id);
    return this.http.put(
      `${this.baseUrl}ActualizarIDReporteVentas/${id}`,
      dataInfo
    );
  }
}
