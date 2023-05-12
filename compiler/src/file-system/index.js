// const {v4: getUUID} = require("uuid");
const {existsSync, mkdirSync, writeFileSync} = require("fs")
const {join} = require("path");

if (!existsSync(join(process.cwd(), "codes")))
    mkdirSync(join(process.cwd(), "codes"));

if (!existsSync(join(process.cwd(), "outputs")))
    mkdirSync(join(process.cwd(), "outputs"));

const createCodeFile = async (language, code) => {
    // const jobID = getUUID();
    const jobID = randomName();
    const fileName = `${jobID}.${language}`;
    const filePath = join(process.cwd(), `codes/${fileName}`)

    await writeFileSync(filePath, code?.toString())

    return {
        fileName,
        filePath,
        jobID
    };
};

function randomName(){
    const length = 8
    let res = ''
    for(let i=0;i<length;i++){
        const random = Math.floor(Math.random() * 27)
        res+=String.fromCharCode(97 + random)
    }
    return res
}


module.exports = {
    createCodeFile,
};