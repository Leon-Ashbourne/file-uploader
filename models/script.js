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
    const user = await prisma.user.findUnique({
        where: {
            username: username,
            password: password,
        },
    });

    return user;
}

async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            id: true,
            username: true,
        }
    });

    return user;
}

module.exports = {
    addUser,
    getUser,
    getUserById
}