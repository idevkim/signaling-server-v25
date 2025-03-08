"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var websocket = require("ws");
var handler = require("./class/websockethandler");
var WSSignaling = /** @class */ (function () {
    function WSSignaling(server, mode) {
        var _this = this;
        this.server = server;
        this.wss = new websocket.Server({ server: server });
        handler.reset(mode);
        this.wss.on('connection', function (ws) {
            handler.add(ws);
            ws.onclose = function () {
                handler.remove(ws);
            };
            ws.onmessage = function (event) {
                // type: connect, disconnect JSON Schema
                // connectionId: connect or disconnect connectionId
                // type: offer, answer, candidate JSON Schema
                // from: from connection id
                // to: to connection id
                // data: any message data structure
                var msg = JSON.parse(event.data);
                if (!msg || !_this) {
                    return;
                }
                var connectionId = "unknow!!!!";
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
                console.log("websocket.ts => ws.onmessage => ".concat(msg.type, " : ").concat(connectionId));
                // console.log(msg);//idevkim sdp너무길어 생략..
                // console.log(`websocket.ts => ${msg.type} : ${msg.connectionId} : ${msg.who}`);
            };
        });
    }
    return WSSignaling;
}());
exports.default = WSSignaling;
//# sourceMappingURL=websocket.js.map