import {environment} from "../../environments/environment";
import {Routes} from '@angular/router';
import {SignInComponent} from "../../../php-one-lib/src/lib/pages/sign-in/sign-in.component";
import {AwbsComponent} from "../../../php-one-lib/src/lib/pages/awbs/awbs.component";
import {DetailsComponent} from "../../../php-one-lib/src/lib/pages/details/details.component";
import {URL_CONFIG} from "../../../php-one-lib/src/lib/app-config";

const Providers = [{
    provide: URL_CONFIG,
    useValue: {apiUrl: environment.url, type: 'php-another-one'}
}];

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'awbs',
        component: AwbsComponent,
        providers: Providers
    },
    {
        path: 'details/:awb_no',
        component: DetailsComponent,
        providers: Providers
    },
];
