import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const userWithPosts = await prisma.user.findMany({
        include: {
            posts: true
        }
    });


    console.dir(userWithPosts, { depth: null });
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect()
    process.exit(1)
})