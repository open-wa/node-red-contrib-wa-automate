import { EditorRED } from "node-red";
import { ListenEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<ListenEditorNodeProperties>("listen", {
  category: "wa",
  paletteLabel: "Listen",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
    server: { value: "", type: "owa-server" },
  },
  outputs: 1,
  icon: "file.png",
  label: function () {
    return this.name || "listen";
  },
});
