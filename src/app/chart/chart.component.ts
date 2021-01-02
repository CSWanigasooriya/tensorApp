import { Component, Input, OnChanges } from '@angular/core';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {

  @Input() data: any;

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    backgroundColor: '#ef6c00',
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          fontSize: 15
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
          display: false
        }
      }]
    }

  };

  barChartLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  barChartType = 'bar';
  barChartLegend = false;
  barChartColors: Color[] = [
    { backgroundColor: 'rgba(63, 191, 63, 0.30)', borderColor: 'rgba(63, 191, 63, 1)', borderWidth: 1.5 }
  ]
  barChartData: any;

  //  barChartData = [
  //   { data: this.data || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Predictions' },
  // ];

  ngOnChanges() {
    this.barChartData = [
      {
        data: this.data || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Predictions',
        backgroundColor: '#ef6c00',
      }];
  }

}
