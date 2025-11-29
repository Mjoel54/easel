import { type HtmlNode } from "../types/types.js";
import {
  AnchorUrlElement,
  AnchorTextElement,
  NodeElement,
  EditableNodeElement,
} from "../index";
import { getInnerHTML } from "../utils/index.js";

interface NodeElementListProps {
  node: HtmlNode;
  editedTexts: { [key: string]: string };
  editedAttributes: { [key: string]: { [attr: string]: string } };
  updateText: (id: string, value: string) => void;
  updateAttribute: (id: string, attr: string, value: string) => void;
  depth?: number;
}

export function NodeElementList({
  node,
  editedTexts,
  editedAttributes,
  updateText,
  updateAttribute,
  depth = 0,
}: NodeElementListProps) {
  const indent = depth * 8;

  // Special handling for anchor tags
  if (node.tagName === "a") {
    const href = editedAttributes[node.id]?.href || node.attributes.href || "";

    // Get the innerHTML from the original node, or use edited version
    // This preserves nested HTML like <strong>, <em>, <span>

    const innerHTML = getInnerHTML(node, editedTexts);

    return (
      <div key={node.id}>
        <NodeElement nodeName={node.tagName} indent={indent} />

        <AnchorTextElement
          innerHTML={innerHTML}
          onChange={(value) => updateText(node.id, value)}
          indent={indent + 16}
        />

        <AnchorUrlElement
          value={href}
          onChange={(value) => updateAttribute(node.id, "href", value)}
          indent={indent + 16}
        />

        <NodeElement nodeName={`/${node.tagName}`} indent={indent} />
      </div>
    );
  }

  // Handling for text nodes
  if (node.isTextNode) {
    const text = editedTexts[node.id] || "";

    return (
      <EditableNodeElement
        key={node.id}
        label="text"
        value={text}
        onChange={(value) => updateText(node.id, value)}
        indent={indent}
        type="textarea"
      />
    );
  }

  // General rendering for other tags
  return (
    <div key={node.id}>
      <NodeElement nodeName={node.tagName} indent={indent} />

      {node.children.map((child) => (
        <NodeElementList
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
        <NodeElement nodeName={`/${node.tagName}`} indent={indent} />
      )}
    </div>
  );
}
