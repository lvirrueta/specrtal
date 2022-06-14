import { Component, OnInit } from '@angular/core';
import { PointsInfoInterface } from '../../../interfaces/pointsInfo.interface';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';
import { IPlaguePlot } from 'src/app/core/models/IPlaguePlot';
import { PlaguePlotService } from 'src/app/core/services/plaguePlot.service';
import { DiscardDTO } from 'src/app/core/models/discardDTO';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent implements OnInit {
  
  points: PointsInfoInterface[] = [];
  public plaguePlot!: IPlaguePlot;

  constructor(
    private modalService: ModalsService,
    private plaguePlotService: PlaguePlotService
  ) {}

  ngOnInit(): void {
    this.pointsRequest();
    this.getPlaguePlot();
  }

  private getPlaguePlot(): void {
    this.plaguePlotService.getPlaguePlot().subscribe({
      next: (response) => {
        this.plaguePlot = response;
        
      },
      error: (error) => error,
    });
  }

  private pointsRequest(): void {
    this.modalService.loading('Cargando');
    // TODO - Add request
    // this.points.push(
    //   { id: 1, longitude: -101.34542, latitude: 36.123123 },
    //   { id: 2, longitude: -101.34542, latitude: 36.123123 },
    //   { id: 3, longitude: -101.34542, latitude: 36.123123 }
    // );
    this.pointsRequestSuccess();
  }

  private pointsRequestSuccess(): void {
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

  public async deletePoint(id: number): Promise<void> {
    await this.modalService
      .questionModal(
        'Borrará el punto' + 'Está seguro',
        'Ok',
        'Cancelar',
        this.modalService.MODALTYPE.danger
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.deletePointCluster(id);
        }
      });
  }

  private deletePointCluster(id: number): void {}

  savePoint() {
    console.log('Hola mundo');
  }

  savePoints() {
    console.log('puntos guardados');
  }

  async discardPoint() {
    await this.modalService
      .modalWithInput('Descarte de punto', 'descartando puntos', 'textarea')
      .then((result) => {
        if (result.isConfirmed) {
          this.setDiscarded(result.value);
        }
      });
  }

  private setDiscarded(result: string): void {
    const observation: DiscardDTO = {
      id: this.plaguePlot.id,
      observation: result,
    };
    this.discardLoading();
    this.plaguePlotService.setDiscardController(observation).subscribe({
      next: (response) => this.discartedSucess(),
      error: (error) => this.discartedError(error),
    });
  }

  private discartedSucess() {
    this.plaguePlotService.getPlaguePlotToSign();
    this.modalService.singleModal(
      'se descarto',
      'ok',
      this.modalService.MODALTYPE.success
    );
  }

  private discartedError(error:string) {
    this.plaguePlotService.getPlaguePlotToSign();
    this.modalService.singleModal(
      error,
      'ok',
      this.modalService.MODALTYPE.danger
    );
  }

  private discardLoading() {
    this.modalService.loading('cargando');
  }

}
