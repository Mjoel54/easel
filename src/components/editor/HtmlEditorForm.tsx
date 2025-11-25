import React, { useState } from "react";
import { SubmitButton } from "../forms/index.js";

interface HtmlNode {
  id: string;
  tagName: string;
  textContent: string;
  isTextNode: boolean;
  attributes: { [key: string]: string };
  children: HtmlNode[];
  originalNode: Node;
}

interface HtmlEditorFormProps {
  onGenerate: (html: string) => void;
}

export const HtmlEditorForm: React.FC<HtmlEditorFormProps> = ({
  onGenerate,
}) => {
  const [htmlInput, setHtmlInput] = useState("");
  const [parsedNodes, setParsedNodes] = useState<HtmlNode[]>([]);
  const [editedTexts, setEditedTexts] = useState<{ [key: string]: string }>({});

  const parseHtmlToNodes = (html: string): HtmlNode[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    let idCounter = 0;

    const traverse = (node: Node): HtmlNode | null => {
      // Skip empty text nodes
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

        // Capture all attributes
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

  const handleParse = () => {
    const nodes = parseHtmlToNodes(htmlInput);
    setParsedNodes(nodes);

    // Initialize edited texts with original values
    const texts: { [key: string]: string } = {};
    const collectTexts = (node: HtmlNode) => {
      if (node.isTextNode) {
        texts[node.id] = node.textContent;
      }
      node.children.forEach(collectTexts);
    };
    nodes.forEach(collectTexts);
    setEditedTexts(texts);
  };

  const reconstructHtml = (node: HtmlNode): string => {
    if (node.isTextNode) {
      return editedTexts[node.id] || node.textContent;
    }

    const attrs = Object.entries(node.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    const openTag = attrs ? `<${node.tagName} ${attrs}>` : `<${node.tagName}>`;
    const closeTag = `</${node.tagName}>`;
    const childrenHtml = node.children.map(reconstructHtml).join("");

    return `${openTag}${childrenHtml}${closeTag}`;
  };

  const handleExport = () => {
    const html = parsedNodes.map(reconstructHtml).join("");
    onGenerate(html);
  };

  const updateText = (id: string, value: string) => {
    setEditedTexts((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const renderNode = (node: HtmlNode, depth: number = 0): React.JSX.Element => {
    const indent = depth * 24;

    if (node.isTextNode) {
      return (
        <div
          key={node.id}
          className="flex items-start gap-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          style={{ paddingLeft: `${indent}px` }}
        >
          <div className="flex-shrink-0 w-32 pt-2">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
              text
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={editedTexts[node.id] || ""}
              onChange={(e) => updateText(node.id, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      );
    }

    return (
      <div key={node.id}>
        <div
          className="py-2 border-l-2 border-transparent hover:border-blue-500 transition-colors"
          style={{ paddingLeft: `${indent}px` }}
        >
          <span className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400">
            &lt;{node.tagName}&gt;
          </span>
          {Object.keys(node.attributes).length > 0 && (
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              {Object.keys(node.attributes).length} attribute(s)
            </span>
          )}
        </div>
        {node.children.map((child) => renderNode(child, depth + 1))}
        {node.children.length > 0 && (
          <div
            className="py-1"
            style={{ paddingLeft: `${indent}px` }}
          >
            <span className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400">
              &lt;/{node.tagName}&gt;
            </span>
          </div>
        )}
      </div>
    );
  };

  const handleParseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleParse();
  };

  const handleExportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExport();
  };

  return (
    <div className="space-y-6">
      {parsedNodes.length === 0 ? (
        <form onSubmit={handleParseSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="html-input"
              className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >
              Paste Your HTML
            </label>
            <textarea
              id="html-input"
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="Paste your HTML content here..."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
          </div>
          <SubmitButton disabled={!htmlInput.trim()}>
            Parse HTML
          </SubmitButton>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Your Content
            </h3>
            <button
              onClick={() => {
                setParsedNodes([]);
                setEditedTexts({});
                setHtmlInput("");
              }}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Start Over
            </button>
          </div>

          <div className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-600">
              <div className="flex gap-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                <div className="w-32">HTML Tag</div>
                <div className="flex-1">Editable Text Content</div>
              </div>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              {parsedNodes.map((node) => renderNode(node))}
            </div>
          </div>

          <form onSubmit={handleExportSubmit}>
            <SubmitButton>Export Edited HTML</SubmitButton>
          </form>
        </div>
      )}
    </div>
  );
};
