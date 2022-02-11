import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertMsgService {
    alertInfos$: Subject<any> = new Subject();
    constructor() {}

    getAlert() {
        return this.alertInfos$.asObservable();
    }

    displaySuccessMsg(msg: string) {
        this.alertInfos$.next({type: 'success', msg});
    }
}
