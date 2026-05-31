import type {
  CreateWorkLogDto,
  UpdateWorkLogDto,
  WorkLogsQueryDto,
} from '@construction/contracts';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: WorkLogsQueryDto) {
    const where: Prisma.WorkLogWhereInput = {};

    if (params.dateFrom || params.dateTo) {
      where.workDate = {};

      if (params.dateFrom) {
        where.workDate.gte = new Date(params.dateFrom);
      }

      if (params.dateTo) {
        const dateTo = new Date(params.dateTo);
        dateTo.setHours(23, 59, 59, 999);
        where.workDate.lte = dateTo;
      }
    }

    return this.prisma.workLog.findMany({
      where,
      include: { workType: true },
      orderBy: { workDate: params.sort ?? 'desc' },
    });
  }

  async create(dto: CreateWorkLogDto) {
    const workType = await this.getWorkTypeOrThrow(dto.workTypeId);

    return this.prisma.workLog.create({
      data: {
        workDate: new Date(dto.workDate),
        workTypeId: dto.workTypeId,
        amount: dto.amount,
        unit: dto.unit || workType.unit,
        performerName: dto.performerName,
      },
      include: { workType: true },
    });
  }

  async update(id: string, dto: UpdateWorkLogDto) {
    await this.getWorkLogOrThrow(id);

    let unit = dto.unit;

    if (dto.workTypeId) {
      const workType = await this.getWorkTypeOrThrow(dto.workTypeId);
      unit ??= workType.unit;
    }

    return this.prisma.workLog.update({
      where: { id },
      data: {
        workDate: dto.workDate ? new Date(dto.workDate) : undefined,
        workTypeId: dto.workTypeId,
        amount: dto.amount,
        unit,
        performerName: dto.performerName,
      },
      include: { workType: true },
    });
  }

  async remove(id: string) {
    await this.getWorkLogOrThrow(id);

    await this.prisma.workLog.delete({ where: { id } });

    return { success: true };
  }

  private async getWorkLogOrThrow(id: string) {
    const workLog = await this.prisma.workLog.findUnique({ where: { id } });

    if (!workLog) {
      throw new NotFoundException('Запись журнала не найдена');
    }

    return workLog;
  }

  private async getWorkTypeOrThrow(id: string) {
    const workType = await this.prisma.workType.findUnique({ where: { id } });

    if (!workType) {
      throw new BadRequestException('Вид работ не найден');
    }

    return workType;
  }
}