import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
  //   make: string;

  //   model: string;

  //   year: number;

  //   mileage: number;

  //   longitude: number;

  //   latitude: number;
}
