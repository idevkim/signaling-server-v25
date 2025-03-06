import * as websocket from "ws";
import { Server } from 'http';
import * as handler from "./class/websockethandler";

export default class WSSignaling {
  server: Server;
  wss: websocket.Server;

  constructor(server: Server, mode: string) {
    this.server = server;
    this.wss = new websocket.Server({ server });
    handler.reset(mode);

    this.wss.on('connection', (ws: WebSocket) => {

      handler.add(ws);

      ws.onclose = (): void => {
        handler.remove(ws);
      };

      ws.onmessage = (event: MessageEvent): void => {

        // type: connect, disconnect JSON Schema
        // connectionId: connect or disconnect connectionId

        // type: offer, answer, candidate JSON Schema
        // from: from connection id
        // to: to connection id
        // data: any message data structure

        const msg = JSON.parse(event.data);
        if (!msg || !this) {
          return;
        }
        let connectionId = "unknow!!!!"
        switch (msg.type) {
          case "reqAvatarList":
            handler.onReqAvatarList(ws);
            break;
          case "connect":
            connectionId = msg.connectionId;
            handler.onConnect(ws, msg.connectionId);
            break;
          case "disconnect":
            connectionId = msg.connectionId;
            handler.onDisconnect(ws, msg.connectionId);
            break;
          case "offer":
            connectionId = msg.data.connectionId;
            handler.onOffer(ws, msg.data);
            break;
          case "answer":
            connectionId = msg.data.connectionId;
            handler.onAnswer(ws, msg.data);
            break;
          case "candidate":
            connectionId = msg.data.connectionId;
            handler.onCandidate(ws, msg.data);
            break;
          default:
            break;
        }

        console.log(`websocket.ts => ws.onmessage => ${msg.type} : ${connectionId}`);
        // console.log(msg);//idevkim sdp너무길어 생략..
        // console.log(`websocket.ts => ${msg.type} : ${msg.connectionId} : ${msg.who}`);
      };
    });
  }
}
