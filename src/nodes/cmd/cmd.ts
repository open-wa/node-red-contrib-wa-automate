import { Client } from "@open-wa/wa-automate";
import { NodeInitializer } from "node-red";
import { OwaServerNode } from "../owa-server/modules/types";
import { CmdNode, CmdNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  function CmdNodeConstructor(
    this: CmdNode,
    config: CmdNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    this.name = config.name;
    this.method = config.method;
    this.args = config.args;

    this.on("input", (msg, send, done) => {
      const m = msg as {
        method?: string,
        args ?: {
          [k: string] : boolean | string | number
        }
      }
      send(msg);
      if(config.server)
      this.server = RED.nodes.getNode(config.server) as OwaServerNode;
      if (this.server) {
        this.server.getSocket().then(async socket => {
          if(socket) {
            send({
              payload: await socket.ask((m.method || this.method) as keyof Client, m.args || this.args)
            })
          } else {
            this.error("socket connection not established!")
          }
        })
      } else {
          // No config node configured
          this.error("No Server!")
      }

      done();
    });
  }

  RED.nodes.registerType("cmd", CmdNodeConstructor);
};

export = nodeInit;
