import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Injector } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { ConfirmationService } from "primeng-lts/api";
import { environment } from "src/environments/environment";
import * as toastr from 'toastr';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
    template: ''
})
export abstract class BaseResourceUtilComponent {

    [key: string]: any;

    @BlockUI()
    blockUI!: NgBlockUI;

    protected location: Location;
    protected formBuilder: FormBuilder;
    protected confirmationService: ConfirmationService;
    protected authenticationService: AuthenticationService;

    imaskTelefone = {
        mask: [
            {
                mask: "(00) 0000-0000"
            },
            {
                mask: "(00) 0 0000-0000"
            }
        ]
    }

    constructor(
        protected injector: Injector
    ) {
        this.location = this.injector.get(Location);
        this.formBuilder = this.injector.get(FormBuilder);
        this.confirmationService = this.injector.get(ConfirmationService);
        this.authenticationService = this.injector.get(AuthenticationService);
    }

    situacoes = {
        ATIVO: 'Ativo',
        INATIVO: 'Inativo'
    };

    simNaoEnum = {
        S: 'Sim',
        N: 'Não'
    };

    sexoEnum = {
        I: 'Indeterminado',
        M: 'Masculino',
        F: 'Feminino'
    }

    get situacaoOptions(): Array<any> {
        if (!this['situacaoOptionsVar']) {
            this['situacaoOptionsVar'] = this.getTypes(this.situacoes);
        }
        return this['situacaoOptionsVar'];
    }

    get simNaoEnumOptions(): Array<any> {
        if (!this['simNaoEnumOptionsVar']) {
            this['simNaoEnumOptionsVar'] = this.getTypes(this.simNaoEnum);
        }
        return this['simNaoEnumOptionsVar'];
    }

    get sexoEnumOptions(): Array<any> {
        if (!this['sexoEnumOptionsVar']) {
            this['sexoEnumOptionsVar'] = this.getTypes(this.sexoEnum);
        }
        return this['sexoEnumOptionsVar'];
    }


    convertToNumber(string: string): number {
        return new Number(string).valueOf()
    }

    isNotNulAndNotEmpty(x: any): boolean {
        return x && x != '';
    }

    back(): void {
        this.location.back();
    }

    openConfirmDialog(message: string, accept: Function, reject: Function): void {
        this.confirmationService.confirm({
            message: message,
            header: 'Confirmação',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: accept,
            reject: reject
        });
    }

    temPermissao(role: any): boolean {
        return this.authenticationService.temPermissao(role);
    }

    //PRIVATES METHODS
    protected tratarErro(err: any): void {
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
        console.log(err);
        console.error('Ocorreu um erro', err);
        this.posTratarErro();
    }

    protected erroServidor(): void {
        this.showError('Ocorreu um erro ao processar a sua solicitação.');
    }

    protected getTypes(type: any): any {
        return Object.entries(type).map(
            ([value, text]) => {
                return {
                    text: text,
                    value: value
                }
            }
        );
    }

    protected formId(required?: any): FormGroup {
        return this.formBuilder.group({
            id: [null, (required ? Validators.required : null)]
        });
    }

    protected markAsTouched(form: FormGroup): void {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control instanceof FormControl) {
                (control.valueChanges as EventEmitter<any>).emit(control.value);
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof FormGroup) {
                this.markAsTouched(control);
            }
        });
    }

    protected disableComponents(form: FormGroup, disable: boolean): void {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control instanceof FormControl) {
                if (disable) {
                    control.disabled;
                    control.disable();
                }
                else {
                    control.enabled;
                    control.enable();
                }
            }
            else if (control instanceof FormGroup) {
                this.disableComponents(control, disable);
            }
        });
    }

    protected disableControls(form: (FormGroup | any), name: string, disable: boolean): void {
        if (disable) {
            form.get(name).disabled;
            form.get(name).disable();
            form.get(name).setValue(null);
        }
        else {
            form.get(name).enabled;
            form.get(name).enable();
        }
    }

    protected realizarRequisicaoSimples(metodo: any, atributo: string, func: any): void {
        metodo.subscribe(
            (responseApi: any) => {
                if (responseApi != null) {
                    this[atributo] = responseApi;
                    if (func != null) {
                        func();
                    }
                }
                else { }
            }, (err: any) => {
                this.tratarErro(err);
            }
        );
    }

    protected buscar(metodo: any, atributo: string, func?: any): void {
        metodo.subscribe((res: any) => {
            this[atributo] = res;
            if (func != null) {
                func();
            }
        });
    }

    protected showError(detail: string) {
        toastr.error(detail, 'Error Message', {
            timeOut: 5000
        });
    }

    protected showSuccess(detail: string) {
        toastr.success(detail, 'Sucesso', {
            timeOut: 5000
        });
    }

    protected showWarning(detail: string) {
        toastr.warning(detail, 'Atenção', {
            timeOut: 5000
        });
    }

    protected mountParams(filter: FormGroup, httpParams?: any, dad?: string): any {
        let params: any = httpParams ? httpParams : {};
        Object.keys(filter.controls).forEach(field => {
            const control = filter.get(field);
            const p = dad ? `${dad}.${field}` : field;
            if (control instanceof FormControl) {
                if (filter.get(field)?.value != null) {
                    params[`${p}`] = filter.get(field)?.value;
                    // params.push({ [`${p}`]: filter.get(field)?.value });
                }
            }
            else if (control instanceof FormGroup) {
                this.mountParams(control, params, p);
            }
        });
        return params;
    }

    //OPICIONAIS
    protected posTratarErro(): void { }
}