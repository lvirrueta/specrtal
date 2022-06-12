import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlageEntity } from './plague.entity';

@Entity({ name: 'plagueSign' })
export class PlagueSignEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => PlageEntity)
  plagueID: PlageEntity;

  @Column({ type: 'geography' })
  sign: any; //raster

  @OneToOne(() => PlageEntity, (plague) => plague.plagueSign)
  @JoinColumn({ name: 'PlagueID' })
  plague: PlageEntity;
}
