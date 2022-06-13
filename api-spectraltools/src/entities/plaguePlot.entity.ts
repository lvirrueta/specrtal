import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObservationEntity } from './observation.entity';
import { PlageEntity } from './plague.entity';
import { PlageHostEntity } from './plagueHost.entity';
import { VarietyProductEntity } from './varietyProduct.entity';

@Entity({ name: 'plaguePlot' })
export class PlaguePlotEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plagueLocation: string; //point

  @ManyToOne(() => PlageEntity, (plage) => plage.plaguePlot)
  @JoinColumn({ name: 'plagueID' })
  plagueID: number;

  @ManyToOne(
    () => VarietyProductEntity,
    (varietyProduct) => varietyProduct.plaguePlot,
  )
  @JoinColumn({ name: 'varietyProductID' })
  varietyProductID: number;

  @Column()
  sampleDate: Date;

  @Column()
  phenologicalStage: string;

  @Column()
  damagePercentage: number;

  @Column()
  cropMonthAge: number;

  @Column()
  cropWeekAge: number;

  @OneToOne(() => PlageHostEntity)
  @Column()
  plagueSign: string; //raster

  @Column()
  phenologicalSign: string; //raster

  @OneToOne(() => ObservationEntity, (plague) => plague.plagePlotID)
  observation: string;

  @Column()
  plaguePixel: string;

  @Column()
  controlPixel: string;

  @Column()
  discart: boolean;
}
