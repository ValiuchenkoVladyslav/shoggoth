import type { Text, Url } from "~/gen/core";
import { post } from "./lib";

const addUrlId = "shoggoth:add-url";
const addTextId = "shoggoth:add-text";

browser.contextMenus.create({
  id: addUrlId,
  title: "Send link to Shoggoth",
  contexts: ["link"],
});
browser.contextMenus.create({
  id: addTextId,
  title: "Send text to Shoggoth",
  contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === addUrlId && info.linkUrl) {
    post<Url>("add-url", { url: info.linkUrl });
  }

  if (info.menuItemId === addTextId && info.selectionText) {
    post<Text>("add-text", { text: info.selectionText });
  }
});
