import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlaguePlotEntity } from './plaguePlot.entity';
import { PlagueSignEntity } from './plagueSign.entity';
import { VarietyProductEntity } from './varietyProduct.entity';

@Entity({ name: 'plague' })
export class PlageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scientificName: string;

  @Column()
  commonNames: string;

  @Column()
  gender: string;

  @Column()
  minTemperature: string;

  @Column()
  maxTemperature: string;

  @Column()
  optTemperature: string;

  @OneToMany(() => PlaguePlotEntity, (plage) => plage.plagueID)
  plaguePlot: PlaguePlotEntity;

  @ManyToMany(
    () => VarietyProductEntity,
    (varietyProductEntity) => varietyProductEntity.plague,
  )
  product: VarietyProductEntity;

  @OneToOne(() => PlagueSignEntity, (plagueSign) => plagueSign.plague)
  plagueSign: PlagueSignEntity;
}
