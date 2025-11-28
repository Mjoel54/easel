import React from "react";
import { type HtmlNode } from "./types";
import { EditableField } from "./EditableField";

interface NodeRendererProps {
  node: HtmlNode;
  editedTexts: { [key: string]: string };
  editedAttributes: { [key: string]: { [attr: string]: string } };
  updateText: (id: string, value: string) => void;
  updateAttribute: (id: string, attr: string, value: string) => void;
  depth?: number;
}

export const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  editedTexts,
  editedAttributes,
  updateText,
  updateAttribute,
  depth = 0,
}) => {
  const indent = depth * 8;

  // Special handling for anchor tags
  if (node.tagName === "a") {
    const textChild = node.children.find((child) => child.isTextNode);
    const href = editedAttributes[node.id]?.href || node.attributes.href || "";
    const text = textChild
      ? editedTexts[textChild.id] || textChild.textContent
      : "";

    return (
      <div key={node.id}>
        <div
          className="py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          style={{ paddingLeft: `${indent}px` }}
        >
          <span className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400">
            &lt;{node.tagName}&gt;
          </span>
        </div>

        {/* Link Text Field */}
        {textChild && (
          <EditableField
            label="Link Text"
            value={text}
            onChange={(value) => updateText(textChild.id, value)}
            indent={indent + 16}
            type="input"
            labelStyle="default"
          />
        )}

        {/* Link URL Field */}
        <EditableField
          label="Link URL"
          value={href}
          onChange={(value) => updateAttribute(node.id, "href", value)}
          indent={indent + 16}
          type="input"
          labelStyle="default"
        />

        <div
          className="py-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          style={{ paddingLeft: `${indent}px` }}
        >
          <span className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400">
            &lt;/{node.tagName}&gt;
          </span>
        </div>
      </div>
    );
  }

  // Handling for text nodes
  if (node.isTextNode) {
    const text = editedTexts[node.id] || "";

    return (
      <EditableField
        key={node.id}
        label="text"
        value={text}
        onChange={(value) => updateText(node.id, value)}
        indent={indent}
        type="textarea"
        labelStyle="mono"
      />
    );
  }

  // General rendering for other tags
  return (
    <div key={node.id}>
      <div
        className="py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        style={{ paddingLeft: `${indent}px` }}
      >
        <span className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400">
          &lt;{node.tagName}&gt;
        </span>
      </div>
      {node.children.map((child) => (
        <NodeRenderer
          key={child.id}
          node={child}
          editedTexts={editedTexts}
          editedAttributes={editedAttributes}
          updateText={updateText}
          updateAttribute={updateAttribute}
          depth={depth + 1}
        />
      ))}
      {node.children.length > 0 && (
        <div
          className="py-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
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
