import React, { useState, useRef, useEffect } from "react";
import { EditableField, ElementNodeName } from "./index.js";

interface InnerHtmlNode {
  id: string;
  type: "element" | "text";
  tagName?: string;
  textContent: string;
  children: InnerHtmlNode[];
}

interface EditableLinkTextProps {
  innerHTML: string;
  onChange: (innerHTML: string) => void;
  indent?: number;
}

// Stable ID generator based on structure, not counter
function generateStableId(path: number[]): string {
  return path.join("-");
}

function parseHTML(html: string): InnerHtmlNode[] {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const traverse = (node: Node, path: number[]): InnerHtmlNode | null => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      // Skip empty or whitespace-only text nodes
      if (!text.trim()) return null;

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

function collectInitialTexts(nodes: InnerHtmlNode[]): Map<string, string> {
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

export default function EditableLinkText({
  innerHTML,
  onChange,
  indent = 0,
}: EditableLinkTextProps) {
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
        <EditableField
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
        <ElementNodeName nodeName={node.tagName!} indent={nodeIndent} />
        {node.children.map((child) => renderNode(child, depth + 1))}
        {node.children.length > 0 && (
          <ElementNodeName nodeName={`/${node.tagName}`} indent={nodeIndent} />
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

// const labelClassName =
//   "text-md font-mono font-semibold text-blue-600 dark:text-blue-400";

// const inputClassName =
//   "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

// const rows =
//   type === "textarea" ? Math.max(1, Math.ceil(value.length / 80)) : undefined;

// return (
//   <div className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"></div>
