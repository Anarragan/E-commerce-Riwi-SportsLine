import { Column, CreateDateColumn, UpdateDateColumn, Entity, ObjectIdColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { ObjectId } from "mongodb";

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.CUSTOMER })
  role: UserRoleEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @Column()
  customerId?: ObjectId;

  @Column({ default: [] })
  orderIds: ObjectId[];

}