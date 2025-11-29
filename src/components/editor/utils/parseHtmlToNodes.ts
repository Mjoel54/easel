import { type HtmlNode } from "../types/types.js";

export const parseHtmlToNodes = (html: string): HtmlNode[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  let idCounter = 0;

  const traverse = (node: Node): HtmlNode | null => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim() || "";
      if (text) {
        return {
          id: `node-${idCounter++}`,
          tagName: "text",
          textContent: text,
          isTextNode: true,
          attributes: {},
          children: [],
          originalNode: node,
        };
      }
      return null;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const attributes: { [key: string]: string } = {};

      for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        attributes[attr.name] = attr.value;
      }

      const children: HtmlNode[] = [];
      node.childNodes.forEach((child) => {
        const childNode = traverse(child);
        if (childNode) {
          children.push(childNode);
        }
      });

      return {
        id: `node-${idCounter++}`,
        tagName: element.tagName.toLowerCase(),
        textContent: "",
        isTextNode: false,
        attributes,
        children,
        originalNode: node,
      };
    }

    return null;
  };

  const nodes: HtmlNode[] = [];
  doc.body.childNodes.forEach((child) => {
    const node = traverse(child);
    if (node) {
      nodes.push(node);
    }
  });

  return nodes;
};
