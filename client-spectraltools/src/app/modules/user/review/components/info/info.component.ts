import { Component } from '@angular/core';
import { CropInfoInterface } from '../../../interfaces/cropinfo.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  cropInformation: CropInfoInterface = {
    typecrop: 'Maíz',
    phenologicStage: 'Floración'
  };

  constructor() { }

}
