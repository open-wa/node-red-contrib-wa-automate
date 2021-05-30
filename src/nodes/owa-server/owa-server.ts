import { SocketClient } from "@open-wa/wa-automate";
import { NodeInitializer } from "node-red";
import { OwaServerNode, OwaServerNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  async function OwaServerNodeConstructor(
    this: OwaServerNode,
    config: OwaServerNodeDef
  ): Promise<void> {
    console.log("🚀 ~ file: owa-server.ts ~ line 9 ~ config", config)
    RED.nodes.createNode(this, config);
    this.name = config.name;
    this.url = config.url;
    this.key = config.key;
    this.socket = await SocketClient.connect(this.url, this.key)
  }

  RED.nodes.registerType("owa-server", OwaServerNodeConstructor);
};

export = nodeInit;
