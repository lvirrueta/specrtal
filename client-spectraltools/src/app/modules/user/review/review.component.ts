<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> main
import { PlaguePlotService } from 'src/app/core/services/plaguePlot.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  constructor(private plaguePlotService: PlaguePlotService) {}

  polygon: boolean = true;

  ngOnInit(): void {
    this.plaguePlotService.getPlaguePlotToSign();
  }
<<<<<<< HEAD
=======

>>>>>>> main
}
