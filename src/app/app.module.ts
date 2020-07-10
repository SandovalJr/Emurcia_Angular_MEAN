import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";

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
import { LogInErrorComponent } from "./components/sw/log-in-error/log-in-error.component";

// validator RXJS
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ReactiveFormsModule } from "@angular/forms";

// ANGULAR MATERIAL
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
// import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import { MatListModule } from  '@angular/material/list';

// ADMIN
import { SideNavComponent } from './components/sw/user_types/administrador/side-nav/side-nav.component';
import { InicioAdminComponent } from './components/sw/user_types/administrador/inicio-admin/inicio-admin.component';




@NgModule({
  declarations: [
    AppComponent,
    PwComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    NosotrosComponent,
    LogInSWComponent,
    SwComponent,
    AdministradorComponent,
    SupervisorComponent,
    VendedorComponent,
    LogInErrorComponent,
    SideNavComponent,
    InicioAdminComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    APP_ROUTES,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatButtonModule,
    MatIconModule,
    // FlexLayoutModule,
    MatListModule,
    MatMenuModule
  ],
  exports: [
    MatTabsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
