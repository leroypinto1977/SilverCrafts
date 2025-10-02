import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: "admin@silvercrafts.com",
      },
    });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123!", 12);

    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@silvercrafts.com",
        password: hashedPassword,
        role: "ADMIN",
        isActive: true,
        isTemporary: false,
      },
    });

    console.log("✅ Admin user created successfully!");
    console.log("📧 Email: admin@silvercrafts.com");
    console.log("🔐 Password: admin123!");
    console.log("⚠️  Please note these credentials for admin access");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
