import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const workTypes = [
  { name: 'Кладка перегородок', unit: 'м²' },
  { name: 'Монтаж опалубки', unit: 'м²' },
  { name: 'Бетонирование', unit: 'м³' },
  { name: 'Армирование', unit: 'кг' },
  { name: 'Штукатурные работы', unit: 'м²' },
  { name: 'Монтаж инженерных сетей', unit: 'п.м.' },
];

async function main() {
  for (const workType of workTypes) {
    await prisma.workType.upsert({
      where: { name: workType.name },
      update: { unit: workType.unit },
      create: workType,
    });
  }

  const firstType = await prisma.workType.findFirst({
    where: { name: 'Кладка перегородок' },
  });

  if (firstType) {
    const count = await prisma.workLog.count();

    if (count === 0) {
      await prisma.workLog.createMany({
        data: [
          {
            workDate: new Date(),
            amount: 24,
            unit: firstType.unit,
            performerName: 'Иванов Иван Иванович',
            workTypeId: firstType.id,
          },
        ],
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });