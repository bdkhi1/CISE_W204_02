import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdministrationController } from './administration.controller';
import { AdministrationService } from './administration.service';
import { Administration, AdministrationSchema } from './administration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Administration.name, schema: AdministrationSchema }]),
  ],
  controllers: [AdministrationController],
  providers: [AdministrationService],
})
export class AdministrationModule {}
