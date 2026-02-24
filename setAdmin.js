const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const nik = "352501001";
  
  const user = await prisma.user.findUnique({
    where: { nik }
  });

  if (!user) {
    console.log(`❌ NIK ${nik} tidak ditemukan dalam database.`);
    return;
  }

  const updatedUser = await prisma.user.update({
    where: { nik },
    data: { role: 'admin' }
  });

  console.log(`✅ BERHASIL: User ${updatedUser.name} (${updatedUser.nik}) telah di-upgrade menjadi ADMIN.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });