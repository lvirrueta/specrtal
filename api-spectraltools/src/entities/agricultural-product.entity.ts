import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PhenologicalSignEntity } from './phenologicalSign.entity';
import { VarietyProductEntity } from './varietyProduct.entity';

@Entity({ name: 'agriculturalProduct' })
export class AgriculturalProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => PhenologicalSignEntity,
    (agriculturaProduct) => agriculturaProduct.agriculturalProductID,
  )
  agriculturaProductID: PhenologicalSignEntity;

  @OneToOne(
    () => VarietyProductEntity,
    (varietyProductEntity) => varietyProductEntity.agriculturalProductID,
  )
  varietyProductID: VarietyProductEntity;

  @Column()
  scientificName: string;

  @Column()
  commonNames: string;
}
