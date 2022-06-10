import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AgriculturalProductEntity } from './agricultural-product.entity';
import { PlageEntity } from './plague.entity';
import { PlaguePlotEntity } from './plaguePlot.entity';

@Entity({ name: 'varietyProduct' })
export class VarietyProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  varietyName: string;

  @OneToOne(() => AgriculturalProductEntity)
  @JoinColumn({ name: 'agriculturalProductID' })
  agriculturalProductID: AgriculturalProductEntity;

  @OneToMany(() => PlaguePlotEntity, (plagePlot) => plagePlot.varietyProductID)
  plaguePlot: PlaguePlotEntity;

  @ManyToMany(() => PlageEntity, (plageEntity) => plageEntity.product)
  @JoinTable({ name: 'plagueHost' })
  plague: PlageEntity;
}
