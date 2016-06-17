class Packer (width, height) {
    this.init(width, height);
};

Packer.prototype = {

    init (width, height) {
        this.root = { x: 0, y: 0, w: width, h: height };
    },

    fit (blocks) {
        var n, node, block;
        for (n = 0; n < blocks.length; n++) {
            block = blocks[n];
            if (node = this.findNode(this.root, block.w, block.h))
                if (node.h <= block.w && node.w <= block.h ) {
                    block.fit = this.splitNode(node, block.h, block.w);
                } else {
                    block.fit = this.splitNode(node, block.w, block.h);
                }       
        }
    },

    findNode (root, width, height) {
        if (root.used)
            return this.findNode(root.right, width, height) || this.findNode(root.down, width, height);
        else if ((width <= root.w) && (height <= root.h))
            return root;
        else
            return null;
    },

    splitNode (node, width, height) {
        node.used = true;
        node.down = { x: node.x, y: node.y + height, w: node.w, h: node.h - height };
        node.right = { x: node.x + width, y: node.y, w: node.w - width, h: height };
        return node;
    }

}
