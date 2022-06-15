import { Component, OnInit } from '@angular/core';
import { PointsInterface } from '../../../interfaces/pointsInfo.interface';
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
  
  public plaguePlot!: IPlaguePlot;

  controlPoints: PointsInterface[] = [];
  polygonPoints: PointsInterface[] = [];
  controlPointsLS: string | null | undefined;
  controlPolygonLS: string | null | undefined;

  constructor(
    private modalService: ModalsService,
    private plaguePlotService: PlaguePlotService
  ) { }

  ngOnInit(): void {
    this.pointsRequest();
    this.getPlaguePlot();
  }

  saveStorage() {
    localStorage.setItem('controlPoints', JSON.stringify(this.controlPoints));
    localStorage.setItem('polygonPoints', JSON.stringify(this.polygonPoints));
  }

  chargeStorage() {
    this.controlPointsLS = localStorage.getItem('controlPoints');
    this.controlPoints = this.controlPointsLS ? JSON.parse(this.controlPointsLS) : null;
    this.controlPolygonLS = localStorage.getItem('polygonPoints');
    this.polygonPoints = this.controlPolygonLS ? JSON.parse(this.controlPolygonLS) : null;
  }

  clearStorage() {
    localStorage.removeItem('controlPoints');
    localStorage.removeItem('polygonPoints');
  }

  public buttonAux() {
    this.controlPointsLS = localStorage.getItem('controlPoints');
    this.controlPoints = this.controlPointsLS ? JSON.parse(this.controlPointsLS) : null;
    this.controlPolygonLS = localStorage.getItem('polygonPoints');
    this.polygonPoints = this.controlPolygonLS ? JSON.parse(this.controlPolygonLS) : null;
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
    this.pointsRequestSuccess();
  }

  private pointsRequestSuccess(): void {
    this.modalService.close();
  }

  public async deletePoint(id: number): Promise<void> {
    await this.modalService
      .questionModal(
        'Borrará el punto' + '¿Está seguro?',
        'Aceptar',
        'Cancelar',
        this.modalService.MODALTYPE.danger
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.controlPoints.splice(id,1);
          this.saveStorage();
          this.chargeStorage();
        }
      });
  }

  public async savePoints() {
    this.saveSuccess();
    this.modalService.singleModal(
      'Guardado con éxito',
      'Aceptar',
      this.modalService.MODALTYPE.success
    );
    this.saveStorage();
    this.chargeStorage();
  }

  public saveSuccess() {
    this.plaguePlotService.getPlaguePlotToSign();
    this.controlPoints = [];
    this.polygonPoints = [];
  }

  async discardPoint() {
    await this.modalService
      .modalWithInput(
        'Descarte de poligono',
        'Escriba el motivo de descarte del poligono',
        'textarea'
      )
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

  private discartedError(error: string) {
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
