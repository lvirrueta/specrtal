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

  processData!: ChartData<'line'>;
  processChartOptions!: ChartOptions;

  obteinData!: ChartData<'doughnut'>;
  obteinChartOptions!: ChartOptions;

  public pieChartColors: Array<any> = [
    {
      backgroundColor: ['#fc5858', '#19d863', '#fdf57d'],
      borderColor: [
        'rgba(252, 235, 89, 0.2)',
        'rgba(77, 152, 202, 0.2)',
        'rgba(241, 107, 119, 0.2)',
      ],
    },
  ];

  ngOnInit(): void {
    this.plaguePlotRequest();
    this.assignDataWithouApi();
  }

  async plaguePlotRequest() {
    this.plaguePlotService.getInfoPlot().subscribe({
      next: (response: any) => {
        this.plaguePlotData = response;
        this.assignData();
      },
      error: (error) => error,
    });
  }

  assignDataWithouApi() {
    this.obteinData = {
      labels: ['A registrar', 'Obtenidas'],
      datasets: [
        {
          data: [60, 40],
          backgroundColor: ['rgba(0, 147, 127, 0.2)','rgba(245, 195, 2, 0.2)'],
          hoverBackgroundColor: ['rgba(0, 147, 127, 0.6)','rgba(245, 195, 2, 0.6)'],
        },
      ],
    };
    this.obteinChartOptions = {
      scales: {
        y: {
          max: 100,
        },
      },
      responsive: true,
      plugins: {
        title: {
          display: true,
        },
        legend: {
          reverse: true,
        },
      },
    };

    this.processData = {
      labels: ['Maíz', 'Aguacate', 'Trigo', 'Frijol'],
      datasets: [
        {
          label: 'Analizados',
          data: [30, 70, 10, 40],
          stack: 'a',
          backgroundColor: ['rgba(0, 147, 127, 0.2)'],
          hoverBackgroundColor: ['rgba(0, 147, 127, 0.6)'],
        },
        {
          label: 'Descartados',
          data: [30, 10, 80, 20],
          stack: 'a',
          backgroundColor: ['rgba(245, 83, 83, 0.2)'],
          hoverBackgroundColor: ['rgba(245, 83, 83, 0.6)'],
        },
      ],
    };
    this.processChartOptions = {
      scales: {
        y: {
          max: 100,
        },
      },
      responsive: true,
      plugins: {
        title: {
          display: true,
        },
        legend: {
          reverse: true,
        },
      },
    };
  }

  assignData() {
    this.signData = {
      labels: ['Progreso'],
      datasets: [ 
        {
          backgroundColor: 'rgba(0, 147, 127, 0.2)',
          hoverBackgroundColor: 'rgba(0, 147, 127, 0.6)',
          label: 'Analizados',
          data: [this.plaguePlotData.analized],
          tension: 0.5,
          stack: 'a',
        },
        {
          backgroundColor: 'rgba(245, 195, 2, 0.2)',
          hoverBackgroundColor: 'rgba(245, 195, 2, 0.6)',
          label: 'Descartados',
          data: [this.plaguePlotData.discarted],
          tension: 0.5,
          stack: 'a',
        },
        {
          backgroundColor: 'rgba(245, 83, 83, 0.2)',
          hoverBackgroundColor: 'rgba(245, 83, 83, 0.6)',
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
        },
        legend: {
          reverse: true,
        },
      },
    };
  }
}
