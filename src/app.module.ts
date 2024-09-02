import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyModule } from './property/property.module';
import { TenantModule } from './tenant/tenant.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtStrategy } from './jwt-strategy/jwt-strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', //should be seted in environnement
      port: 5432,
      username: 'postgres', //should be seted in environnement
      password: 'postgres', //should be seted in environnement
      database: 'property_management',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PropertyModule,
    TenantModule,
    PaymentModule,
    AuthModule,
    UserModule,
  ],
  providers: [JwtStrategy, JwtService],
})
export class AppModule {}
