import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MessageErrorsService {
  constructor() {}
  public errorMessage(errorRecibido: Object) {
    let message: string;
    if (errorRecibido == null) {
      return {
        error: false,
      };
    }

    switch (true) {
      case errorRecibido.hasOwnProperty("required"):
        message: "Es necesario este campo";
        break;

      case errorRecibido.hasOwnProperty("onlyAlpha"):
        message = "Este campo tiene caracteres innecesarios";
        break;

      case errorRecibido.hasOwnProperty("minLength"):
        message = "Es necesario minimo 3 caracteres";
        break;
    }
    return {
      message,
      error: true,
    };
  }
}
