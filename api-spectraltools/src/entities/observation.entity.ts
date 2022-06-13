import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlaguePlotEntity } from './plaguePlot.entity';

@Entity({ name: 'observation' })
export class ObservationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  observation: string;

  @OneToOne(() => PlaguePlotEntity, (plague) => plague.observation)
  @JoinColumn({ name: 'plaguePlotID' })
  plagePlotID: number;
}
