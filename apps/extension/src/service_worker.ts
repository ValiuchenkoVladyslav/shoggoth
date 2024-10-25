import type { Nickname, Text, Url } from "~/gen/core";
import { post } from "./lib";

const addUrlId = "shoggoth:add-url";
const addTextId = "shoggoth:add-text";
const addNicknameId = "shoggoth:add-nickname";

browser.contextMenus.create({
  id: addUrlId,
  title: "Send Link to Shoggoth",
  contexts: ["link"],
});
browser.contextMenus.create({
  id: addTextId,
  title: "Send Text to Shoggoth",
  contexts: ["selection"],
});
browser.contextMenus.create({
  id: addNicknameId,
  title: "Send Nickname to Shoggoth",
  contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === addUrlId && info.linkUrl) {
    post<Url>("add-url", { url: info.linkUrl });
  }

  if (info.selectionText) {
    if (info.menuItemId === addTextId) {
      post<Text>("add-text", { text: info.selectionText });
    }

    if (info.menuItemId === addNicknameId) {
      post<Nickname>("add-nickname", { nickname: info.selectionText });
    }
  }
});
