import { AfterContentChecked, Component, Injector, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseResourceService } from "../base-resource-service/base-resource.service";
import { BaseResourceUtilComponent } from "../base-resource-util/base-resource-util.component";

@Component({
    template: ''
})
export abstract class BaseResourceFormComponent extends BaseResourceUtilComponent implements OnInit, AfterContentChecked, OnChanges {

    form!: FormGroup;
    currentAction!: string;
    pageTitle!: string;
    resource: any;
    urlList: string = '/dividaativa';
    maxDate: Date = new Date();
    minDate: Date = new Date();
    tipos: string[] = ['pdf', 'doc', 'docx', 'png', 'PNG', 'jpg', 'xls'];

    protected route: ActivatedRoute;
    protected router: Router;

    constructor(
        protected injector: Injector,
        protected resourceService: BaseResourceService
    ) {
        super(injector);
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
    }

    get possuiId(): boolean {
        return this.resource && this.resource.id && this.resource.id > 0;
    }

    ngOnInit(): void {
        this.setCurrentAction();
        this.initForm();
        this.loadResource();
        this.posNgOnInit();
    }

    ngOnChanges(changes: SimpleChanges) { }

    ngAfterContentChecked() {
        this.setPageTitle();
        this.posNgAfterContentChecked();
    }

    submitForm(): void {
        this.blockUI.start();
        this.markAsTouched(this.form);
        this.beforeSubmitForm();
        this.resource = this.form.value;
        this.resourceService.enviarFormulario(this.resource, (this.resource.id != null && this.resource.id > 0)).subscribe(
            responseApi => {
                this.blockUI.stop();
                this.tratarResponseSubimit(responseApi);
            }, err => {
                this.blockUI.stop();
                this.tratarErro(err);
            }
        );
    }

    download(filename: any, text: any) {
        var element = document.createElement('a');
        element.setAttribute('href', text);
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    //PRIVATES METHODS
    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == "new") {
            this.currentAction = "new";
        }
        else {
            this.currentAction = "edit";
        }
    }

    protected setPageTitle() {
        if (this.currentAction == "new") {
            this.pageTitle = this.createPageTitle();
        }
        else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected createPageTitle(): string {
        return 'Novo';
    }

    protected editionPageTitle(): string {
        return 'Edição';
    }

    protected loadResource(): void {
        if (this.currentAction == 'edit') {
            let id: any = this.route.snapshot.params.id;
            if (id) {
                this.realizarRequisicaoSimples(this.resourceService.getById(Number(id)), 'resource', () => {
                    if (this.resource.id == null) {
                        this.showError('Nenhum Registro encontrado.');
                    }
                    this.beforePatchValue();
                    if (this.form) {
                        console.log(this.form);
                        this.form.patchValue(this.resource);
                    }
                    this.posLoadResource();
                });
            }
        }
    }

    protected tratarResponseSubimit(responseApi: any): void {
        if (responseApi != null) {
            this.resource = responseApi;
            this.form.get('id')?.setValue(this.resource.id);
            this.beforePatchValue();
            this.posSubmitFormSucesso();
            this.form.patchValue(this.resource);
        }
    }

    //OPICIONAIS
    protected beforePatchValue(): void { }
    protected posLoadResource(): void { }
    protected posNgOnInit(): void { }
    protected posNgAfterContentChecked(): void { }
    protected beforeSubmitForm(): void { }
    protected acceptOrRejectConfirmDialog(aceito: boolean): void { }


    //ABSTRACT
    protected abstract initForm(): void;
    protected abstract posSubmitFormSucesso(): void;
}