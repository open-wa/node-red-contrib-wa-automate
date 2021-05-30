import { ServerSubscriber } from '../../shared/types';
import { Node, NodeDef } from "node-red";
import { ListenOptions } from "../shared/types";

export interface ListenNodeDef extends NodeDef, ListenOptions, ServerSubscriber {}

// export interface ListenNode extends Node {}
export type ListenNode = Node & {
    server?: Node
};
