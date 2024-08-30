import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @ApiProperty({
    description: 'Name of the property',
    example: 'Luxury Apartment',
  })
  name: string;

  @ApiProperty({
    description: 'Address of the property',
    example: '123 Main St, City, Country',
  })
  address: string;

  @ApiProperty({
    description: 'Type of the property',
    example: 'apartment',
  })
  type: string;

  @ApiProperty({
    description: 'Number of units in the property',
    example: 10,
  })
  numberOfUnits: number;

  @ApiProperty({
    description: 'Rental cost per unit',
    example: 1200,
  })
  rentalCost: number;
}

export class UpdatePropertyDto {
  @ApiProperty({
    description: 'Name of the property',
    example: 'Updated Luxury Apartment',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Address of the property',
    example: '456 Main St, City, Country',
    required: false,
  })
  address?: string;

  @ApiProperty({
    description: 'Type of the property',
    example: 'house',
    required: false,
  })
  type?: string;

  @ApiProperty({
    description: 'Number of units in the property',
    example: 15,
    required: false,
  })
  numberOfUnits?: number;

  @ApiProperty({
    description: 'Rental cost per unit',
    example: 1300,
    required: false,
  })
  rentalCost?: number;
}
