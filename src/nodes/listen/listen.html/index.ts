import { EditorRED } from "node-red";
import { ListenEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<ListenEditorNodeProperties>("listen", {
  category: "wa",
  paletteLabel: "Listen",
  color: "#AAAA66",
  defaults: {
    name: { value: "" },
    server: { value: "", type: "owa-server" },
    listener: { value: "onMessage" },
  },
  outputs: 1,
  icon: "arrow-in.svg",
  label: function () {
    return this.name || this.listener || "listen";
  },
  oneditprepare: function () {
    const options = [
      "onMessage",
      "onAnyMessage",
      "onMessageDeleted",
      "onAck",
      "onAddedToGroup",
      "onChatDeleted",
      "onBattery",
      "onChatOpened",
      "onIncomingCall",
      "onGlobalParticipantsChanged",
      "onChatState",
      "onLogout",
      "onPlugged",
      "onStateChanged",
      "onStory",
      "onRemovedFromGroup",
      "onContactAdded"
    ];
    options.map((option) =>
      $("#node-input-listener").append(
        new Option(option, option, undefined, option === this.listener)
      )
    );
  },
});
