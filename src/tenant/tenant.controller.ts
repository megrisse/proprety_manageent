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
import { TenantService } from './tenant.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateTenantDto, UpdateTenantDto } from 'src/dto/tenant.dto';
import { JwtStrategy } from 'src/jwt-strategy/jwt-strategy';

@ApiTags('tenants')
@UseGuards(JwtStrategy)
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tenant' })
  @ApiResponse({
    status: 201,
    description: 'The tenant has been successfully created.',
    type: CreateTenantDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tenants' })
  @ApiResponse({
    status: 200,
    description: 'List of tenants',
    type: [CreateTenantDto],
  })
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tenant by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the tenant', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The tenant details',
    type: CreateTenantDto,
  })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  findOne(@Param('id') id: number) {
    return this.tenantService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a tenant by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the tenant', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The tenant has been successfully updated.',
    type: UpdateTenantDto,
  })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  update(@Param('id') id: number, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tenant by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the tenant', type: Number })
  @ApiResponse({
    status: 204,
    description: 'The tenant has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  remove(@Param('id') id: number) {
    return this.tenantService.remove(id);
  }
}
