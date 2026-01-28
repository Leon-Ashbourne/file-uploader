const { prisma } = require("../lib/prisma.js");

async function addUser(password, username) {
    await prisma.user.create({
        data: {
            username: username,
            password: password,
        },
    });
}

module.exports = {
    addUser
}