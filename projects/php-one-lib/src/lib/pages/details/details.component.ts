import {Component, inject, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AwfControlModule} from "@awerysoftware/awf-components";
import {AsyncPipe, DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {environment} from "../../../../../php-one/environments/environment";
import {ApiService} from "../../php-one-lib.service";

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
    providers:[
        ApiService
    ],
    standalone: true
})
export class DetailsComponent implements OnInit {
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
                this.router.navigate(['/admin/releases']).then();
            }
        });

    }

    private getAwbDetails(awb_no: string) {
        this._request.get(
            `${environment.url}getAwb`,
            {
                awb_no: awb_no
            }
        ).subscribe((data: any) => {
            this.loading$.next(false);
            if (data.status ==='success') {
                this.awb$.next(data.awb);
                this.pieces$.next(data.pieces);
                this.events$.next(data.events);
            }
        });
    }
}
