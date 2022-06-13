import { Component } from '@angular/core';
import { IPlaguePlot } from 'src/app/core/models/IPlaguePlot';
import { PlaguePlotService } from 'src/app/core/services/plaguePlot.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  constructor(private plaguePlotService: PlaguePlotService) {}

  ngOnInit(): void {
    this.getPlaguePlotToSign();
  }

  private getPlaguePlotToSign(){
    this.plaguePlotService.GetPlotController().subscribe({
      next: response => this.setPlaguePlot(response),
      error: error => error
    });
  }

  private setPlaguePlot(data: IPlaguePlot):void{
    this.plaguePlotService.setPlaguePlot(data);
  }

}
