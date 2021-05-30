import { Node, NodeDef } from "node-red";
import { CmdOptions } from "../shared/types";

export interface CmdNodeDef extends NodeDef, CmdOptions {}

// export interface CmdNode extends Node {}
export type CmdNode = Node;
