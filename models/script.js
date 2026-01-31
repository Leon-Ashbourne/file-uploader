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
}

async function getFilesFromDB(userId) {
    const files = await prisma.files.findMany({
        where: {
            AND: [
                {
                    authorId: userId,
                },
                {
                    foldersId: null
                }
            ]
        },
        select: {
            updatedAt: true,
            size: true,
            OriginalName: true,
            fileName: true,
            id: true,
        }
    });

    return files;
}

//create new folder
async function createFolder(userId)  {
    await prisma.folders.create({
        data: {
            author: {
                connect: {id: userId},
            },
        },
    });
}
//get folders
async function getFoldersFromDB(userId) {
    const folders = await prisma.folders.findMany({
        where: {
            authorId: userId,
        },
        select: {
            createdAt: true,
            name: true,
            id: true,
        },
    });

    return folders;
}

//get file details
async function getFileDetailsById(fileId) {
    const fileDetails = await prisma.files.findFirst({
        where: {
            id: fileId,
        },
        select: {
            OriginalName: true,
            size: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    return fileDetails;
}

//get files from folder
async function getFilesFromFolderById(folderId) {
    const files = await prisma.files.findMany({
        where: {
            foldersId: folderId,
        },
        select: {
            createdAt: true,
            size: true,
            OriginalName: true,
            fileName: true,
            id: true,
        },
    });
     
    return files;
}


module.exports = {
    addUser,
    getUser,
    getUserById,
    addFileDetailsToDB,
    getFilesFromDB,
    createFolder,
    getFoldersFromDB,
    getFileDetailsById,
    getFilesFromFolderById
}