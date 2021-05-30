import { NodeInitializer } from "node-red";
import { ListenNode, ListenNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  function ListenNodeConstructor(
    this: ListenNode,
    config: ListenNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    
        // Retrieve the config node
        if(config.server)
        this.server = RED.nodes.getNode(config.server);

        if (this.server) {
            // Do something with:
            //  this.server.host
            //  this.server.port
        } else {
            // No config node configured
        }



    this.on("input", (msg, send, done) => {
      send(msg);
      done();
    });
  }

  RED.nodes.registerType("listen", ListenNodeConstructor);
};

export = nodeInit;
