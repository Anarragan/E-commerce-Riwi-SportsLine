import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolesPermission } from 'src/modules/roles-permissions/entities/roles-permission.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => RolesPermission, (role) => role.permission)
  roles: RolesPermission[];
}
