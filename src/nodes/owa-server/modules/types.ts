import { SocketClient } from '@open-wa/wa-automate';
import { EasyAPIServer } from './../../shared/types';
import { Node, NodeDef } from "node-red";
import { OwaServerOptions } from "../shared/types";

export interface OwaServerNodeDef extends NodeDef, OwaServerOptions, EasyAPIServer {}

// export interface OwaServerNode extends Node {}
export type OwaServerNode = Node & EasyAPIServer & {
    socket ?: SocketClient,
    getSocket : () => Promise<SocketClient | undefined>
};
