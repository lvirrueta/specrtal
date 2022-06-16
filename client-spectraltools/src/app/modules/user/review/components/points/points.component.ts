import {
  Component,
  Input,
  OnInit,
  DoCheck,
  KeyValueDiffers,
  KeyValueDiffer,
} from '@angular/core';

// Services
import { ModalsService } from 'src/app/shared/services/modals/modals.service';
import { PlaguePlotService } from 'src/app/core/services/plaguePlot.service';

// Interfaces
import { PointsInterface } from '../../../interfaces/pointsInfo.interface';
import { IPlaguePlot } from 'src/app/core/models/IPlaguePlot';
import { DiscardDTO } from 'src/app/core/models/discardDTO';
import { ICoordinatesSpectral } from '../../../../../core/models/ICoordinatesSpectral';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent implements OnInit, DoCheck {
  @Input() pointInput: PointsInterface = { lat: 0, lng: 0 };
  @Input() polygonInput: PointsInterface = { lat: 0, lng: 0 };
  public plaguePlot!: IPlaguePlot;

  public controlPoints: PointsInterface[] = [];
  public polygonPoints: PointsInterface[] = [];
  data: ICoordinatesSpectral = {
    id: 0,
    controlCoord: [],
    polygonCoord: [],
  };
  private differ: KeyValueDiffer<string, any> | undefined;

  constructor(
    private differs: KeyValueDiffers,
    private modalService: ModalsService,
    private plaguePlotService: PlaguePlotService
  ) {
    this.differ = this.differs.find({}).create();
  }

  ngOnInit(): void {
    this.pointsRequest();
    this.getPlaguePlot();
  }

  ngDoCheck(): void {
    const change = this.differ?.diff(this);
    if (change) {
      change.forEachChangedItem((item) => {
        if (item.key.includes('pointInput')) {
          this.controlPoints.push(this.pointInput);
        } else if (item.key.includes('polygonInput')) {
          this.polygonPoints.push(this.polygonInput);
        }
      });
    }
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
          this.controlPoints.splice(id, 1);
        }
      });
  }

  public async savePoints() {
    this.modalService
      .questionModal(
        'Guardar puntos de control' + '¿Desea continuar?',
        'Aceptar',
        'Cancelar',
        this.modalService.MODALTYPE.info
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.setSave();
        }
      });
  }

  private setSave(): void {
    this.changeData(this.controlPoints, this.polygonPoints);
    this.plaguePlotService.sendPointstoSpectral(this.data).subscribe({
      next: (response) => this.saveSuccess(),
      error: (error) => this.saveError(error),
    });
  }

  public changeData(
    controlPoints: PointsInterface[],
    polygonPoints: PointsInterface[]
  ) {
    this.data.id = this.plaguePlot.id;
    controlPoints.forEach((element) => {
      this.data.controlCoord.push([element.lat, element.lng]);
    });
    polygonPoints.forEach((element) => {
      this.data.polygonCoord.push([element.lat, element.lng]);
    });
  }

  public saveSuccess() {
    this.plaguePlotService.getPlaguePlotToSign();
    this.modalService.singleModal(
      'Guardado con éxito',
      'ok',
      this.modalService.MODALTYPE.success
    );
    this.deleteData();
  }

  private saveError(error: string) {
    this.plaguePlotService.getPlaguePlotToSign();
    this.modalService.singleModal(
      error,
      'ok',
      this.modalService.MODALTYPE.danger
    );
    this.deleteData();
  }

  public deleteData() {
    this.data.id = 0;
    this.data.controlCoord = [];
    this.data.polygonCoord = [];
    this.controlPoints = [];
    this.polygonPoints = [];
  }

  public async discardPoint() {
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
    this.modalService.loading('cargando');
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
}
