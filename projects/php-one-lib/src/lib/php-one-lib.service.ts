import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class ApiService {
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
