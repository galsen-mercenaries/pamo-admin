import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DashboardService } from './service/dashboard.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  statsData : any
  value=56
  color="#63c2de"
  constructor(private dashboardService : DashboardService) { }


  ngOnInit(): void {
    this.getStats()
  }

  getStats(){
    this.dashboardService.getStats().subscribe(
      (res) =>{
        console.log(res)
        this.statsData = res;
      },
      (err) =>{
        console.log(err)
      }
    )
  }
}
