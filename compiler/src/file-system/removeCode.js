const path = require("path");
const fsPromises = require('fs/promises')

const removeCode = async(folderPath) => {
    try{
        const files = await fsPromises.readdir(folderPath)
        for(const file of files){
            await fsPromises.unlink(path.resolve(folderPath, file))
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    removeCode
}