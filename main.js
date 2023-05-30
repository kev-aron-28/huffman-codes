const fs = require('fs'); 
const [ , , fileName, cmd ] = process.argv;

const compressor = require('./compressor');

class HuffManMain {
    constructor(fileName, cmd) {
        this.compressor = new compressor()
        this.fileName = fileName;
        this.cmd = cmd;
        this.inFileStats = fs.lstatSync(fileName);
        this.outFileStats = null
        this.fileData = fs.readFileSync(this.fileName).toString();
    }

    start() {
        if(!this.fileName) {
            throw new Error('Invalid File')
        }

        switch (cmd) {
            case 'encode':
                this.encodeStream();
                break;
            case 'decode':
                console.log('decode');
                this.decodeStream();
            default:
                break;
        }
    }

    encodeStream () {
        let encoded = this.compressor.encode(this.fileData);
        let fullData = `${JSON.stringify(encoded.freqTable)}\n${encoded.result}`

        console.log(`Total cost of tree ${encoded.totalCost} \n`);

        const outputFile = 'output.txt'

        fs.writeFileSync(outputFile, fullData);
    }

    decodeStream() {
        const outData = this.compressor.decode(this.fileData);
        const outFile = `${fileName}.decoded`;
        fs.writeFileSync(outFile, outData);
    }
}

new HuffManMain(fileName, cmd).start();
