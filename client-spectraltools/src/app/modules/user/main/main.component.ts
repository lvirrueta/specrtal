import { Component, OnInit } from '@angular/core';
import { PlaguePlotService } from 'src/app/core/services/plaguePlot.service';
import { ChartData, ChartOptions } from 'chart.js';
import { IplaguePlotData } from '../interfaces/plaguePlotData.interface';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private plaguePlotService: PlaguePlotService) {}

  private plaguePlotData!: IplaguePlotData;
  signData!: ChartData<'line'>;
  signChartOptions!: ChartOptions;

  ngOnInit(): void {
    this.plaguePlotRequest();
  }

  async plaguePlotRequest() {
    this.plaguePlotService.getInfoPlot().subscribe({
      next: (response: any) => {
        this.plaguePlotData = response;
      },
      error: (error) => error,
      complete: () => {
        this.assignData();
      },
    });
  }

  assignData() {
    this.signData = {
      labels: ['Progreso'],
      datasets: [
        {
          label: 'Analizados',
          data: [this.plaguePlotData.analized],
          tension: 0.5,
          stack: 'a',
        },
        {
          label: 'Descartados',
          data: [this.plaguePlotData.discarted],
          tension: 0.5,
          stack: 'a',
        },
        {
          label: 'A analizar',
          data: [this.plaguePlotData.toAnalize],
          tension: 0.5,
          stack: 'a',
        },
      ],
    };
    this.signChartOptions = {
      responsive: true,
      indexAxis: 'y',
      scales: {
        y: {},
        x: {
          max:
            this.plaguePlotData.analized +
            this.plaguePlotData.toAnalize +
            this.plaguePlotData.discarted,
        },
      },
      plugins: {
        title: {
          display: true,
          // text: 'Monthly Sales Data',
        },
        legend: {
          reverse: true,
        },
      },
    };
  }
}
