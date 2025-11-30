import { type InnerHtmlNode } from "../types/types.js";

import { generateStableId } from "../utils/generateStableId.js";

export function parseHTML(html: string): InnerHtmlNode[] {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const traverse = (node: Node, path: number[]): InnerHtmlNode | null => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      // Skip empty or whitespace-only text nodes
      if (!text.trim()) return null;

      // Stable ID generator based on structure, not counter
      return {
        id: `text-${generateStableId(path)}`,
        type: "text",
        textContent: text,
        children: [],
      };
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const children: InnerHtmlNode[] = [];

      let childIndex = 0;
      Array.from(element.childNodes).forEach((child) => {
        const childNode = traverse(child, [...path, childIndex]);
        if (childNode) {
          children.push(childNode);
          childIndex++;
        }
      });

      return {
        id: `elem-${generateStableId(path)}`,
        type: "element",
        tagName: element.tagName.toLowerCase(),
        textContent: "",
        children,
      };
    }

    return null;
  };

  const nodes: InnerHtmlNode[] = [];
  let rootIndex = 0;
  Array.from(tempDiv.childNodes).forEach((child) => {
    const node = traverse(child, [rootIndex]);
    if (node) {
      nodes.push(node);
      rootIndex++;
    }
  });

  return nodes;
}
