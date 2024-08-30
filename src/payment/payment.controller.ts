import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreatePaymentDto, UpdatePaymentDto } from 'src/dto/payment.dto';
import { JwtStrategy } from 'src/jwt-strategy/jwt-strategy';

@ApiTags('payments')
@UseGuards(JwtStrategy)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({
    status: 201,
    description: 'The payment has been successfully created.',
    type: CreatePaymentDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({
    status: 200,
    description: 'List of payments',
    type: [CreatePaymentDto],
  })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payment by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the payment', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The payment details',
    type: CreatePaymentDto,
  })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  findOne(@Param('id') id: number) {
    return this.paymentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a payment by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the payment', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The payment has been successfully updated.',
    type: UpdatePaymentDto,
  })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the payment', type: Number })
  @ApiResponse({
    status: 204,
    description: 'The payment has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  remove(@Param('id') id: number) {
    return this.paymentService.remove(id);
  }
}
