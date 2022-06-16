import { Component, OnInit } from '@angular/core';
import { PlaguePlotService } from 'src/app/core/services/plaguePlot.service';
import { PointsInterface } from '../interfaces/pointsInfo.interface';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  constructor(private plaguePlotService: PlaguePlotService) {}

  point: PointsInterface = {
    lat: 0,
    lng: 0,
  };
  polygon: PointsInterface = {
    lat: 0,
    lng: 0,
  };

  ngOnInit(): void {
    this.plaguePlotService.getPlaguePlotToSign();
  }
}
