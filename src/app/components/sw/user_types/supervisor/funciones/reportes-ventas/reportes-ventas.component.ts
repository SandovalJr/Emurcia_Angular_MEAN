import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ReporteVentasLoad,
  ReporteDeVentasService,
} from "../../../../../../../services/reporteDeVentas.service";
@Component({
  selector: "app-reportes-ventas",
  templateUrl: "./reportes-ventas.component.html",
  styleUrls: ["./reportes-ventas.component.scss"],
})
export class ReportesVentasComponent implements OnInit {
  serach_VRhoy: any;
  pageActual: number = 1;
  VentaAct = [];
  public marca = this.activatedRouter.snapshot.paramMap.get("marca");
  public region = this.activatedRouter.snapshot.paramMap.get("region");
  public createdAt = this.activatedRouter.snapshot.paramMap.get("createdAt");

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private RVService: ReporteDeVentasService
  ) {
    this.ListarInfoVenta();
  }

  ngOnInit(): void {}

  public AgregarVenta() {
    this.router.navigateByUrl(`/SupervisorProfile/AgregarVentaRVComponent`);
  }

  public ListarInfoVenta() {
    // console.log(` la fecha de parametro es: ${this.createdAt}`);
    // console.log(
    //   ` la marca de parametro es: ${this.marca} y la region es ${this.region}`
    // );

    let marcaempresa = this.activatedRouter.snapshot.paramMap.get("marca");
    let region = this.activatedRouter.snapshot.paramMap.get("region");
    console.log();
    this.VentaAct = [];
    this.RVService.ListarRVHoy(
      this.marca,
      this.region,
      this.createdAt
    ).subscribe(
      (venta) => {
        this.VentaAct = venta;
        console.log(this.VentaAct);
        // loading true
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public ElimiarVenta(id: any) {
    this.RVService.EliminarVenta(id).subscribe(
      () => {
        window.location.reload();
        // console.log("Eliminado con exito");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public EditarVenta(id: any) {
    this.router.navigateByUrl(`SupervisorProfile/Editar_Venta/${id}`);
  }

  public VerVentaInfor(id: any) {
    this.router.navigateByUrl(`SupervisorProfile/Ver_Venta/${id}`);
  }


}
