import * as cfg from "../config";

import GameServer from "./GameServer";

let server = new GameServer();

process.title = cfg.TITLE;

console.log("\x1b[32;1mStarting new server...\x1b[0m");