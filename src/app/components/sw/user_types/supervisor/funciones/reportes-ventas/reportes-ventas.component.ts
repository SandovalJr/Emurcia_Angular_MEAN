import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-reportes-ventas",
  templateUrl: "./reportes-ventas.component.html",
  styleUrls: ["./reportes-ventas.component.scss"],
})
export class ReportesVentasComponent implements OnInit {
  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public AgregarVenta() {
    const marca = this.activatedRouter.snapshot.paramMap.get("marca");
    const region = this.activatedRouter.snapshot.paramMap.get("region");
    const createdAt = this.activatedRouter.snapshot.paramMap.get("createdAt");
    // console.log(` la fecha de parametro es: ${createdAt}`);
    // console.log(` la marca de parametro es: ${marca} y la region es ${region}`);

    this.router.navigateByUrl(
      `/SupervisorProfile/AgregarVentaRVComponent/${marca}/${region}/${createdAt}`
    );
  }
}
