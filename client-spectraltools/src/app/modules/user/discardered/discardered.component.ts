import { Component, OnInit } from '@angular/core';
import { PointsInfoInterface } from '../interfaces/pointsInfo.interface';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';
import { PlaguePlotService } from 'src/app/core/services/plaguePlot.service';

@Component({
  selector: 'app-discardered',
  templateUrl: './discardered.component.html',
  styleUrls: ['./discardered.component.scss'],
})
export class DiscarderedComponent implements OnInit {
  points: PointsInfoInterface[] = [];

  constructor(
    private modalsService: ModalsService,
    private plaguePlotService: PlaguePlotService
  ) {}

  ngOnInit(): void {
    this.discardRequest();
  }

  private discardRequest(): void {
    this.modalsService.loading('Cargando');
    // TODO - Add request
    this.plaguePlotService.getDiscardedListController().subscribe({
      next: (response) => {
        this.points = response;
      },
      error: (error) => {},
    });
    this.discardRequestSuccess();
  }

  private discardRequestSuccess(): void {
    this.modalsService.close();
  }

  public async viewDetails(id: number): Promise<void> {
    let observation = '';
    this.points.forEach((point) => {
      point.id === id ? (observation = point.observation) : '';
    });
    await this.modalsService
      .discardOptionModal(
        'Descartar Parcela',
        `Descripción: ${observation}`,
        'Volver a evaluar',
        'Eliminar',
        this.modalsService.MODALTYPE.info
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.evaluePointCluster(id);
        }
        if (result.isDenied) {
          this.deletePointCluster(id);
        }
      });
  }

  private deletePointCluster(id: number): void {
    this.modalsService.loading('cargando');
    this.plaguePlotService.deleteDiscardController(id).subscribe({
      next: () => {
        this.modalsService.close();
        this.deletePointModal('Descartado', 'OK', 'success');
      },
      error: (error) => {
        this.modalsService.close();
        this.deletePointModal(error.message, 'OK', 'danger');
      },
    });
  }

  private evaluePointCluster(id: number): void {
    this.modalsService.loading('cargando');
    this.plaguePlotService.updateDiscardedPointController(id).subscribe({
      next: () => {
        this.modalsService.close();
        this.deletePointModal('Descartado', 'OK', 'success');
      },
      error: (error) => {
        this.modalsService.close();
        this.deletePointModal(error.message, 'OK', 'danger');
      },
    });
  }

  private async deletePointModal(
    text: string,
    label: string,
    modalType: string
  ) {
    await this.modalsService
      .singleModal(
        text,
        label,
        modalType === 'success'
          ? this.modalsService.MODALTYPE.success
          : this.modalsService.MODALTYPE.danger
      )
      .then(() => {
        this.discardRequest();
      });
  }
}
