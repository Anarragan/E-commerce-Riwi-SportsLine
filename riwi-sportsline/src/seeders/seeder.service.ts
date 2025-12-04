import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Producto } from '../producto/entities/producto.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async seed(): Promise<void> {
    console.log('🌱 Iniciando seeders...');

    // Seed Usuarios
    await this.seedUsuarios();

    // Seed Productos
    await this.seedProductos();

    // Seed Clientes
    await this.seedClientes();

    console.log('✅ Seeders completados');
  }

  private async seedUsuarios(): Promise<void> {
    const usuarios = [
      {
        email: 'admin@riwi.com',
        password: await bcrypt.hash('admin123', 10),
        nombre: 'Admin',
        apellido: 'Sistema',
        rol: 'admin',
        activo: true,
      },
      {
        email: 'cliente@riwi.com',
        password: await bcrypt.hash('cliente123', 10),
        nombre: 'Cliente',
        apellido: 'Demo',
        rol: 'cliente',
        activo: true,
      },
    ];

    for (const usuarioData of usuarios) {
      const existe = await this.usuarioRepository.findOne({
        where: { email: usuarioData.email },
      });
      if (!existe) {
        const usuario = this.usuarioRepository.create(usuarioData);
        await this.usuarioRepository.save(usuario);
        console.log(`✅ Usuario creado: ${usuarioData.email}`);
      }
    }
  }

  private async seedProductos(): Promise<void> {
    const productos = [
      {
        nombre: 'Balón de Fútbol Adidas',
        descripcion: 'Balón oficial de fútbol Adidas, tamaño 5',
        precio: 89.99,
        stock: 50,
        categoria: 'Fútbol',
        marca: 'Adidas',
        sku: 'BAL-AD-001',
        activo: true,
      },
      {
        nombre: 'Raqueta de Tenis Wilson',
        descripcion: 'Raqueta profesional de tenis Wilson Pro Staff',
        precio: 199.99,
        stock: 30,
        categoria: 'Tenis',
        marca: 'Wilson',
        sku: 'RAQ-WI-001',
        activo: true,
      },
      {
        nombre: 'Zapatillas Running Nike',
        descripcion: 'Zapatillas de running Nike Air Max',
        precio: 129.99,
        stock: 75,
        categoria: 'Running',
        marca: 'Nike',
        sku: 'ZAP-NI-001',
        activo: true,
      },
      {
        nombre: 'Bicicleta de Montaña Trek',
        descripcion: 'Bicicleta de montaña Trek X-Caliber 8',
        precio: 899.99,
        stock: 10,
        categoria: 'Ciclismo',
        marca: 'Trek',
        sku: 'BIC-TR-001',
        activo: true,
      },
      {
        nombre: 'Pelota de Baloncesto Spalding',
        descripcion: 'Pelota oficial de baloncesto Spalding',
        precio: 45.99,
        stock: 40,
        categoria: 'Baloncesto',
        marca: 'Spalding',
        sku: 'PEL-SP-001',
        activo: true,
      },
    ];

    for (const productoData of productos) {
      const existe = await this.productoRepository.findOne({
        where: { sku: productoData.sku },
      });
      if (!existe) {
        const producto = this.productoRepository.create(productoData);
        await this.productoRepository.save(producto);
        console.log(`✅ Producto creado: ${productoData.nombre}`);
      }
    }
  }

  private async seedClientes(): Promise<void> {
    const adminUsuario = await this.usuarioRepository.findOne({
      where: { email: 'admin@riwi.com' },
    });
    const clienteUsuario = await this.usuarioRepository.findOne({
      where: { email: 'cliente@riwi.com' },
    });

    const clientes = [
      {
        nombre: 'Admin',
        apellido: 'Sistema',
        email: 'admin@riwi.com',
        telefono: '+57 300 123 4567',
        direccion: 'Calle 123 #45-67',
        ciudad: 'Medellín',
        codigoPostal: '050001',
        pais: 'Colombia',
        activo: true,
        usuario_id: adminUsuario?.id,
      },
      {
        nombre: 'Cliente',
        apellido: 'Demo',
        email: 'cliente@riwi.com',
        telefono: '+57 300 987 6543',
        direccion: 'Avenida Principal #12-34',
        ciudad: 'Bogotá',
        codigoPostal: '110111',
        pais: 'Colombia',
        activo: true,
        usuario_id: clienteUsuario?.id,
      },
    ];

    for (const clienteData of clientes) {
      const existe = await this.clienteRepository.findOne({
        where: { email: clienteData.email },
      });
      if (!existe) {
        const cliente = this.clienteRepository.create(clienteData);
        await this.clienteRepository.save(cliente);
        console.log(`✅ Cliente creado: ${clienteData.email}`);
      }
    }
  }
}
