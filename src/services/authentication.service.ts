import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
// import { userInfo } from 'os';

export interface UserDetails {
  id: number;
  usuario: string;
  password: string;
  user_type: string;
  region: string;
  marca: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  id: number;
  usuario: string;
  password: string;
  user_type: string;
  marca: string;
  region: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;
  baseUrl = "http://localhost:3000";
  /// baseUrl = '';

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem("usertoken", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("usertoken");
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  IsAdmin(): number {
    const user = this.getUserDetails();

    if (user) {
      return user.user_type === "admin" ? 1 : 7; // si es admin regresa 1 , si no 7
    } else {
      return 0;
    }
  }

  IsSupervisor(): number {
    const user = this.getUserDetails();
    if (user) {
      return user.user_type == "supervisor" ? 2 : 7; // si es supervisor regresa 2 , si no 7
    } else {
      return 0;
    }
  }

  IsVendedor(): number {
    const user = this.getUserDetails();
    if (user) {
      console.log(user.password);

      return user.user_type == "vendedor" ? 3 : 7; // si es supervisor regresa 3 , si no 7
    } else {
      return 0;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  // *******************************************************************************************

  // REGISTRAR USUARIO
  public register(user: TokenPayload): Observable<any> {
    // console.log(user);
    return this.http.post(this.baseUrl + `/api/user/register`, user);
  }

  // LISTARLOS
  public ListarUsuarios(): Observable<any> {
    console.log("entro a listar");
    // console.log(this.getToken());

    return this.http.get(`${this.baseUrl}/api/user/ListarUsuarios`,{
      headers: { Authorization: ` ${this.getToken()}` },

    });
  }

  // // ELIMINARLOS
  // public eliminarUsuario(id: string): Observable<any> {
  //   console.log(`se eliminara ${id}`);

  //   return this.http.delete(this.baseUrl + `/api/user/ListarUsuarios/${id}`);
  // }

  // // ACTUALIZAR USUARIO
  // public ActualizarUsuario(
  //   id: string,
  //   updateUsuario: UserDetails
  // ): Observable<any> {
  //   return this.http.put(
  //     this.baseUrl + `/api/user/ListarUsuarios/${id}`,
  //     updateUsuario
  //   );
  // }

  // *******************************************************************************************

  // LOGIN
  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(this.baseUrl + `/api/user/login`, user);

    console.log(base);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        console.log(data);
        return data;
      })
    );

    return request;
  }

  // PERFIL INFORMACION
  public profile(): Observable<any> {
    // console.log(this.getToken());
    return this.http.get(this.baseUrl + `/api/user/profile`, {
      headers: { Authorization: ` ${this.getToken()}` },
    });
  }

  // SALIR
  public logout(): void {
    this.token = "";
    window.localStorage.removeItem("usertoken");
    this.router.navigateByUrl("/");
  }
}
