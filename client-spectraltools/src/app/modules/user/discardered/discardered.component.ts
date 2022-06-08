import { Component, OnInit } from '@angular/core';
import { PointsInfoInterface } from '../interfaces/pointsInfo.interface';
import { ModalsService } from 'src/app/shared/services/modals/modals.service'; 

@Component({
  selector: 'app-discardered',
  templateUrl: './discardered.component.html',
  styleUrls: ['./discardered.component.scss']
})
export class DiscarderedComponent implements OnInit{

  points: PointsInfoInterface[] = [];

  constructor(
    private modalsService: ModalsService
  ) { }

  ngOnInit(): void {
    this.discardRequest();
    
  }

  private discardRequest(): void {
    this.modalsService.loading(
      'Cargando'
    );
    // TODO - Add request
    this.points.push(
      { id: 1, longitude: -101.34542, latitude: 36.123123 },
      { id: 2, longitude: -101.34542, latitude: 36.123123 },
      { id: 3, longitude: -101.34542, latitude: 36.123123 }
    );
    this.discardRequestSuccess();
  }

  private discardRequestSuccess( ): void {
    this.modalsService.close();
  }

  public async viewDetails(id: number): Promise<void> {
    await this.modalsService.questionModal(
      'Información del punto descartado',
      'Descartar',
      'Aceptar',
      this.modalsService.MODALTYPE.main
    ).then((result) => {
      if (result.isConfirmed) {
        this.deletePointCluster(id);
      }
    });
  }

  private deletePointCluster( id: number ): void {
    
  }

}
