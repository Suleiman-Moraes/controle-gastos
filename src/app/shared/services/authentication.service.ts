import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public static timeRenovacao = null;
  oauthTokenUrl: string;
  logoutUrl: string;
  jwtPayload: any;
  @BlockUI()
  blockUI!: NgBlockUI;
  private basicToken: string = 'YW5ndWxhcjpAbmd1bEByMA==';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    // private statusService: StatusService
  ) {
    this.oauthTokenUrl = `${environment.API_URL}/oauth/token`;
    this.logoutUrl = `${environment.API_URL}/tokens/revoke`;
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    this.blockUI.start();
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', `Basic ${this.basicToken}`);

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then((response: any) => {
        this.blockUI.stop();
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        this.blockUI.stop();

        if (response.status === 400) {
          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  // loginBasic(usuario: string, senha: string): Promise<void> {
  //   this.blockUI.start();
  //   this.basicToken = btoa(`${usuario}:${senha}`);
  //   this.armazenarToken(this.basicToken);
  //   return this.statusService.auth().toPromise().then((res: any) => {
  //     this.blockUI.stop();
  //   }).catch(() => {
  //     this.blockUI.stop();
  //     sessionStorage.clear();
  //     this.jwtPayload = null;
  //     return Promise.reject('Usuário ou senha inválida!');
  //   });
  // }

  obterNovoAccessToken(): Promise<null> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', `Basic ${this.basicToken}`);

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response['access_token']);

        console.log('Novo access token criado!');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalido() {
    if (environment.BASIC_AUTHENTICATION) {
      return false;
    }
    else {
      const token = this.getToken();
      return !token || this.jwtHelper.isTokenExpired(token);
    }
  }

  limparAccessToken() {
    sessionStorage.removeItem('token');
    this.jwtPayload = null;
  }

  temPermissao(permissao: string) {
    return environment.BASIC_AUTHENTICATION ||
      (this.jwtPayload && this.jwtPayload.authorities.includes(permissao));
  }

  getName() {
    return environment.BASIC_AUTHENTICATION ? "Nome" :
      this.jwtPayload?.name;
  }

  temQualquerPermissao(roles: any) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  getToken(): any {
    const token = sessionStorage.getItem('token');
    if (token) {
      return token;
    }
    else {
      return null;
    }
  }

  logout(): void {
    if (sessionStorage.getItem('token')) {
      this.http.delete(this.logoutUrl, { withCredentials: true })
        .toPromise()
        .then(() => {
          sessionStorage.clear();
          this.jwtPayload = null;
        }).catch(response => {
          sessionStorage.clear();
          return Promise.resolve(null);
        });
    }
  }

  private armazenarToken(token: string) {
    sessionStorage.setItem('token', token);
    if (!environment.BASIC_AUTHENTICATION) {
      this.jwtPayload = this.jwtHelper.decodeToken(token);
    }
  }

  private carregarToken() {
    const token = this.getToken();

    if (token) {
      this.armazenarToken(token);
    }
  }
}
