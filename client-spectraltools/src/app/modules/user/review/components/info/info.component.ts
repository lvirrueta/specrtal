import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlaguePlot } from 'src/app/core/models/IPlaguePlot';
import { PlaguePlotService } from 'src/app/core/services/plaguePlot.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  
  public plaguePlot!: Observable<IPlaguePlot>;
  
  constructor(
    private plaguePlotService: PlaguePlotService
  ) {}

  ngOnInit(): void {
    this.plaguePlot = this.plaguePlotService.getPlaguePlot();
  }

}
