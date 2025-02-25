import {Routes} from '@angular/router';
import {SignInComponent} from "../../../php-one-lib/src/lib/pages/sign-in/sign-in.component";
import {AwbsComponent} from "../../../php-one-lib/src/lib/pages/awbs/awbs.component";
import {DetailsComponent} from "../../../php-one-lib/src/lib/pages/details/details.component";

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
        component: AwbsComponent
    },
    {
        path: 'details/:awb_no',
        component: DetailsComponent
    },
];
