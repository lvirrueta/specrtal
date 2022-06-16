import { ApiProperty } from '@nestjs/swagger';
import { CPlague } from './plague.class';
import { CPlagueLocation } from './plagueLocation.class';
import { CVarietyProduct } from './varietyProduct.class';

export class CPlagePlotID {
  @ApiProperty()
  id: number;
  @ApiProperty()
  plagueLocation: CPlagueLocation;
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
  @ApiProperty()
  varietyProductID: CVarietyProduct;
  @ApiProperty()
  plagueID: CPlague;
}
