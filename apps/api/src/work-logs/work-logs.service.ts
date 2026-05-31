import { WorkLogsQueryDto } from '@construction/contracts';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkLogDto } from './dto/create-work-log.dto';
import { UpdateWorkLogDto } from './dto/update-work-log.dto';

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
    const workType = await this.prisma.workType.findUnique({
      where: { id: dto.workTypeId },
    });

    if (!workType) {
      throw new BadRequestException('Вид работ не найден');
    }

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
    const existing = await this.prisma.workLog.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException('Запись журнала не найдена');
    }

    if (dto.workTypeId) {
      const workType = await this.prisma.workType.findUnique({
        where: { id: dto.workTypeId },
      });

      if (!workType) {
        throw new BadRequestException('Вид работ не найден');
      }
    }

    return this.prisma.workLog.update({
      where: { id },
      data: {
        workDate: dto.workDate ? new Date(dto.workDate) : undefined,
        workTypeId: dto.workTypeId,
        amount: dto.amount,
        unit: dto.unit,
        performerName: dto.performerName,
      },
      include: { workType: true },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.workLog.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException('Запись журнала не найдена');
    }

    await this.prisma.workLog.delete({ where: { id } });

    return { success: true };
  }
}