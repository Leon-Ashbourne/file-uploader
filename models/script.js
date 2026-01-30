const { prisma } = require("../lib/prisma.js");

async function addUser(password, username) {
    await prisma.user.create({
        data: {
            username: username,
            password: password,
        },
    });
}

async function getUser(username, password) {
    const user = await prisma.user.findMany({
        where: {
            AND: [
                {
                    username: username,
                },
                {
                    password: password,
                },
            ],
        },
    });

    return user;
}

async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            username: true,
        }
    });

    return user;
}

async function addFileDetailsToDB(ogName, fName, size, path, id) {
    const value = await prisma.files.create({
        data: {
            url: path,
            fileName: fName,
            OriginalName: ogName,
            size: size,
            author: {
                connect: { id: id }
            }
        }
                    
    });

    console.log(value);
}

module.exports = {
    addUser,
    getUser,
    getUserById,
    addFileDetailsToDB
}