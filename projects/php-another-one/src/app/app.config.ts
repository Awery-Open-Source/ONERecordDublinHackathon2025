import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';


import {provideToastr} from 'ngx-toastr';
import {provideRouter} from "@angular/router";
import {ApplicationConfig} from "@angular/core";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes), provideAnimationsAsync(), provideToastr()]
};
