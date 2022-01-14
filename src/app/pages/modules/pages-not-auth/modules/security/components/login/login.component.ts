import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';

@Component({
  selector: 'controle-gastos-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseResourceUtilComponent implements OnInit {

  login: any = 'adm';
  password: any = '123456';

  constructor(
    protected injector: Injector,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void { }

  logInto(): void {
    const metodo = this.authenticationService.login(this.login, this.password);
    metodo.then(() => {
      if (this.route.snapshot.queryParams.from?.length > 0) {
        this.router.navigateByUrl(this.route.snapshot.queryParams.from);
      }
      else {
        this.router.navigateByUrl('/authpages');
      }
    }).catch(erro => {
      this.tratarErro(erro);
    });
  }
}
