import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlageEntity } from './plague.entity';
import { VarietyProductEntity } from './varietyProduct.entity';

@Entity({ name: 'plagueHost' })
export class PlageHostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PlageEntity)
  @JoinColumn({ name: 'plagueID' })
  plague: PlageEntity;

  @ManyToOne(() => VarietyProductEntity)
  @JoinColumn({ name: 'varietyProductID' })
  varietyProduct: VarietyProductEntity;
}
