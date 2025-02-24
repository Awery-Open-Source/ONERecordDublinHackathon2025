import {environment} from "../../../../environments/environment";
import {Component, inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AwfControlModule, AwfNotificationService} from "@awerysoftware/awf-components";
import {ApiService} from "../../../../../php-one-lib/src/lib/php-one-lib.service";
import {BehaviorSubject} from "rxjs";


@Component({
    selector: 'php-another-one-awbs',
    templateUrl: './awbs.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AwfControlModule,
    ],
    providers: [
        AwfControlModule,
        AwfNotificationService
    ]
})
export class AwbsComponent implements OnInit {
    private readonly _request = inject(ApiService);

    public awbs$ = new BehaviorSubject<any[]>([]);


    ngOnInit() {
        this.getAWBsList();
    }

    public getAWBsList() {
        this._request.get(
            `${environment.url}getAwbs`,
        ).subscribe(data => {
            console.log('getAWBsList', data);
            // if (data.error === 0) {
            this.awbs$.next([{no: '123-12345678', weight: 100, volume: 88.231}]);
            // }
        });
    }

}
