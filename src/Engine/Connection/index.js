import * as Packet from "../../Packets";

/**
 * Connection
 * @class Connection
 * @export
 */
export default class Connection {

  /**
   * @constructor
   * @param {Object} instance
   * @param {String} url
   */
  constructor(instance, url) {

    /**
     * Instance ref
     * @type {Object}
     */
    this.instance = instance;

    /**
     * Websocket instance
     * @type {Object}
     */
    this.ws = null;

    /**
     * Opening state
     * @type {Boolean}
     */
    this.open = false;

    this.init(url);

  }

  /**
   * Initialise a ws connection
   * @param {String} url
   */
  init(url) {

    this.open = true;

    this.ws = new window.WebSocket(`ws://${url}`);

    this.ws.binaryType = "arraybuffer";

    this.ws.addEventListener('open',    this::this.onOpen);
    this.ws.addEventListener('close',   this::this.onClose);
    this.ws.addEventListener('error',   this::this.onError);
    this.ws.addEventListener('message', this::this.onMessage);

  }

  /**
   * On open
   * @param {Object} e
   */
  onOpen(e) {

    console.log("Socket Open!");

    this.sendUserData();

  }

  /**
   * On close
   * @param {Object} e
   */
  onClose(e) {
    console.log(e);
  }

  /**
   * On error
   * @param {Object} e
   */
  onError(e) {
    console.log("Socket closed!");
  }

  /**
   * On message
   * @param {Object} e
   */
  onMessage(e) {
    /*let delta = this.instance.engine.renderer.delta * 1e3;
    setTimeout(this::function() {
      this.handleMessage(new DataView(e.data));
    }, delta);*/
    this.handleMessage(new DataView(e.data));
  }

  /**
   * Handle a message
   * @param {Object} msg
   */
  handleMessage(msg) {

    let offset = 0;

    let key = msg.getUint8(offset++);

    function getString() {
      var text = "";
      var char = 0;
      while ((char = msg.getUint16(offset, true)) !== 0) {
        offset += 2;
        text += String.fromCharCode(char);
      };
      offset += 2;
      return (text);
    }

    if (key === 0) {
      let data = this.getString(msg);
      console.log(data);
    }

    /** User joined map */
    if (key === 22) {
      offset += 4;
      offset += 4;
      let data = JSON.parse(getString());
      let player = this.instance.entities.Player;
      let entity = new player(data);
      entity.instance = this.instance.engine;
      this.instance.engine.addEntity(entity);
      if (entity.isLocalPlayer === true) {
        this.instance.engine.localEntity = entity;
        this.instance.engine.camera.focus(entity, false);
      }
    }

    /** Jumping */
    if (key === 30) {
      offset += 4;
      offset += 4;
      let data = JSON.parse(getString());
      let entity = this.instance.engine.getEntityByProperty(data.name, "name");
      entity.jump();
    }

    /** Facing */
    if (key === 31) {
      offset += 4;
      offset += 4;
      let data = JSON.parse(getString());
      let entity = this.instance.engine.getEntityByProperty(data.name, "name");
      entity.changeFacing(data.dir);
    }

    /** Movement */
    if (key === 32) {
      offset += 4;
      offset += 4;
      let data = JSON.parse(getString());
      let entity = this.instance.engine.getEntityByProperty(data.name, "name");
      entity.position.x = data.x;
      entity.position.y = data.y;
      entity.move(data.dir);
    }

    /** Velocity */
    if (key === 33) {
      offset += 4;
      offset += 4;
      let data = JSON.parse(getString());
      let entity = this.instance.engine.getEntityByProperty(data.name, "name");
      entity.velocity = data.velocity;
    }

    /** Kill */
    if (key === 34) {
      offset += 4;
      offset += 4;
      let data = JSON.parse(getString());
      let entity = this.instance.engine.getEntityByProperty(data.name, "name");
      entity.fadeOut(1, true);
    }

    return void 0;

  }

  /**
   * Prepare data to send
   * @param  {Number} length
   * @return {Object}
   */
  prepareData(length) {
    return (
      new DataView(new ArrayBuffer(length))
    );
  }

  /**
   * Send data
   * @param {Object} a
   */
  send(a) {
    this.ws.send(a.buffer);
    return void 0;
  }

  /**
   * Send user data
   */
  sendUserData() {

    if (this.open === false) return void 0;

    let text = location.search.replace("?", "");

    let msg = this.prepareData(1 + 2 * text.length);

    msg.setUint8(0, 0);

    for (var ii = 0; ii < text.length; ++ii) {
      msg.setUint16(1 + 2 * ii, text.charCodeAt(ii), true);
    };

    this.send(msg);

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

  /**
   * Send data
   * @param {String} type
   * @param {Array}  data
   */
  sendData(type, data) {

    let pClass = Packet[type];

    if (
      pClass === void 0 ||
      pClass === null
    ) return void 0;

    let packet = new pClass(...data);

    this.send(packet);

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

}