import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './components/alert/alert.component';
import {AlertModule} from 'ngx-bootstrap/alert';
import {DisplayMapComponent} from './components/display-map/display-map.component';

@NgModule({
    declarations: [AlertComponent, DisplayMapComponent],
    imports: [CommonModule, AlertModule],
    exports: [AlertComponent, DisplayMapComponent]
})
export class SharedModule {}
