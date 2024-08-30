import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({
    description: 'Name of the tenant',
    example: 'Jane Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Contact details of the tenant',
    example: '+212656789000',
  })
  contactDetails: string;

  @ApiProperty({
    description: 'Section or unit occupied by the tenant',
    example: 'Unit 3A',
  })
  section: string;
}

export class UpdateTenantDto {
  @ApiProperty({
    description: 'Name of the tenant',
    example: 'John Doe',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Contact details of the tenant',
    example: '+212656789000',
    required: false,
  })
  contactDetails?: string;

  @ApiProperty({
    description: 'Section or unit occupied by the tenant',
    example: 'Unit 4B',
    required: false,
  })
  section?: string;
}
