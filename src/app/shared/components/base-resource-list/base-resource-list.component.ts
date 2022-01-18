import { Component, Injector, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { BaseResourceService } from "../base-resource-service/base-resource.service";
import { BaseResourceUtilComponent } from "../base-resource-util/base-resource-util.component";

@Component({
    template: ''
})
export abstract class BaseResourceListComponent extends BaseResourceUtilComponent implements OnInit, OnChanges {

    page: number = 0;
    size: number = 10;
    resources: any;
    filterForm!: FormGroup;
    title: string = '';
    router: Router;

    hoje = new Date();

    protected titleService: Title;
    protected route: ActivatedRoute;

    //Permissões
    constructor(
        private resourceService: BaseResourceService,
        protected injector: Injector
    ) {
        super(injector);
        this.router = this.injector.get(Router);
        this.route = this.injector.get(ActivatedRoute);
        this.titleService = injector.get(Title);
    }

    ngOnInit(): void {
        new Promise((resolve, reject) => {
            this.buildForm();
            resolve(0);
        }).then((_) => {
            this.populateForm();
        });
        this.posNgOnInit();
    }

    ngOnChanges(changes: SimpleChanges) { }

    // getSituacaoEnum(tipo: string): string{
    //   return SituacaoEnum[tipo];
    // }

    paginate(event?: any) {
        if (event) {
            this.size = event.rows;
            this.page = event.page;
            this.filterForm?.get('size')?.setValue(this.size);
        }
        else {
            this.page = 0;
        }
        this.filterForm?.get('page')?.setValue(this.page);
        this.findByPararamsFilter();
    }

    buildForm(): void {
        this.filterForm = this.formBuilder.group({
            page: [this.page],
            size: [this.size]
        });
    }

    deleteById(id: any): void {
        this.openConfirmDialog('Confirma remover esse registro?', () => {
            this.tratarUpdateRegistro(this.resourceService.delete(id));
        }, () => { });
    }

    //PRIVATE METHODS
    protected findByPararamsFilter(): void {
        this.resourceService.findByPararamsFilter(this.filterForm).subscribe(
            responseApi => {
                this.tratarResponseApi(responseApi);
                this.addParamUrl(this.filterForm);
            }, err => {
                this.tratarErro(err);
            }
        );
    }

    protected addParamUrl(filterForm: FormGroup): void {
        let params: any = this.mountParams(filterForm);
        params = this.addParamDefault(params);

        const url = this.router.createUrlTree([], { relativeTo: this.activatedRoute, queryParams: params }).toString()
        this.location.go(url);
    }

    protected populateForm(): void {
        for (const name in this.route.snapshot.queryParams) {
            this.filterForm.get(name)?.setValue(this.route.snapshot.queryParams[name]);
        }
    }

    protected tratarResponseApi(responseApi: any): void {
        if (responseApi != null) {
            this.resources = responseApi;
            if (this.resources.totalElements == 0) {
                this.showWarning('Nenhum Registro Encontrado.');
            }
        }
        else { }
    }

    protected download(filename: any, text: any) {
        var element = document.createElement('a');
        element.setAttribute('href', text);
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    protected tratarUpdateRegistro(metodo: any): void {
        this.blockUI.start();
        metodo.subscribe(
            (responseApi: any) => {
                this.blockUI.stop();
                this.showSuccess('Registro atualizado com Sucesso.');
                this.paginate();
            }, (err: any) => {
                this.blockUI.stop();
                this.tratarErro(err);
            }
        );
    }

    //OPCIONAIS
    protected posNgOnInit(): void {
        this.findByPararamsFilter();
    }
    protected addParamDefault(params: any): any {
        return params;
    }
}