// import { type InnerHtmlNode } from "../types/types.js";
import { type HtmlNode } from "../types/types.js";

export function collectInitialTexts(
  // nodes: InnerHtmlNode[]
  nodes: HtmlNode[]
): Map<string, string> {
  const texts = new Map<string, string>();

  // const collect = (node: InnerHtmlNode) => {
  const collect = (node: HtmlNode) => {
    // if (node.type === "text") {
    if (node.isTextNode) {
      texts.set(node.id, node.textContent);
    }
    node.children.forEach(collect);
  };

  nodes.forEach(collect);
  return texts;
}
