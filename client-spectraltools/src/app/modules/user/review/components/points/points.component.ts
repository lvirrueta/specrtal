import { Component, OnInit } from '@angular/core';
import { PointsInfoInterface } from '../../../interfaces/pointsInfo.interface'; 
import { ModalsService } from 'src/app/shared/services/modals/modals.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit{

  points: PointsInfoInterface[] = [];

  constructor(
    private modalService: ModalsService
  ) { }
  
  ngOnInit(): void {
    this.pointsRequest();
    
  }
  
  private pointsRequest(): void {
    this.modalService.loading(
      'Cargando'
    );
    // TODO - Add request
    this.points.push(
      { id: 1, longitude: -101.34542, latitude: 36.123123 },
      { id: 2, longitude: -101.34542, latitude: 36.123123 },
      { id: 3, longitude: -101.34542, latitude: 36.123123 }
    );
    this.pointsRequestSuccess();
  }

  private pointsRequestSuccess( ): void {
    // response.forEach( PLOT => {
    //   this.plots.push({
    //     plotId: PLOT.plot.id,
    //     plotName: PLOT.plot.name,
    //     ranchName: PLOT.ranch.name,
    //     center: PLOT.plot.center,
    //     polygon: PLOT.plot.polygon
    //   });
    // });
    // this.plotControl.setValue(this.plots[0].plotId);
    // this.center = this.plots[0].center;
    // this.onSelect();
    this.modalService.close();
  }

  public async deletePoint( id: number ): Promise<void> {
    await this.modalService.questionModal(
      'Borrará el punto' +
        'Está seguro',
      'Ok',
      'Cancelar',
      this.modalService.MODALTYPE.danger
    ).then((result) => {
      if (result.isConfirmed) {
        this.deletePointCluster(id);
      }
    });
  }

  private deletePointCluster( id: number ): void {
    
  }

  savePoint() {
    console.log('Hola mundo');
  }

  savePoints() {
    console.log('puntos guardados');
  }

  discardPoint() {
    console.log('llamar modal');
  }

}
