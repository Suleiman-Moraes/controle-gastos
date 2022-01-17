import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { BlockUIModule } from 'ng-block-ui';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './pages/modules/pages-not-auth/modules/security/auth.guard';
import { HandleError } from './shared/handle-error/handle-error';

export function tokenGetter(): string | null {
  return sessionStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BlockUIModule.forRoot({
      message: 'Carregando',
      delayStop: 500
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains,
        disallowedRoutes: environment.tokenDisallowedRoutes
      }
    })
  ],
  providers: [
    ConfirmationService,
    MessageService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: HandleError
    },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
