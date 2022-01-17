import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { environment } from "src/environments/environment";
import * as toastr from 'toastr';

@Injectable({
    providedIn: 'root'
})
export class HandleError implements ErrorHandler {

    @BlockUI()
    blockUI!: NgBlockUI;

    constructor(
        private injector: Injector
    ) { }

    handleError(error: Error | HttpErrorResponse) {
        this.tratarErro(error);
    }

    // PRIVATE METHODS

    private tratarErro(err: Error | HttpErrorResponse): void {
        this.blockUI.stop();
        if (typeof err === 'string') {
            this.showError(err);
        }
        else if (err instanceof HttpErrorResponse
            && err.status >= 400 && err.status <= 499) {
            if (err.status == 401) {
                this.erroServidor();
                window.location.href = environment.URL_LOGIN
            }
            else if (err.status == 403) {
                this.showError('Operação não autorizada.');
            }
            else {
                try {
                    if (err?.error?.messages?.length > 0) {
                        err.error.messages.forEach((er: any) => this.showError(er));
                    }
                } catch (e) { }
            }
        }
        else {
            this.erroServidor();
        }
    }

    private showError(err: any): void {
        toastr.error(err, 'Error Message', {
            timeOut: 5000
        });
    }

    private erroServidor(): void {

    }
}