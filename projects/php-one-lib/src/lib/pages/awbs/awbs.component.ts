import {Component, inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AwfControlModule, AwfNotificationService} from "@awerysoftware/awf-components";
import {BehaviorSubject} from "rxjs";
import {ApiService} from "../../php-one-lib.service";
import {Awb} from "../../interfaces/awb";
import {URL_CONFIG, UrlConfig} from "../../app-config";

@Component({
    selector: 'php-one-awbs',
    templateUrl: './awbs.component.html',
    styleUrls: ['./awbs.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AwfControlModule,
        RouterLink,
    ],
    providers: [
        ApiService,
        AwfControlModule,
        AwfNotificationService,
    ]
})
export class AwbsComponent implements OnInit {
    public environment: UrlConfig = inject(URL_CONFIG);

    private readonly _request = inject(ApiService);

    public awbs$ = new BehaviorSubject<Awb[]>([]);
    public loading$ = new BehaviorSubject<boolean>(true);

    ngOnInit() {
        this.getAWBsList();
    }

    public getAWBsList() {
        this._request.get(
            `${this.environment.apiUrl}getAwbs`,
        ).subscribe((data: any) => {
            this.loading$.next(false);
            if (data.length > 0) {
                this.awbs$.next(data);
            }
        });
    }

}
