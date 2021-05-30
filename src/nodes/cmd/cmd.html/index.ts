import { EditorRED } from "node-red";
import { CmdEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<CmdEditorNodeProperties>("cmd", {
  category: "wa",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
    server: { value: "", type: "owa-server" },
    method: { value: "" },
    args: { value: {} },
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "cmd",
  label: function () {
    return this.name || this.method || "cmd";
  },
  oneditprepare: function(){
    $("#node-input-args").typedInput({
      types:["json"]
  })
  }
});
