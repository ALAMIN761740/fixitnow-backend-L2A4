import prisma from "./config/db";
import { hashPassword } from "./utils/hashPassword";

const seed = async () => {
    const categories = [
        { name: "Plumbing", description: "Pipe and fixture repairs" },
        { name: "Electrical", description: "Wiring and electrical fixes" },
        { name: "Cleaning", description: "Home and office cleaning" },
        { name: "Painting", description: "Interior and exterior painting" },
    ];

    for (const category of categories) {
        await prisma.category.upsert({
            where: { name: category.name },
            update: {},
            create: category,
        });
    }

    const adminExists = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (!adminExists) {
        await prisma.user.create({
            data: {
                name: "System Admin",
                email: "admin@fixitnow.com",
                password: await hashPassword("admin123"),
                role: "ADMIN",
            },
        });
    }

    console.log("Seed completed");
};

seed()
    .catch((err) => console.error(err))
    .finally(async () => {
        await prisma.$disconnect();
    });
