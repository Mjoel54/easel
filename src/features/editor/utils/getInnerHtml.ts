import type { HtmlNode } from "../types/types";

export function getInnerHTML(
  node: HtmlNode,
  editedTexts: { [key: string]: string }
) {
  if (editedTexts[node.id] !== undefined) {
    return editedTexts[node.id];
  }
  if (node.originalNode && node.originalNode instanceof Element) {
    return node.originalNode.innerHTML;
  }
  return node.textContent;
}
