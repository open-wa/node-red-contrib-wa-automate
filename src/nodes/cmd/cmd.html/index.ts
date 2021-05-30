import { EditorRED } from "node-red";
import { CmdEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<CmdEditorNodeProperties>("cmd", {
  category: "wa",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
    server: { value: "", type: "owa-server" },
  },
  inputs: 1,
  icon: "file.png",
  paletteLabel: "cmd",
  label: function () {
    return this.name || "cmd";
  },
});
