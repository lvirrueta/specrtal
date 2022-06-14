import { ApiProperty } from '@nestjs/swagger';

export class CObservation {
  @ApiProperty()
  id: number;
  @ApiProperty()
  observation: string;
  @ApiProperty()
  plagePlotID: string;
}

// export class CPlagePlotID {
//   id: number;
//   plagueLocation: PlagueLocation;
//   sampleDate: Date;
//   phenologicalStage: string;
//   damagePercentage: number;
//   cropMonthAge: number;
//   cropWeekAge: number;
//   plagueSign: null;
//   phenologicalSign: null;
//   plaguePixel: string;
//   controlPixel: string;
//   discart: boolean;
// }

// export class PlagueLocation {
//   x: number;
//   y: number;
// }
