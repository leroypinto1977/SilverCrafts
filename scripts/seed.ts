import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Get admin credentials from environment variables
  const adminEmail = process.env.ADMIN_EMAIL || "admin@silvercrafts.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123!";

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("ℹ️  Admin user already exists");
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        isTemporary: false,
        isActive: true,
      },
    });

    console.log(`✅ Admin user created: ${admin.email}`);
    console.log(`🔑 Password: ${adminPassword}`);
  }

  console.log("🌱 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
