import {Component, OnInit} from '@angular/core';
import {AlertMsgService} from '../../alert-msg/alert-msg.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
    alerts: {type: string; msg: string}[] = [];
    constructor(private alertService: AlertMsgService) {}

    ngOnInit(): void {
        this.alertService.getAlert().subscribe(res => {
            this.pushMessage(res);
        });
    }

    pushMessage(alert: {type: string; msg: string}) {
        this.alerts.push(alert);
    }

    ngOnDestroy() {
        this.alerts = [];
    }
}
