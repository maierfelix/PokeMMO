import Packet from "../../src/packets";

/**
 * Instance
 * @class Instance
 * @export
 */
export default class Instance {

  /**
   * @constructor
   * @param {Object} instance
   * @param {Object} entity
   */
  constructor(instance, entity) {

    /**
     * Instance ref
     * @type {Object}
     */
    this.instance = instance;

    /**
     * Entity ref
     * @type {Object}
     */
    this.entity = entity;

    /**
     * Protocol
     * @type {Number}
     */
    this.protocol = 0;

  }

  /**
   * Sto buffer
   * @param {Array} message
   * @return {Object}
   */
  stobuf(buffer) {

    let ii = 0;
    let length = buffer.length;
    let arrayBuffer = new ArrayBuffer(length);
    let view = new Uint8Array(arrayBuffer);

    for (; ii < length; ++ii) {
      view[ii] = buffer[ii];
    };

    return (view.buffer);
  }

  invalidMessage(msg) {
    return (
      msg !== void 0 &&
      typeof msg === "string" ||
      msg.length === 0
    );
  }

  /**
   * Kill myself
   */
  kill() {
    let data = this.getSTR(34, JSON.stringify({name: this.entity.name}));
    this.instance.broadcastMessage(data, this.entity.name);
    return void 0;
  }

  /**
   * Handle a message
   * @param {Array} msg
   */
  onMessage(msg) {

    if (this.invalidMessage(msg) === true) return void 0;

    let buffer = this.stobuf(msg);
    let view = new DataView(buffer);
    let packetId = view.getUint8(0, true);

    /** Username */
    if (packetId === 0) {
      let name = this.getString(view);
      this.entity.name = name;
      this.instance.broadcastMessage(this.buildEntityData(name, 160, 144, false), name);
      this.instance.sendMessageTo(this.buildEntityData(name, 160, 144, true), name);
      return void 0;
    }

    /** Jumping */
    if (packetId === 30) {
      let id = view.getUint16(1, true);
      let data = this.getSTR(packetId, JSON.stringify({name: this.entity.name}));
      this.instance.broadcastMessage(data, this.entity.name);
      return void 0;
    }

    /** Facing */
    if (packetId === 31) {
      let id = view.getUint16(1, true);
      let dir = view.getUint16(3, true);
      this.entity.facing = dir << 0;
      let data = this.getSTR(packetId, JSON.stringify({ name: this.entity.name, dir: dir }));
      this.instance.broadcastMessage(data, this.entity.name);
      return void 0;
    }

    /** Movement */
    if (packetId === 32) {
      let id = view.getUint16(1, true);
      let dir = view.getUint16(3, true);
      let x = view.getUint16(5, true);
      let y = view.getUint16(7, true);
      this.entity.position.x = x << 0;
      this.entity.position.y = y << 0;
      let data = this.getSTR(packetId, JSON.stringify({ name: this.entity.name, dir: dir, x: x, y: y }));
      this.instance.broadcastMessage(data, this.entity.name);
      return void 0;
    }

    /** Velocity */
    if (packetId === 33) {
      let id = view.getUint16(1, true);
      let velocity = view.getUint16(3, true);
      this.entity.velocity = Number(velocity);
      let data = this.getSTR(packetId, JSON.stringify({ name: this.entity.name, velocity: velocity }));
      this.instance.broadcastMessage(data, this.entity.name);
      return void 0;
    }

  }

  /**
   * Build entity data
   * @param  {String} name
   * @param  {Number} x
   * @param  {Number} y
   * @param  {Boolean} local
   * @return {Object}
   */
  buildEntityData(name, x, y, local) {

    var options = {
      name: name,
      map: "Town",
      x: x,
      y: y,
      width: 16,
      height: 16,
      isLocalPlayer: local,
      sprite: "assets/img/0.png"
    };

    let data = JSON.stringify(options);

    return (this.getSTR(22, data));

  }

  getString(view) {

    if ((view.byteLength + 1) % 2 === 1) {
      return void 0;
    }

    var txt = "";
    var maxLen = 32 * 2;
    for (var i = 1; i < view.byteLength && i <= maxLen; i += 2) {
      var charCode = view.getUint16(i, true);
      if (charCode == 0) {
        return void 0;
      }
      txt += String.fromCharCode(charCode);
    }
    return (txt);
  }

  getSTR(id, str) {

    var lb = [str];
    var bufferSize = 5;
    var validElements = 0;

    // Get size of packet
    for (var i = 0; i < lb.length; i++) {
        if (typeof lb[i] == "undefined") {
            continue;
        }

        var item = lb[i];
        bufferSize += 4; // Empty ID
        bufferSize += item.length * 2; // String length
        bufferSize += 2; // Name terminator

        validElements++;
    }

    var buf = new ArrayBuffer(bufferSize);
    var view = new DataView(buf);

    // Set packet data
    view.setUint8(0, id, true); // Packet ID
    view.setUint32(1, validElements, true); // Number of elements
    var offset = 5;

    // Loop through strings
    for (var i = 0; i < lb.length; i++) {
        if (typeof lb[i] == "undefined") {
            continue;
        }

        var item = lb[i];

        view.setUint32(offset, 0, true);
        offset += 4;

        for (var j = 0; j < item.length; j++) {
            view.setUint16(offset, item.charCodeAt(j), true);
            offset += 2;
        }

        view.setUint16(offset, 0, true);
        offset += 2;
    }

    return buf;

  }

}