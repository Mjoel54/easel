import { type InnerHtmlNode } from "../types/types.js";

export function collectInitialTexts(
  nodes: InnerHtmlNode[]
): Map<string, string> {
  const texts = new Map<string, string>();

  const collect = (node: InnerHtmlNode) => {
    if (node.type === "text") {
      texts.set(node.id, node.textContent);
    }
    node.children.forEach(collect);
  };

  nodes.forEach(collect);
  return texts;
}
