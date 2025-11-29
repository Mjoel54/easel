import React, { useState } from "react";
import { SubmitButton } from "../forms/index.js";
import { NodeElementList } from "./index.js";
import { type HtmlNode } from "./types/types.js";
import { parseHtmlToNodes } from "./utils/parseHtmlToNodes.js";
import { voidElements } from "./utils/voidElements.js";

interface HtmlEditorFormProps {
  onGenerate: (html: string) => void;
}

export const HtmlEditorForm: React.FC<HtmlEditorFormProps> = ({
  onGenerate,
}) => {
  const [htmlInput, setHtmlInput] = useState("");
  const [parsedNodes, setParsedNodes] = useState<HtmlNode[]>([]);
  const [editedTexts, setEditedTexts] = useState<{ [key: string]: string }>({});
  const [editedAttributes, setEditedAttributes] = useState<{
    [key: string]: { [attr: string]: string };
  }>({});

  const nodes = parseHtmlToNodes(htmlInput);

  const handleParse = () => {
    setParsedNodes(nodes);

    const texts: { [key: string]: string } = {};
    const attributes: { [key: string]: { [attr: string]: string } } = {};

    const collectTexts = (node: HtmlNode) => {
      if (node.isTextNode) {
        texts[node.id] = node.textContent;
      }
      if (node.tagName === "a") {
        // Store the innerHTML for anchor tags to preserve nested HTML
        if (node.originalNode && node.originalNode instanceof Element) {
          texts[node.id] = node.originalNode.innerHTML;
        }
        if (node.attributes.href) {
          attributes[node.id] = { href: node.attributes.href };
        }
        // Don't traverse children for anchor tags since we're storing innerHTML
        return;
      }
      node.children.forEach(collectTexts);
    };
    nodes.forEach(collectTexts);
    setEditedTexts(texts);
    setEditedAttributes(attributes);
  };

  const reconstructHtml = (node: HtmlNode): string => {
    if (node.isTextNode) {
      return editedTexts[node.id] || node.textContent;
    }

    const finalAttributes = editedAttributes[node.id]
      ? { ...node.attributes, ...editedAttributes[node.id] }
      : node.attributes;

    const attrs = Object.entries(finalAttributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    const openTag = attrs ? `<${node.tagName} ${attrs}>` : `<${node.tagName}>`;
    const closeTag = `</${node.tagName}>`;

    // Special handling for anchor tags: use stored innerHTML instead of reconstructing from children
    if (node.tagName === "a" && editedTexts[node.id] !== undefined) {
      return `${openTag}${editedTexts[node.id]}${closeTag}`;
    }

    if (voidElements.includes(node.tagName)) {
      return openTag;
    }

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

  const updateAttribute = (id: string, attr: string, value: string) => {
    setEditedAttributes((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [attr]: value,
      },
    }));
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
              rows={24}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
          </div>
          <SubmitButton disabled={!htmlInput.trim()}>Parse HTML</SubmitButton>
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
                setEditedAttributes({});
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
            <div className="max-h-[600px] overflow-y-auto">
              {parsedNodes.map((node) => (
                <NodeElementList
                  key={node.id}
                  node={node}
                  editedTexts={editedTexts}
                  editedAttributes={editedAttributes}
                  updateText={updateText}
                  updateAttribute={updateAttribute}
                />
              ))}
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
