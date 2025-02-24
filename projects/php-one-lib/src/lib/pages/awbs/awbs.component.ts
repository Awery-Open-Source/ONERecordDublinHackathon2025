import {Component, importProvidersFrom} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {
    AwfControlModule,
    AwfNotificationService,
    AwfRequestService
} from "@awerysoftware/awf-components";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../../../../../php-one/environments/environment";

@Component({
    selector: 'app-awbs',
    templateUrl: './awbs.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AwfControlModule,
        HttpClientModule
    ],
    providers: [
        AwfControlModule,
        AwfRequestService.forRoot({basicURL: environment.url}),
        AwfNotificationService
    ]
})
export class AwbsComponent {
    private _awbs$ = new BehaviorSubject<any[]>([]);

    public t: any = []

    constructor(private request: AwfRequestService) {
        this.getAWBsList();
    }

    public get awbs$(): BehaviorSubject<any[]> {
        return this._awbs$
    }

    public getAWBsList() {
        this.request.makeRequest(
            'get',
            '/api/awbs'
        ).subscribe(data => {
            console.log('getAWBsList', data);
            if (data.error === 0) {
                this._awbs$.next([{no: '123-12345678', weight: 100, volume: 88.231}]);
            }
        });
    }
}
