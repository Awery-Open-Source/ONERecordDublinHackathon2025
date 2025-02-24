import {Component} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AwfControlModule} from "@awerysoftware/awf-components";
import {AsyncPipe} from "@angular/common";

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
	public loading$ = new BehaviorSubject<boolean>(false);
	public loginForm = this._fb.group({
		email: '',
		password: ''
	});

	constructor(private _fb: FormBuilder) {
	}

	public handleSignIn(){}
}
