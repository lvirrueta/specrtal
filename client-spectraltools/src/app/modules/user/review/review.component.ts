import { Component } from '@angular/core';
import { PlaguePlotService } from 'src/app/core/services/plaguePlot.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  constructor(private plaguePlotService: PlaguePlotService) {}

  ngOnInit(): void {
    this.plaguePlotService.getPlaguePlotToSign();
  }
}
