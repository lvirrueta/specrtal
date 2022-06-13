import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPlaguePlot } from '../../core/models/IPlaguePlot';

@Injectable({
  providedIn: 'root',
})
export class PlaguePlotService {
  private url = 'http://localhost:3000/plague-plot';
  private dataPlaguePlot = new Subject<IPlaguePlot>();

  constructor(private http: HttpClient) {}

  public GetPlotController(): Observable<any> {
    return this.http.get(`${this.url}/toSign`);
  }

  public getPlaguePlot(): Observable<IPlaguePlot> {
    return this.dataPlaguePlot.asObservable();
  }

  public setPlaguePlot(data: IPlaguePlot): void{
    this.dataPlaguePlot.next(data);
  }
}
