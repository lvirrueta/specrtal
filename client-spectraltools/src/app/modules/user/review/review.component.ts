import { Component, OnInit } from '@angular/core';
import { PlaguePlotService } from 'src/app/core/services/plaguePlot.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  constructor(private plaguePlotService: PlaguePlotService) {}

  polygon: boolean = true;
  nombre: string = '';

  ngOnInit(): void {
    this.plaguePlotService.getPlaguePlotToSign();
  }

  cambiarNombre(){
    this.nombre = 'Lucero';
  }
}
