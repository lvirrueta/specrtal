import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPlaguePlot } from '../../core/models/IPlaguePlot';
import { DiscardDTO } from '../models/discardDTO';
import { ICoordinatesSpectral } from '../models/ICoordinatesSpectral';

@Injectable({
  providedIn: 'root',
})
export class PlaguePlotService {
  private url = 'http://localhost:3000';
  private dataPlaguePlot = new Subject<IPlaguePlot>();

  constructor(private http: HttpClient) {}

  public getInfoPlot(){
    return this.http.get(`${this.url}/plague-plot/getInfoPlot`);
  }

  public deleteDiscardController(id: number): Observable<any> {
    return this.http.delete(`${this.url}/discard/delete-discard-point/${id}`);
  }

  public getPlotController(): Observable<any> {
    return this.http.get(`${this.url}/plague-plot/toSign`);
  }

  public getDiscardedListController(): Observable<any> {
    return this.http.get(`${this.url}/discard/discard-list`);
  }

  public updateDiscardedPointController(id: number): Observable<any> {
    return this.http.put(
      `${this.url}/discard/udpdate-discard-point/${id}`,
      null
    );
  }

  public setDiscardController(observation: DiscardDTO): Observable<any> {
    return this.http.post(`${this.url}/discard/discard`, observation);
  }

  public getPlaguePlot(): Observable<IPlaguePlot> {
    return this.dataPlaguePlot.asObservable();
  }

  public setPlaguePlot(data: IPlaguePlot): void {
    this.dataPlaguePlot.next(data);
  }

  public getPlaguePlotToSign(): void {
    this.getPlotController().subscribe({
      next: (response: IPlaguePlot) => this.setPlaguePlot(response),
      error: (error) => error,
    });
  }

  public sendPointstoSpectral(data: ICoordinatesSpectral) {
    return this.http.post(`${this.url}/spectral/spectral`, data);
  }
}
