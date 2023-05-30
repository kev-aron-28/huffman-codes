const { MinQueue, LinkedNode } = require('./minQueue');
const leftPad = require('left-pad')
const rightPad = require('right-pad');

const binaryToNumber = binary => parseInt(binary, 2);
const numberToByte = number => leftPad((number >>> 0).toString(2), 8, '0');

class HuffManTree {
    constructor(freqTable) {
        this.createTree = this.createTree.bind(this);
        this.getCodes = this.getCodes.bind(this);
        this.root = this.createTree(freqTable);
        this.translation = null;
    }

    encodeString(chunk) {
        const charToCode = this.getCodes();
        let encodedString = '';
        let binaryString = '';
    
        for (let charAt of chunk) {
          binaryString += charToCode[charAt];
          if (binaryString.length >= 8) {
            const byteStr = binaryString.slice(0, 8);
            binaryString = binaryString.slice(8);
            const number = binaryToNumber(byteStr);
            encodedString += String.fromCharCode(number);
          }
        }
    
        if (binaryString.length) {
          const byteStr = rightPad(binaryString, 8, '0');
          const number = binaryToNumber(byteStr);
          encodedString += String.fromCharCode(number);
        }
    
        return encodedString;
    }


    decodeString(str, len) {
        let decoded = '';
        let nodePointer = this.root;
    
        let binaryString = '';
        for (let i = 0; i < str.length; i++) {
          const charCode = str.charCodeAt(i);
          binaryString += numberToByte(charCode);
        }
    
        for (let bit of binaryString) {
          if (decoded.length === len) {
            break;
          }
    
          // Walk the tree
          if (bit === '0') {
            nodePointer = nodePointer.left;
          } else {
            nodePointer = nodePointer.right;
          }
    
          if (nodePointer.char) {
            decoded += nodePointer.char;
            nodePointer = this.root;
          }
        }
    
        return decoded;
    }

    createMinQueue(freqTable = {}) {
        const queue = new MinQueue();
        Object.entries(freqTable).map(([key, val]) => queue.enqueue(new LinkedNode(key, val)));
        return queue;
    }

    createTree(freqTable) {
        const minQueue = this.createMinQueue(freqTable);

        while (minQueue.length > 1) {
            const leftChild = minQueue.dequeue();
            const rightChild = minQueue.dequeue();
            const freq = leftChild.freq + rightChild.freq;
            const Node = new LinkedNode(null, freq, leftChild, rightChild);
            minQueue.enqueue(Node)
        }

        return minQueue.dequeue();
    }

    getCodes() {
        const translation = {};
        this.root.getCodes('', translation);
        this.translation = translation;
        return translation;
    }

    inOrderTransverse(treeNode) {
        if (treeNode == null) {
            return
        }

        this.inOrderTransverse(treeNode.left)

        if (treeNode.char) console.log({ char: treeNode.char, freq: treeNode.freq });
        console.log({ freq: treeNode.freq });

        this.inOrderTransverse(treeNode.right)
    }

}

module.exports = HuffManTree
