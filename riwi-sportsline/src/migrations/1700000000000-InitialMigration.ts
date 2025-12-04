import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class InitialMigration1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Habilitar extensión UUID si no existe
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Tabla usuarios
    await queryRunner.createTable(
      new Table({
        name: 'usuarios',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'nombre',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'apellido',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'telefono',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'activo',
            type: 'boolean',
            default: true,
          },
          {
            name: 'rol',
            type: 'varchar',
            length: '50',
            default: "'cliente'",
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Tabla productos
    await queryRunner.createTable(
      new Table({
        name: 'productos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nombre',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'descripcion',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'precio',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'stock',
            type: 'int',
            default: 0,
          },
          {
            name: 'categoria',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'imagen',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'activo',
            type: 'boolean',
            default: true,
          },
          {
            name: 'marca',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'sku',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Tabla clientes
    await queryRunner.createTable(
      new Table({
        name: 'clientes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nombre',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'apellido',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isUnique: true,
          },
          {
            name: 'telefono',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'direccion',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'ciudad',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'codigoPostal',
            type: 'varchar',
            length: '10',
            isNullable: true,
          },
          {
            name: 'pais',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'fechaNacimiento',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'activo',
            type: 'boolean',
            default: true,
          },
          {
            name: 'usuario_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Foreign key cliente -> usuario
    await queryRunner.createForeignKey(
      'clientes',
      new TableForeignKey({
        columnNames: ['usuario_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuarios',
        onDelete: 'SET NULL',
      }),
    );

    // Tabla pedidos
    await queryRunner.createTable(
      new Table({
        name: 'pedidos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'numeroPedido',
            type: 'varchar',
            length: '50',
            isUnique: true,
          },
          {
            name: 'estado',
            type: 'enum',
            enum: ['pendiente', 'confirmado', 'en_proceso', 'enviado', 'entregado', 'cancelado'],
            default: "'pendiente'",
          },
          {
            name: 'subtotal',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'impuestos',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: 'total',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'direccionEnvio',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'ciudadEnvio',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'codigoPostalEnvio',
            type: 'varchar',
            length: '10',
            isNullable: true,
          },
          {
            name: 'metodoPago',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'notas',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'cliente_id',
            type: 'uuid',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Foreign key pedido -> cliente
    await queryRunner.createForeignKey(
      'pedidos',
      new TableForeignKey({
        columnNames: ['cliente_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clientes',
        onDelete: 'CASCADE',
      }),
    );

    // Tabla pedido_items
    await queryRunner.createTable(
      new Table({
        name: 'pedido_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'cantidad',
            type: 'int',
          },
          {
            name: 'precioUnitario',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'subtotal',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'pedido_id',
            type: 'uuid',
          },
          {
            name: 'producto_id',
            type: 'uuid',
          },
        ],
      }),
      true,
    );

    // Foreign keys pedido_items
    await queryRunner.createForeignKey(
      'pedido_items',
      new TableForeignKey({
        columnNames: ['pedido_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pedidos',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'pedido_items',
      new TableForeignKey({
        columnNames: ['producto_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'productos',
        onDelete: 'RESTRICT',
      }),
    );

    // Tabla api_keys
    await queryRunner.createTable(
      new Table({
        name: 'api_keys',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'key',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'scopes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'activo',
            type: 'boolean',
            default: true,
          },
          {
            name: 'expiresAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Índices
    await queryRunner.createIndex('productos', new TableIndex({ columnNames: ['categoria'] }));
    await queryRunner.createIndex('pedidos', new TableIndex({ columnNames: ['estado'] }));
    await queryRunner.createIndex('pedidos', new TableIndex({ columnNames: ['cliente_id'] }));
    await queryRunner.createIndex('api_keys', new TableIndex({ columnNames: ['key'] }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('api_keys', true);
    await queryRunner.dropTable('pedido_items', true);
    await queryRunner.dropTable('pedidos', true);
    await queryRunner.dropTable('clientes', true);
    await queryRunner.dropTable('productos', true);
    await queryRunner.dropTable('usuarios', true);
  }
}
