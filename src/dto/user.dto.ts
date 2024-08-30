import { ApiProperty } from '@nestjs/swagger';

export class userDto {
  @ApiProperty({
    description: 'The unique username of the user',
    example: 'john_doe',
  })
  username: string;

  @ApiProperty({
    description: 'The unique email of the user',
    example: 'example@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'password123',
  })
  password: string;

  @ApiProperty({
    description: 'The unique ID of the user',
    example: 1,
    required: false,
  })
  id?: number;
}
