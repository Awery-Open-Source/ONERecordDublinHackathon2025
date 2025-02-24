import {Component, inject} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {AsyncPipe} from "@angular/common";
import {AwfControlModule, AwfIconModule} from "@awerysoftware/awf-components";
import {BehaviorSubject, filter, map, startWith, tap} from "rxjs";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, AwfIconModule, AsyncPipe, AwfControlModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    private readonly _router = inject(Router);

    title = 'php-one';
    public location$ = new BehaviorSubject<string>('');

    public showLoginPage$ = this._router.events.pipe(
        startWith(this._router.url),
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map((e) => (typeof e === 'string' ? [e] : [e.url, e.urlAfterRedirects]).includes('/sign-in')),
    );

}
