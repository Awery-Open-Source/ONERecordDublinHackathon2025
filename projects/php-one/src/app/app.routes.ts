import {Routes} from '@angular/router';
import {SignInComponent} from "../../../php-one-lib/src/lib/pages/sign-in/sign-in.component";
import {SubscribersComponent} from "./pages/subscribers/subscribers.component";
import {CreateComponent} from "./pages/create/create.component";
import {DetailsComponent} from "../../../php-one-lib/src/lib/pages/details/details.component";
import {AwbsComponent} from "../../../php-one-lib/src/lib/pages/awbs/awbs.component";

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
    {
        path: 'create-awb',
        component: CreateComponent
    },
    {
        path: 'subscribers',
        component: SubscribersComponent
    },
];
