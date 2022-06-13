import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlaguePlot } from 'src/app/core/models/IPlaguePlot';
import { PlaguePlotService } from 'src/app/core/services/plaguePlot.service';
import { CropInfoInterface } from '../../../interfaces/cropinfo.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  public plaguePlot!: Observable<IPlaguePlot>;
  cropInformation: CropInfoInterface = {
    typecrop: 'Maíz',
    phenologicStage: 'Floración'
  };

  constructor(
    private plaguePlotService: PlaguePlotService
  ) {}

  ngOnInit(): void {
    this.plaguePlot = this.plaguePlotService.getPlaguePlot();
  }

}
