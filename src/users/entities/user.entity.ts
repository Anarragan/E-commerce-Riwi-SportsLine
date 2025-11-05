import { PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Entity, Unique } from "typeorm";
import { Exclude } from "class-transformer";
import { UserRoleEnum } from "src/enums/user.enum";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Exclude()
  @Column({ select: false, length: 255 })
  password: string;

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.CUSTOMER })
  role: UserRoleEnum;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

}
