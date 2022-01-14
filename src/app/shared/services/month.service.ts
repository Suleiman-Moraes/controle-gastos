import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResourceService } from '../components/base-resource-service/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class MonthService extends BaseResourceService {

  private route: string;

  constructor(
    protected injector: Injector
  ) {
    super(`${environment.API_URL}/api/month`, injector);
    this.route = this.apiPath;
  }
}
