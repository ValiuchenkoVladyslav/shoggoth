import { country } from "./country";
import { nickname } from "./nickname";
import { phone } from "./phone/node";
import { text } from "./text";

export const nodeTypes = {
  default: text.graphNode,
  phone: phone.graphNode,
  nickname: nickname.graphNode,
  country: country.graphNode,
};
