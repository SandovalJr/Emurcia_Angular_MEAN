import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// RUTAS
import { APP_ROUTES } from "./routes/app.routes";

import { AppComponent } from "./app.component";

import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule } from "@angular/forms";
import { PwComponent } from "./components/pw/pw.component";
import { NavbarComponent } from "./components/pw/partials/navbar/navbar.component";
import { FooterComponent } from "./components/pw/partials/footer/footer.component";
import { InicioComponent } from "./components/pw/inicio/inicio.component";
import { NosotrosComponent } from "./components/pw/nosotros/nosotros.component";
import { AliadosComponent } from "./components/pw/aliados/aliados.component";
import { AlfagasComponent } from "./components/pw/aliados/alfagas/alfagas.component";
import { AuregasComponent } from "./components/pw/aliados/auregas/auregas.component";
import { GasCanonComponent } from "./components/pw/aliados/gas-canon/gas-canon.component";
import { GasLuxComponent } from "./components/pw/aliados/gas-lux/gas-lux.component";
import { HaciendaNuevaComponent } from "./components/pw/aliados/hacienda-nueva/hacienda-nueva.component";
import { ServiciosComponent } from "./components/pw/servicios/servicios.component";
import { ContactoComponent } from "./components/pw/contacto/contacto.component";
import { LogInSWComponent } from "./components/sw/log-in-sw/log-in-sw.component";
import { SwComponent } from "./components/sw/sw.component";

// FORMULARIO Y LOG IN
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

// TIPOS DE USUARIOS
import { AdministradorComponent } from "./components/sw/user_types/administrador/administrador.component";
import { SupervisorComponent } from "./components/sw/user_types/supervisor/supervisor.component";
import { VendedorComponent } from "./components/sw/user_types/vendedor/vendedor.component";

// Servicios
import { AuthGuardService } from "../services/auth-guard.service";
import { AuthenticationService } from "../services/authentication.service";

@NgModule({
  declarations: [
    AppComponent,
    PwComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    NosotrosComponent,
    AliadosComponent,
    AlfagasComponent,
    AuregasComponent,
    GasCanonComponent,
    GasLuxComponent,
    HaciendaNuevaComponent,
    ServiciosComponent,
    ContactoComponent,
    LogInSWComponent,
    SwComponent,
    AdministradorComponent,
    SupervisorComponent,
    VendedorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    APP_ROUTES,
    HttpClientModule,
    RouterModule,
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
