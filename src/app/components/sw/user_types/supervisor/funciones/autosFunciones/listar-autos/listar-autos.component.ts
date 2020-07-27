import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-listar-autos",
  templateUrl: "./listar-autos.component.html",
  styleUrls: ["./listar-autos.component.scss"],
})
export class ListarAutosComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  GoToAgregarAuto() {
    this.router.navigate(["SupervisorProfile/AgregarAuto"]);
  }


}
