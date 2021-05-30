import { OwaServerNode } from './../owa-server/modules/types';
import { NodeInitializer } from "node-red";
import { ListenNode, ListenNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  function ListenNodeConstructor(
    this: ListenNode,
    config: ListenNodeDef
  ): void {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    this.listener = config.listener;
        if(config.server)
        this.server = RED.nodes.getNode(config.server) as OwaServerNode;
        if (this.server) {
          this.server.getSocket().then(socket => {
            if(socket) {
              socket.listen(this.listener,(message)=>{
                this.send({
                  payload: message
                });
              })
            } else {
              this.error("socket connection not established!")
            }
          })
        } else {
            // No config node configured
            this.error("No Server!")
        }
  }

  RED.nodes.registerType("listen", ListenNodeConstructor);
};

export = nodeInit;
