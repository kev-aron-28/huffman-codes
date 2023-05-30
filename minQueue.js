class LinkedNode {
	constructor( char, freq, left = null, right = null){
		this.char = char;
        this.freq = freq;
		this.next = null;
        this.left = left;
        this.right = right;
	}

    getCodes(prefix, table) {
        if (this.char) {
          table[this.char] = prefix;
        } else {
          if (this.left) this.left.getCodes(`${prefix}0`, table);
          if (this.right) this.right.getCodes(`${prefix}1`, table);
        }
    }

}

class MinQueue {
	constructor(){
		this.top    = null;
		this.bottom = null;
		this.length = 0;
	}

	peek(){
		return this.top;
	}

	enqueue( node ){

        const freq = node.freq;

	    const newNode = new LinkedNode( node.char, node.freq, node.left, node.right );	

		if (this.length === 0) {
            this.top = newNode;
            this.bottom = newNode;
        } else {
            if(this.top.freq >= freq) {
              const helper = this.top;
              this.top = newNode;
              this.top.next = helper;
            } else{
                let current = this.top;
                let prev = null;

                while(current != null && current.freq < freq) {
                    prev = current;
                    current = current.next;
                }
                prev.next = newNode;
                newNode.next = current;
            }

        }
        this.length++;
  
      return this;
	}
	
	
	dequeue(){
		if( this.length == 0 ){
			throw new Error('Queue is empty');
		}

        const deletedNode = this.top;
        this.top = this.top.next;
		this.length--;

        return deletedNode;
	}

	show(){
		let current = this.top;
		while( current ){
			console.log({ char: current.char, freq: current.freq });
			current = current.next;
		}
		return 0;
	}

}

module.exports = {
    MinQueue,
    LinkedNode
};
