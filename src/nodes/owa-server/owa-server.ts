import { SocketClient } from "@open-wa/wa-automate";
import { NodeInitializer } from "node-red";
import { OwaServerNode, OwaServerNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = async (RED): Promise<void> => {
  function OwaServerNodeConstructor(
    this: OwaServerNode,
    config: OwaServerNodeDef
  ): void {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    this.url = config.url;
    this.key = config.key;
    this.getSocket = async () => {
      if (!this.socket) {
        if (this.url) {
          this.socket = await SocketClient.connect(this.url, this.key)
        }
      }
      return this.socket
    }
  }

  RED.nodes.registerType("owa-server", OwaServerNodeConstructor);
};

export = nodeInit;
