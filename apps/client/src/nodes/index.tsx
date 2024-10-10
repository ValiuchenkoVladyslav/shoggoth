import { CountryNode } from "./country";
import { NicknameNode } from "./nickname";
import { PhoneNumberNode } from "./phone";
import { TextNode } from "./text";

export const nodeTypes = {
  default: TextNode,
  phone: PhoneNumberNode,
  nickname: NicknameNode,
  country: CountryNode,
};