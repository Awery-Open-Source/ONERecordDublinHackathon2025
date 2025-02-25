import {Component, inject} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AwfControlModule, AwfValidator} from "@awerysoftware/awf-components";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";
import {ApiService} from "../../php-one-lib.service";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
    imports: [
        ReactiveFormsModule,
        AwfControlModule,
        AsyncPipe
    ],
    standalone: true
})
export class SignInComponent {
    private _apiService = inject(ApiService);

    private readonly router = inject(Router);
    public loading$ = new BehaviorSubject<boolean>(false);
    public loginForm = this._fb.group({
        email: '',
        password: ''
    });

    constructor(private _fb: FormBuilder) {
    }

    public handleSignIn() {
        if (this.loginForm.value.email) {
            this._apiService.user$.next(this.loginForm.value.email);
        }
        //For test purposes only
        this.router.navigate(['/awbs']).then();
    }
}
