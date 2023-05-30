const HuffManTree = require('./huffMan');

class Compressor {
    constructor() {
        this.table = {}   
    }

    createFrecTable(chunk) {
        for (let char of chunk) {
            this.table[char] ? this.table[char]++ : this.table[char] = 1;
        }
        
        return this.table;
    }

    encode(chunk){
        const freqTable = this.createFrecTable(chunk)
        const tree = new HuffManTree(freqTable);
        const result = tree.encodeString(chunk);
        freqTable.len = chunk.length;

        const totalCost = this.getTotalCostOfCompression(freqTable, tree.translation);
        
        return { freqTable, result, totalCost };
    }

    getTotalCostOfCompression(freqTable, translation) {
        let result = 0;
        for (const key in translation) {
            result += freqTable[key] * translation[key].length;
        }
        return result;
    }

    decode(chunck){
        const [freqJsonStr, ...restOfFile] = chunck.split('\n');
        console.log(freqJsonStr);
        const encodedString = restOfFile.join('\n');
        const freqTable = JSON.parse(freqJsonStr);
        const { len } = freqTable;
        delete freqTable['len'];
      
        const huffman = new HuffManTree(freqTable);
      
        return huffman.decodeString(encodedString, len);
    }
}

module.exports = Compressor
