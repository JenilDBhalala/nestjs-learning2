import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`inserted data with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`updated record with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`removed record with id ${this.id}`);
  }
}
