import React, { useState, useRef, useEffect } from "react";
import { EditableNodeElement, NodeElement } from "../index.js";
import { collectInitialTexts } from "../utils/collectInitialTexts.js";
import { type InnerHtmlNode } from "../types/types.js";
import { generateStableId } from "../utils/generateStableId.js";

interface AnchorTextElementProps {
  innerHTML: string;
  onChange: (innerHTML: string) => void;
  indent?: number;
}

function parseHTML(html: string): InnerHtmlNode[] {
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

export function AnchorTextElement({
  innerHTML,
  onChange,
  indent = 0,
}: AnchorTextElementProps) {
  // Parse structure only once on mount
  const [parsedNodes] = useState<InnerHtmlNode[]>(() => parseHTML(innerHTML));

  // Track current text values separately from structure
  const [textValues, setTextValues] = useState<Map<string, string>>(() =>
    collectInitialTexts(parsedNodes)
  );

  const lastGeneratedHTMLRef = useRef<string>(innerHTML);

  // Only re-sync when innerHTML changes from external source
  useEffect(() => {
    if (innerHTML !== lastGeneratedHTMLRef.current) {
      const newTexts = collectInitialTexts(parseHTML(innerHTML));
      setTextValues(newTexts);
      lastGeneratedHTMLRef.current = innerHTML;
    }
  }, [innerHTML]);

  const updateText = (nodeId: string, value: string) => {
    // Update only the text map, not the node structure
    setTextValues((prev) => {
      const next = new Map(prev);
      next.set(nodeId, value);
      return next;
    });

    // Reconstruct HTML using current structure + new text value
    const reconstructHTML = (node: InnerHtmlNode): string => {
      if (node.type === "text") {
        // Use the new value if this is the node being updated
        return node.id === nodeId
          ? value
          : textValues.get(node.id) || node.textContent;
      }
      const childrenHTML = node.children.map(reconstructHTML).join("");
      return `<${node.tagName}>${childrenHTML}</${node.tagName}>`;
    };

    const newInnerHTML = parsedNodes.map(reconstructHTML).join("");
    lastGeneratedHTMLRef.current = newInnerHTML;
    onChange(newInnerHTML);
  };

  const renderNode = (node: InnerHtmlNode, depth: number): React.ReactNode => {
    const nodeIndent = indent + depth * 16;

    if (node.type === "text") {
      return (
        <EditableNodeElement
          key={node.id}
          label="text"
          value={textValues.get(node.id) || ""}
          onChange={(value) => updateText(node.id, value)}
          indent={nodeIndent}
        />
      );
    }

    return (
      <div key={node.id}>
        <NodeElement nodeName={node.tagName!} indent={nodeIndent} />
        {node.children.map((child) => renderNode(child, depth + 1))}
        {node.children.length > 0 && (
          <NodeElement nodeName={`/${node.tagName}`} indent={nodeIndent} />
        )}
      </div>
    );
  };

  return (
    <div>
      <div
        className="py-1 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        style={{ paddingLeft: `${indent}px` }}
      >
        <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
          Link text:
        </span>
      </div>
      {parsedNodes.map((node) => renderNode(node, 1))}
    </div>
  );
}
