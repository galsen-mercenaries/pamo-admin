import {Component} from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(private authServ: AuthenticationService) {

  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.authServ.logout();
  }
}
