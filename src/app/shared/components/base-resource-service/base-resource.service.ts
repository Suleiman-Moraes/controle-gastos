import { HttpClient, HttpParams } from "@angular/common/http";
import { Injector } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

export abstract class BaseResourceService {

    protected http: HttpClient;

    constructor(
        protected apiPath: string,
        protected injector: Injector
    ) {
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<any> {
        return this.http.get(this.apiPath).pipe(
            map((res: any) => res),
            catchError(this.handleError)
        )
    }

    getById(id: number): Observable<any> {
        return this.getUtil(`${this.apiPath}/${id}`);
    }

    imprimirUtil(url: string): Observable<any> {
        return this.getUtil(url);
    }

    getUtil(url: string): Observable<any> {
        return this.http.get(url).pipe(
            map((res: any) => res),
            catchError(this.handleError)
        )
    }

    imprimirUtilComBody(url: string, object: any): Observable<any> {
        return this.http.post(url, object).pipe(
            map((res: any) => res),
            catchError(this.handleError)
        )
    }

    create(resource: any): Observable<any> {
        return this.http.post(this.apiPath, resource).pipe(
            map((res: any) => res),
            catchError(this.handleError)
        )
    }

    update(resource: any, id?: any): Observable<any> {
        id = id ? id : resource.id;
        return this.http.put(`${this.apiPath}/${id}`, resource).pipe(
            map((res: any) => res),
            catchError(this.handleError)
        );
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.apiPath}/${id}`).pipe(
            map((res: any) => res),
            catchError(this.handleError)
        );
    }

    enviarFormulario(resource: any, metodo: boolean): Observable<any> {
        return metodo ? this.update(resource) : this.create(resource);
    }

    findByPararamsFilter(filterForm: FormGroup): Observable<any> {
        let params: HttpParams = new HttpParams();
        if (filterForm) {
            params = this.mountParams(filterForm, params);
        }
        return this.http.get
            (`${this.apiPath}/filter`, { params: params })
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            );
    }

    // PROTECTED METHODS
    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }

    protected mountParams(filter: FormGroup, httpParams?: HttpParams, dad?: string): HttpParams {
        let params: HttpParams = httpParams ? httpParams : new HttpParams();
        Object.keys(filter.controls).forEach(field => {
            const control = filter.get(field);
            const p = dad ? `${dad}.${field}` : field;
            if (control instanceof FormControl) {
                if (filter.get(field)?.value != null) {
                    params = params.append(p, filter.get(field)?.value);
                }
            }
            else if (control instanceof FormGroup) {
                this.mountParams(control, params, p);
            }
        });
        return params;
    }
}