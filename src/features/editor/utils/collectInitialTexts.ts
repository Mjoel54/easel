import { type HtmlNode } from "../types/types.js";

export function collectInitialTexts(nodes: HtmlNode[]): Map<string, string> {
  const texts = new Map<string, string>();

  const collect = (node: HtmlNode) => {
    if (node.isTextNode) {
      texts.set(node.id, node.textContent);
    }
    node.children.forEach(collect);
  };

  nodes.forEach(collect);
  return texts;
}
