import WebSocket from "ws";
import http from "http";
import fs from "fs";

import "./polyfill";

import Packet from "../../src/packets";

import {
  PORT
} from "../config";

import { uHash } from "../../src/Engine/utils";

import Entity from "../../src/Engine/Entity";

import Instance from "./Instance";

import * as game_cfg from "../../src/cfg"; 

/**
 * GameServer
 * @class GameServer
 * @export
 */
export default class GameServer {

  /**
   * @constructor
   */
  constructor() {

    game_cfg.IS_CLIENT = false;

    /**
     * Websocket instance
     * @type {Object}
     */
    this.ws = null;

    /**
     * One frame tick
     * @type {Number}
     */
    this.frame = 1000.0 / 60.0;

    /**
     * Now timestamp
     * @type {Number}
     */
    this.now = 0;

    /**
     * Tick timer
     * @type {Number}
     */
    this.tick = 0;

    /**
     * Now timestamp
     * @type {Number}
     */
    this.then = 0;

    /**
     * Running state
     * @type {Boolean}
     */
    this.running = false;

    /**
     * Users
     * @type {Array}
     */
    this.users = [];

    /**
     * Interval instance
     * @type {Object}
     */
    this.interval = null;

    this.init();

  }

  /**
   * Intitialse a ws server
   */
  init() {

    let options = {
      port: PORT,
      perMessageDeflate: false
    };

    this.ws = new WebSocket.Server(options, this::this.onStart);

    this.ws.on('connection', this::this.onConnection);
    this.ws.on('error',      this::this.onError);

  }

  /**
   * Start main loop
   */
  startLoop() {
    clearInterval(this.interval);
    this.interval = setInterval(this::this.loop, this.frame);
  }

  /**
   * Stop main loop
   */
  stopLoop() {
    clearInterval(this.interval);
  }

  /**
   * Start event
   * @param {Object} e
   */
  onStart(e) {
    this.startLoop();
    this.running = true;
  }

  /**
   * New client connected
   * @param {Object} socket
   */
  onConnection(socket) {

    let ip = socket.upgradeReq.connection.remoteAddress;

    console.log(`${ip} joined!`);

    this.addUser(socket);

  }

  addUser(socket) {

    let entity   = new Entity({});
    let instance = new Instance(this, entity);

    entity.id = uHash();
    entity.socket = socket;
    entity.instance = instance;

    var self = this;

    socket.on('message', instance::instance.onMessage);
    socket.on('close', function() {
      self.onClose(entity.id);
    });

    this.users.push(entity);

  }

  /**
   * Message event
   * @param {Object} msg
   */
  onMessage(msg) {
    //console.log(msg);
  }

  /**
   * Close event
   * @param {Number} id
   */
  onClose(id) {

    let ii = 0;
    let length = this.users.length;

    for (; ii < length; ++ii) {
      if (this.users[ii].id === id) {
        this.users[ii].instance.kill();
        this.users.splice(ii, 1);
        break;
      }
    };

  }

  /**
   * Error event
   * @param {Object} e
   */
  onError(e) {
    switch (e.code) {
      case "EADDRINUSE":
        console.log("[Error] Server could not bind to port! Please close out of Skype or change 'serverPort' in gameserver.ini to a different number.");
      break;
      case "EACCES":
        console.log("[Error] Please make sure you are running Ogar with root privileges.");
      break;
      default:
        console.log("[Error] Unhandled error code: " + e.code);
      break;
    };
    process.exit(1);
  }

  /**
   * Share a message
   * @param {Object} msg
   * @param {String} name
   */
  broadcastMessage(msg, name) {

    let ii = 0;
    let length = this.users.length;

    for (; ii < length; ++ii) {
      if (this.users[ii].name === name) continue;
      this.users[ii].socket.sendPacket(msg);
    };

  }

  /**
   * Send message to single client
   * @param {Object} msg
   * @param {String} name
   */
  sendMessageTo(msg, name) {

    let ii = 0;
    let length = this.users.length;

    for (; ii < length; ++ii) {
      if (this.users[ii].name !== name) continue;
      this.users[ii].socket.sendPacket(msg);
    };

  }

  /**
   * Update timers
   */
  update() {
    this.now = Date.now();
    this.tick += (this.now - this.then);
    this.then = this.now;
    return void 0;
  }

  /**
   * Main loop
   */
  loop() {

    this.update();

    if (this.running === false) return void 0;

    if (this.tick < 25) return void 0;

    this.thread(this.moveTick);

    this.tick = 0;

/*
    this.thread(this.spawnTick);
    this.thread(this.gamemodeTick);
    this.thread(this.cellUpdateTick);
*/

    return void 0;

  }

  animateNPC() {

    let cfg = game_cfg;

    let entity = "Joy";
    let move = [cfg.LEFT, cfg.RIGHT, cfg.UP, cfg.DOWN][(Math.random() * 3) << 0];

    let ii = 0;
    let length = this.users.length;

    for (; ii < length; ++ii) {
      //this.users[ii].packetHandler.socket.sendPacket(new Packet.Position(1337, move));
    };

  }

  moveTick() {

  }

  /**
   * Thread based function execution
   * @param {Function} func
   */
  thread(func) {
    setTimeout(this::func, 0);
    return void 0;
  }

}