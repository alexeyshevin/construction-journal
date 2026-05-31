import {
  CreateWorkLogSchema,
  UpdateWorkLogSchema,
  WorkLogsQuerySchema,
} from '@construction/contracts';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { WorkLogsService } from './work-logs.service';

@Controller('work-logs')
export class WorkLogsController {
  constructor(private readonly workLogsService: WorkLogsService) {}

  @Get()
  findAll(@Query() query: unknown) {
    const result = WorkLogsQuerySchema.safeParse(query);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten());
    }

    return this.workLogsService.findAll(result.data);
  }

  @Post()
  create(@Body() body: unknown) {
    const result = CreateWorkLogSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten());
    }

    return this.workLogsService.create(result.data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: unknown) {
    const result = UpdateWorkLogSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten());
    }

    return this.workLogsService.update(id, result.data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workLogsService.remove(id);
  }
}