import {Body,Controller,Delete,Get,HttpException,HttpStatus,Param,Post,Put,} from '@nestjs/common';
  import { ModerationService } from './moderation.service';
  import { error } from 'console';
  
  @Controller('api/moderation')
  export class ModerationController {
    constructor(private readonly moderationService: ModerationService) {}
  
    @Get('/test')
    test() {
      return this.moderationService.test();
    }
    // Get all moderation articles
    @Get('/')
    async findAll() {
      try {
        return this.moderationService.findAll();
      } catch {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No Moderation Articles found',
          },
          HttpStatus.NOT_FOUND,
          { cause: error },
        );
      }
    }
  }
  