import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'spatial_ref_sys' })
export class SpatialRefEntity {
  @PrimaryGeneratedColumn()
  srid: number;

  @Column()
  auth_name: string;

  @Column()
  auth_srid: number;

  @Column()
  srtext: string;

  @Column()
  proj4text: string;
}
