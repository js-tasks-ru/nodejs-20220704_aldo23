const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.encoding = options.encoding;
    this.totalLength = 0;
  }

  _transform(chunk, encoding, callback) {
    this.totalLength += Buffer.byteLength(chunk, this.encoding);
    
    if(this.totalLength > this.limit) {
      this.destroy(new LimitExceededError());
    }
    
    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
