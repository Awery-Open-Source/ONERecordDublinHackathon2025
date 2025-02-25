import {environment} from "../../../../environments/environment";
import {Component, inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AwfControlModule, AwfNotificationService} from "@awerysoftware/awf-components";
import {BehaviorSubject} from "rxjs";
import {ApiService} from "../../../../../php-one-lib/src/lib/php-one-lib.service";

interface Subscriber {
    id: null | number;
    type: string;
    email: string;
    token: string;
    base_url: string;
    editableState?: Subscriber
}


@Component({
    selector: 'php-one-settings',
    templateUrl: './subscribers.component.html',
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
export class SubscribersComponent implements OnInit {
    private readonly _request = inject(ApiService);
    private readonly _notification = inject(AwfNotificationService);

    public settings$ = new BehaviorSubject<Subscriber[]>([]);
    public newSubscriber$ = new BehaviorSubject<Subscriber | null>(null);

    public type = [
        {label: 'Customer', value: 'customer'},
        {label: 'Webhook', value: 'webhook'}
    ];

    ngOnInit() {
        this.getSubscribers();
    }

    public getSubscribers() {
        this._request.get(
            `${environment.url}getSubs`,
        ).subscribe((data: any) => {
            this.newSubscriber$.next(null);
            if (data.length > 0) {
                this.settings$.next(data.map((item: Subscriber) => ({
                    ...item,
                    type: item.token.length > 0 ? 'webhook' : 'customer'
                })));
            }
        });
    }

    public createSubscriber() {
        const obj = {id: null, base_url: '', token: '', email: '', type: 'customer'};
        this.newSubscriber$.next({...obj, editableState: obj});
    }

    public editSubscriber(subscriber: Subscriber) {
        subscriber.editableState = {...subscriber};
    }

    public deleteSubscriber(subscriber: Subscriber) {
        //...
    }


    public saveSubscriber(subscriber: Subscriber) {
        this._request.post(
            `${environment.url}updateSub`,
            {...subscriber.editableState}
        ).subscribe(() => {
            this._notification.addNotification('Subscribers created', 'Success', 'success');
            this.getSubscribers();
        });
    }

}
