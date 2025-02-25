import {Component, inject, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AwfControlModule} from "@awerysoftware/awf-components";
import {AsyncPipe, DatePipe, DecimalPipe, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ApiService} from "../../php-one-lib.service";
import {URL_CONFIG, UrlConfig} from "../../app-config";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
    imports: [
        AwfControlModule,
        AsyncPipe,
        NgIf,
        DecimalPipe,
        DatePipe,
        RouterLink,
    ],
    providers: [
        ApiService
    ],
    standalone: true
})
export class DetailsComponent implements OnInit {
    public environment: UrlConfig = inject(URL_CONFIG);

    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly _request = inject(ApiService);

    public loading$ = new BehaviorSubject<boolean>(true);
    public awb$ = new BehaviorSubject<any>(null);
    public pieces$ = new BehaviorSubject<any>(null);
    public events$ = new BehaviorSubject<any>(null);

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            if (!!params['awb_no']) {
                this.getAwbDetails(params['awb_no']);
            } else {
                this.router.navigate(['/awbs']).then();
            }
        });

    }

    private getAwbDetails(awb_no: string) {
        this._request.get(
            `${this.environment.apiUrl}getAwb`,
            {
                awb_no: awb_no
            }
        ).subscribe((data: any) => {
            this.loading$.next(false);
            if (data.status === 'success') {
                this.awb$.next(data.awb);
                this.pieces$.next(data.pieces);
                this.events$.next(data.events);
            }
        });
    }
}
