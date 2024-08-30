import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Amount of the payment',
    example: 500,
  })
  amount: number;

  @ApiProperty({
    description: 'Payment date',
    example: '2024-08-28T12:00:00Z',
  })
  paymentDate: string;

  @ApiProperty({
    description: 'Tenant ID associated with the payment',
    example: 1,
  })
  tenantId: number;

  @ApiProperty({
    description: 'Property ID associated with the payment',
    example: 1,
  })
  propertyId: number;
}

export class UpdatePaymentDto {
  @ApiProperty({
    description: 'Amount of the payment',
    example: 600,
    required: false,
  })
  amount?: number;

  @ApiProperty({
    description: 'Payment date',
    example: '2024-09-01T12:00:00Z',
    required: false,
  })
  paymentDate?: string;

  @ApiProperty({
    description: 'Tenant ID associated with the payment',
    example: 2,
    required: false,
  })
  tenantId?: number;

  @ApiProperty({
    description: 'Property ID associated with the payment',
    example: 2,
    required: false,
  })
  propertyId?: number;
}
