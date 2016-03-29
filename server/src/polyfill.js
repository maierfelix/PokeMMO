import WebSocket from "ws";

/**
 * Get buffer
 * @param {Object} packet
 */
WebSocket.prototype.getBuffer = function(data) {

  let ii = 0;
  let length = data.byteLength || data.length;

  let array = new Uint8Array(data.buffer || data);
  let offset = data.byteOffset || 0;
  let buffer = new Buffer(length);

  for (; ii < length; ++ii) {
    buffer[ii] = array[offset + ii];
  };

  return (buffer);

};

/**
 * Send a packet object
 * @param {Object} packet
 */
WebSocket.prototype.sendPacket = function(packet) {

  if (this.readyState === WebSocket.OPEN && packet.build !== void 0) {
    this.send(this.getBuffer(packet.build()), {
      binary: true
    });
  } else if (packet.build === void 0) {
    this.send(packet, {
      binary: true
    });
  }

  return void 0;

};