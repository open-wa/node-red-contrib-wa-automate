import { NodeInitializer } from "node-red";
import { CmdNode, CmdNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  function CmdNodeConstructor(
    this: CmdNode,
    config: CmdNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    this.on("input", (msg, send, done) => {
      send(msg);
      done();
    });
  }

  RED.nodes.registerType("cmd", CmdNodeConstructor);
};

export = nodeInit;
