const {commandMap} = require("./instructions")
const {createCodeFile} = require("../file-system");

const {spawn} = require("child_process");

async function runCode(language, code) {

    const {jobID} = await createCodeFile(language, code);
    const {compileCodeCommand, compilationArgs, executeCodeCommand, executionArgs, outputExt} = commandMap(jobID, language);

    if (compileCodeCommand) {
        await new Promise((resolve, reject) => {
            const compileCode = spawn(compileCodeCommand, compilationArgs || [])
            compileCode.stderr.on('data', (error) => {
                reject({
                    status: 200,
                    output: '',
                    error: error.toString(),
                    language
                })
            });
            compileCode.on('exit', () => {
                resolve()
            })
        })
    }
    
    // eksekusi kode program
    // const result =  () => {
    let command = {"executeCodeCommand" : executeCodeCommand, "executionArgs":executionArgs}
        


    return {
        command,
        language,
    }
}

module.exports = {runCode}