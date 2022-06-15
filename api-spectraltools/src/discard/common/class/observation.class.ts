import { ApiProperty } from '@nestjs/swagger';
export class CPlagePlotObs {
  @ApiProperty()
  id: number;
  @ApiProperty()
  plagueLocation: string;
  @ApiProperty()
  sampleDate: Date;
  @ApiProperty()
  phenologicalStage: string;
  @ApiProperty()
  damagePercentage: number;
  @ApiProperty()
  cropMonthAge: number;
  @ApiProperty()
  cropWeekAge: number;
  @ApiProperty({ type: [Number] })
  plagueSign: number[];
  @ApiProperty({ type: [Number] })
  phenologicalSign: number[];
  @ApiProperty()
  plaguePixel: string;
  @ApiProperty()
  controlPixel: string;
  @ApiProperty()
  discart: boolean;
}
export class CObservation {
  @ApiProperty()
  id: number;
  @ApiProperty()
  observation: string;
  @ApiProperty()
  plagePlotID: CPlagePlotObs;
}
// export class CPlagePlotID {
//   @ApiProperty()
//   id: number;
//   @ApiProperty()
//   plagueLocation: string;
//   @ApiProperty()
//   sampleDate: Date;
//   @ApiProperty()
//   phenologicalStage: string;
//   @ApiProperty()
//   damagePercentage: number;
//   @ApiProperty()
//   cropMonthAge: number;
//   @ApiProperty()
//   cropWeekAge: number;
//   @ApiProperty({ type: [Number] })
//   plagueSign: number[];
//   @ApiProperty({ type: [Number] })
//   phenologicalSign: number[];
//   @ApiProperty()
//   plaguePixel: string;
//   @ApiProperty()
//   controlPixel: string;
//   @ApiProperty()
//   discart: boolean;
//   @ApiProperty()
//   varietyProductID: string;
// }