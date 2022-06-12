import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AgriculturalProductEntity } from './agricultural-product.entity';

@Entity({ name: 'phenologicalSignAP' })
export class PhenologicalSignEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => AgriculturalProductEntity, (agricultura) => agricultura.id)
  @JoinColumn({ name: 'agriculturalProductID' })
  agriculturalProductID: AgriculturalProductEntity;

  @Column()
  phenologicalStage: string;

  @Column({ type: 'geography' })
  sign: any; //raster
}
