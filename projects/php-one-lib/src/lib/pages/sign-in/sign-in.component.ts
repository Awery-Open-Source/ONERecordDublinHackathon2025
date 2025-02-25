import {Component, inject} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AwfControlModule, AwfValidator} from "@awerysoftware/awf-components";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";

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
    private readonly router = inject(Router);
    public loading$ = new BehaviorSubject<boolean>(false);
    public loginForm = this._fb.group({
        email: '',
        password: ''
    });

    constructor(private _fb: FormBuilder) {
    }

    public handleSignIn() {
        //For test purposes only
        this.router.navigate(['/awbs']).then();
    }
}
