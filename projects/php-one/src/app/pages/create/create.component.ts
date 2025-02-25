import {environment} from "../../../../environments/environment";
import {Component, inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AwfControlModule, AwfNotificationService} from "@awerysoftware/awf-components";
import {ApiService} from "../../../../../php-one-lib/src/lib/php-one-lib.service";
import {BehaviorSubject, map, tap} from "rxjs";
import {Airport} from "../../../../../php-one-lib/src/lib/interfaces/airport";
import {Awb} from "../../../../../php-one-lib/src/lib/interfaces/awb";
import {Router} from "@angular/router";


@Component({
    selector: 'php-one-crate-awb',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AwfControlModule,
    ],
    providers: [
        ApiService,
        AwfControlModule,
        AwfNotificationService
    ]
})
export class CreateComponent implements OnInit {
    private readonly _router = inject(Router);
    private readonly _request = inject(ApiService);
    private readonly _notification = inject(AwfNotificationService);

    public airports$ = new BehaviorSubject<Airport[]>([]);

    public awb: Awb = {
        awb_no: '',
        weight: null,
        origin: '',
        destination: '',
        commodity_code: null,
        product_type_code: null,
        pieces: []
    };

    ngOnInit() {
        // this.getAirports();
    }

    public onChangeAirport(type: 'origin' | 'destination') {
        this.awb[type] = this.awb[type]?.toUpperCase();
    }

    public getAirports() {
        const response$ = this._request.get(
            `${environment.url}airports`,
        ).pipe(
            map(data => !!data
                ? (data as Airport[])
                    .filter((airport: Airport) => !!airport.iata)
                    .map((airport: Airport) => ({
                            ...airport,
                            value: airport.iata,
                            label: airport.iata + ' - ' + airport.airport_name + ' (' + airport.city + ', ' + airport.country_name + ')'
                        })
                    )
                : []),
            tap(airports => this.airports$.next(airports)),
        );
        response$.subscribe();

        return response$;
    }

    public async submit() {
        this._request.post(
            `${environment.url}updateAwb`,
            this.awb
        ).subscribe(async () => {
            this._notification.addNotification('Awb created', 'Success', 'success');
            await this._router.navigate(['/awbs']);
        });
    }

    public addPiece() {
        this.awb.pieces.push({
            length: null,
            width: null,
            height: null,
            weight: null,
        });
    }

    public removePiece(index: number) {
        this.awb.pieces.splice(index, 1);
    }

}
