import { IsEmail, IsEnum, IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: "Juan Perez",
        description: "Nombre completo del usuario"
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: "juan@example.com",
        description: "Correo electronico unico"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "password123",
        description: "Contraseña en texto plano"
    })
    @MinLength(6)
    password: string;

    @ApiProperty({
        example: 1,
        description: "ID del rol asociado"
    })
    @IsNumber()
    roleId: number;

}
