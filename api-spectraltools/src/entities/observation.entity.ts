import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'observation' })
export class observationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  observation: string;

  @Column()
  plagePlotID: number;
}
