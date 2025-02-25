import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public user$ = new BehaviorSubject<null | string>(localStorage.getItem('user') ?? null);


    constructor(private http: HttpClient) {
    }

    public get(url: string, params?: { [key: string]: string }) {
        const headers = new HttpHeaders({
                'Content-Type': 'application/json;charset=utf-8'
            }
        );
        return this.http.get(url, {headers: headers, params: params, withCredentials: true});
    }

    public post(url: string, data: any = {}) {
        const headers = new HttpHeaders({
                'Content-Type': 'application/json;charset=utf-8'
            }
        );
        return this.http.post(url, data, {headers: headers, withCredentials: true});
    }
}
