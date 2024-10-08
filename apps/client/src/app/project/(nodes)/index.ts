import { NicknameNode } from "./_nickname";
import { PhoneNumberNode } from "./_phone";
import { TextNode } from "./_text";

export const nodeTypes = {
  default: TextNode,
  phone: PhoneNumberNode,
  nickname: NicknameNode,
};
