const {join} = require('path')

const commandMap = (jobID, language) => {
    switch (language) {
        case 'java':
            return {
                executeCodeCommand: 'java',
                executionArgs: [
                    join(process.cwd(), `codes/${jobID}.java`)
                ],
                compilerInfoCommand: 'java --version'
            };
        case 'cpp':
            return {
                compileCodeCommand: 'g++',
                compilationArgs: [
                    join(process.cwd(), `codes/${jobID}.cpp`),
                    '-o',
                    join(process.cwd(), `outputs/${jobID}.out`)
                ],
                executeCodeCommand: join(process.cwd(), `outputs/${jobID}.out`),
                executionArgs : [],
                outputExt: 'out',
                compilerInfoCommand: 'g++ --version'
            };
        case 'py':
            return {
                executeCodeCommand: 'python3',
                executionArgs: [
                    join(process.cwd(), `codes/${jobID}.py`)
                ],
                compilerInfoCommand: 'python3 --version'
            }
        case 'js':
            return {
                executeCodeCommand: 'node',
                executionArgs: [
                    join(process.cwd(), `codes/${jobID}.js`)
                ],
                compilerInfoCommand: 'node --version'
            }
        case 'cs':
            return {
                compileCodeCommand: 'mcs',
                compilationArgs: [
                    `-out:${join(
                        process.cwd(),
                        `outputs/${jobID}`
                    )}.exe`,
                    `${join(process.cwd(), `codes/${jobID}.cs`)}`,
                ],
                executeCodeCommand: 'mono',
                executionArgs: [
                    `${join(process.cwd(), `outputs/${jobID}`)}.exe`
                ],
                outputExt: 'exe',
                compilerInfoCommand: 'mcs --version'
            }
    }
}

const supportedLanguages = ['java', 'cpp', 'py', 'js', 'cs'];

module.exports = {commandMap, supportedLanguages}