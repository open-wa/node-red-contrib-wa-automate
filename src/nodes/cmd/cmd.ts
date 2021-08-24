import { Client } from "@open-wa/wa-automate-types-only";
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

    RED.httpAdmin.get("/node_red_init_call", (req, res) => {
      this.server = RED.nodes.getNode(config.server) as OwaServerNode;
      if(!this.server?.client.socket){
        return "Please set a server first!"
      }
      this.server?.client.socket.emit("node_red_init_call",(data:unknown)=>res.json(data))
    })
    
    this.on("input", (msg, send, done) => {
      const m = msg as {
        method?: string,
        args?: {
          [k: string]: boolean | string | number
        }
      }
      if (config.server)
        this.server = RED.nodes.getNode(config.server) as OwaServerNode;
      const executeCommand = () => this.server?.client.ask((m.method || this.method) as keyof Client, m.args || this.args).then(payload => send({
        payload
      })).then(()=>this.status({ fill: 'green', shape: 'dot', text: 'Done' }))
      if (this.server && this.server.client) {
        this.status({ fill: 'yellow', shape: 'ring', text: 'Executing..' });
        if (this.server.clientSocket.connected) {
          executeCommand()
        } else {
          this.status({ fill: 'red', shape: 'ring', text: 'Waiting for socket connection..' });
          this.server.addListener("connected", () => {
            executeCommand()
          });
        }
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
