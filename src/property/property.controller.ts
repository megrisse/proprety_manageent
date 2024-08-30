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
import { PropertyService } from './property.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreatePropertyDto, UpdatePropertyDto } from 'src/dto/property.dto';
import { JwtStrategy } from 'src/jwt-strategy/jwt-strategy';

@ApiTags('properties')
@UseGuards(JwtStrategy)
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new property' })
  @ApiResponse({
    status: 201,
    description: 'The property has been successfully created.',
    type: CreatePropertyDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all properties' })
  @ApiResponse({
    status: 200,
    description: 'List of properties',
    type: [CreatePropertyDto],
  })
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a property by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the property', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The property details',
    type: CreatePropertyDto,
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  findOne(@Param('id') id: number) {
    return this.propertyService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a property by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the property', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The property has been successfully updated.',
    type: UpdatePropertyDto,
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  update(
    @Param('id') id: number,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a property by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the property', type: Number })
  @ApiResponse({
    status: 204,
    description: 'The property has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  remove(@Param('id') id: number) {
    return this.propertyService.delete(id);
  }
}
