import {Component, inject, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AwfControlModule, AwfNotificationService} from "@awerysoftware/awf-components";
import {AsyncPipe, DatePipe, DecimalPipe, NgIf, SlicePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ApiService} from "../../php-one-lib.service";
import {URL_CONFIG, UrlConfig} from "../../app-config";
import {Awb, Piece} from "../../interfaces/awb";
import {FormsModule} from "@angular/forms";

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
        FormsModule,
        SlicePipe,
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
    private readonly _notification = inject(AwfNotificationService);

    public loading$ = new BehaviorSubject<boolean>(true);
    public awb$ = new BehaviorSubject<Awb | null>(null);
    public pieces$ = new BehaviorSubject<Piece[] | null>(null);
    public events$ = new BehaviorSubject<any>(null);
    public newEvent$ = new BehaviorSubject<any>(null);

    public eventsTypes$ = new BehaviorSubject<{ label: string, value: string }[]>([
        {label: 'BKD', value: 'BKD'},
        {label: 'BRF', value: 'BRF'},
        {label: 'PUP', value: 'PUP'},
        {label: 'REW', value: 'REW'},
        {label: 'SDO', value: 'SDO'},
        {label: 'DEW', value: 'DEW'},
        {label: 'REW', value: 'REW'},
        {label: 'FWB', value: 'FWB'},
        {label: 'DEW', value: 'DEW'},
        {label: 'TAC', value: 'TAC'},
        {label: 'DOC', value: 'DOC'},
        {label: 'FOH', value: 'FOH'},
        {label: 'RCS', value: 'RCS'},
        {label: 'RCT', value: 'RCT'},
        {label: 'UWS', value: 'UWS'},
        {label: 'FOW', value: 'FOW'},
        {label: 'ALS', value: 'ALS'},
        {label: 'ALE', value: 'ALE'},
        {label: 'DEP', value: 'DEP'},
        {label: 'ARR', value: 'ARR'},
        {label: 'ALS', value: 'ALS'},
        {label: 'ALE', value: 'ALE'},
        {label: 'FIW', value: 'FIW'},
        {label: 'RCF', value: 'RCF'},
        {label: 'AWR', value: 'AWR'},
        {label: 'NFD', value: 'NFD'},
        {label: 'AWD', value: 'AWD'},
        {label: 'HDP', value: 'HDP'},
        {label: 'CCD', value: 'CCD'},
        {label: 'DLV', value: 'DLV'},
        {label: 'DIW', value: 'DIW'},
        {label: 'RIW', value: 'RIW'},
        {label: 'HDP', value: 'HDP'},
        {label: 'TPN', value: 'TPN'},
        {label: 'SPC', value: 'SPC'},
        {label: 'OFD', value: 'OFD'},
        {label: 'POD', value: 'POD'},
    ])

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
            {awb_no: awb_no}
        ).subscribe((data: any) => {
            this.loading$.next(false);
            if (data.status === 'success') {
                this.awb$.next(data.awb);
                this.pieces$.next(data.pieces);
                this.events$.next(data.events);
            }
        });
    }

    public saveAwbEvent() {
        this.loading$.next(true);
        this._request.post(
            `${this.environment.apiUrl}updateEvent`,
            {
                ...this.newEvent$.value,
                awb_id: this.awb$.value?.id,
                dateCreate: new Date(),
                dateAction: new Date(),
                date: new Date(),
                body: '',
                qty: 0,
            }
        ).subscribe((data: any) => {
            if (data.status === 'success') {
                this.newEvent$.next(null);
                this.getAwbDetails(this.awb$.value?.awb_no!);
            } else {
                this.loading$.next(false);
                this._notification.addNotification(data.message ?? 'Error saving event', 'Error', 'error');
            }
        });
    }

    public createEvent() {
        this.newEvent$.next({
            type: this.eventsTypes$.value[0].value
        });
    }
}
