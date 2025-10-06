/**
 * Reset Admin User Script
 * This script creates or updates the admin user with fresh credentials
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function resetAdmin() {
  try {
    console.log("🔄 Resetting admin user...");

    // Check if admin user exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@silvercrafts.com" },
    });

    if (existingAdmin) {
      console.log("👤 Admin user found, updating password...");

      // Hash the new password
      const hashedPassword = await bcrypt.hash("admin123", 10);

      // Update the admin user
      const updatedAdmin = await prisma.user.update({
        where: { email: "admin@silvercrafts.com" },
        data: {
          password: hashedPassword,
          role: "ADMIN",
        },
      });

      console.log("✅ Admin user updated successfully!");
      console.log(`📧 Email: ${updatedAdmin.email}`);
      console.log(`🔑 Password: admin123`);
      console.log(`👑 Role: ${updatedAdmin.role}`);
    } else {
      console.log("➕ Creating new admin user...");

      // Hash the password
      const hashedPassword = await bcrypt.hash("admin123", 10);

      // Create new admin user
      const newAdmin = await prisma.user.create({
        data: {
          name: "Admin User",
          email: "admin@silvercrafts.com",
          password: hashedPassword,
          role: "ADMIN",
        },
      });

      console.log("✅ Admin user created successfully!");
      console.log(`📧 Email: ${newAdmin.email}`);
      console.log(`🔑 Password: admin123`);
      console.log(`👑 Role: ${newAdmin.role}`);
    }

    // List all users for verification
    console.log("\n📋 All users in database:");
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    allUsers.forEach((user) => {
      console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
    });
  } catch (error) {
    console.error("❌ Error resetting admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdmin();
