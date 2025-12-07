import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('roles_permissions')
export class RolesPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.roles)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;
}
