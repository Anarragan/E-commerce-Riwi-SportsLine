import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { PedidoItem } from './pedido-item.entity';

export enum EstadoPedido {
  PENDIENTE = 'pendiente',
  CONFIRMADO = 'confirmado',
  EN_PROCESO = 'en_proceso',
  ENVIADO = 'enviado',
  ENTREGADO = 'entregado',
  CANCELADO = 'cancelado',
}

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  numeroPedido: string;

  @Column({
    type: 'enum',
    enum: EstadoPedido,
    default: EstadoPedido.PENDIENTE,
  })
  estado: EstadoPedido;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  impuestos: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  direccionEnvio: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ciudadEnvio: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  codigoPostalEnvio: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  metodoPago: string;

  @Column({ type: 'text', nullable: true })
  notas: string;

  @ManyToOne(() => Cliente, cliente => cliente.pedidos)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ type: 'uuid' })
  cliente_id: string;

  @OneToMany(() => PedidoItem, pedidoItem => pedidoItem.pedido, {
    cascade: true,
  })
  items: PedidoItem[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
