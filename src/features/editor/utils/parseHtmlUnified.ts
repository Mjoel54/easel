import { type HtmlNode } from "../types/types.js";
import { generateStableId } from "./generateStableId.js";

export interface ParseHtmlOptions {
  /**
   * ID generation strategy:
   * - 'path': Generates stable, structure-based IDs like "text-0-1-2" (stable across re-parses)
   * - 'counter': Generates simple sequential IDs like "node-0", "node-1" (not stable)
   */
  idStrategy?: "path" | "counter";
}

/**
 * Unified HTML parser that handles both use cases:
 * 1. Parsing incoming HTML documents (with attributes, originalNode)
 * 2. Parsing anchor innerHTML with nested formatting tags (em, strong, span)
 *
 * @param html - HTML string to parse
 * @param options - Configuration options for parsing behavior
 * @returns Array of parsed HtmlNode objects representing the HTML structure
 *
 * @example
 * // For EditorForm (main document parsing with counter IDs):
 * const nodes = parseHtmlUnified(htmlInput, { idStrategy: 'counter' });
 *
 * @example
 * // For AnchorTextElement (anchor innerHTML with stable path IDs):
 * const nodes = parseHtmlUnified(innerHTML, { idStrategy: 'path' });
 */
export function parseHtmlUnified(
  html: string,
  options: ParseHtmlOptions = {}
): HtmlNode[] {
  const { idStrategy = "path" } = options;

  // Create DOM parser based on strategy
  let container: Element;
  if (idStrategy === "counter") {
    // Use DOMParser for full document parsing (EditorForm use case)
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    container = doc.body;
  } else {
    // Use createElement for fragment parsing (AnchorTextElement use case)
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    container = tempDiv;
  }

  // ID counter for counter-based strategy
  let idCounter = 0;

  /**
   * Recursively traverse DOM nodes and build HtmlNode tree
   */
  const traverse = (node: Node, path: number[]): HtmlNode | null => {
    // Handle text nodes
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      // Skip empty or whitespace-only text nodes
      if (!text.trim()) return null;

      // Generate ID based on strategy
      const id =
        idStrategy === "path"
          ? `text-${generateStableId(path)}`
          : `node-${idCounter++}`;

      return {
        id,
        tagName: "text",
        textContent: text.trim(),
        isTextNode: true,
        attributes: {},
        children: [],
        originalNode: node,
      };
    }

    // Handle element nodes
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;

      // Extract attributes
      const attributes: { [key: string]: string } = {};
      for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        attributes[attr.name] = attr.value;
      }

      // Process children
      const children: HtmlNode[] = [];
      let childIndex = 0;

      Array.from(element.childNodes).forEach((child) => {
        const childNode = traverse(child, [...path, childIndex]);
        if (childNode) {
          children.push(childNode);
          childIndex++;
        }
      });

      // Generate ID based on strategy
      const id =
        idStrategy === "path"
          ? `elem-${generateStableId(path)}`
          : `node-${idCounter++}`;

      return {
        id,
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

  // Parse top-level nodes
  const nodes: HtmlNode[] = [];
  let rootIndex = 0;

  Array.from(container.childNodes).forEach((child) => {
    const node = traverse(child, [rootIndex]);
    if (node) {
      nodes.push(node);
      rootIndex++;
    }
  });

  return nodes;
}
