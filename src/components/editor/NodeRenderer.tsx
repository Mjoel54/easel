import { type HtmlNode } from "./types";
import {
  EditableLinkUrl,
  EditableLinkText,
  ElementNodeName,
  EditableField,
} from "./index";

interface NodeRendererProps {
  node: HtmlNode;
  editedTexts: { [key: string]: string };
  editedAttributes: { [key: string]: { [attr: string]: string } };
  updateText: (id: string, value: string) => void;
  updateAttribute: (id: string, attr: string, value: string) => void;
  depth?: number;
}

export default function NodeRenderer({
  node,
  editedTexts,
  editedAttributes,
  updateText,
  updateAttribute,
  depth = 0,
}: NodeRendererProps) {
  const indent = depth * 8;

  // Special handling for anchor tags
  if (node.tagName === "a") {
    const href = editedAttributes[node.id]?.href || node.attributes.href || "";

    // Get the innerHTML from the original node, or use edited version
    // This preserves nested HTML like <strong>, <em>, <span>
    const getInnerHTML = () => {
      if (editedTexts[node.id] !== undefined) {
        return editedTexts[node.id];
      }
      if (node.originalNode && node.originalNode instanceof Element) {
        return node.originalNode.innerHTML;
      }
      return node.textContent;
    };

    const innerHTML = getInnerHTML();

    return (
      <div key={node.id}>
        <ElementNodeName nodeName={node.tagName} indent={indent} />

        <EditableLinkText
          innerHTML={innerHTML}
          onChange={(value) => updateText(node.id, value)}
          indent={indent + 16}
        />

        <EditableLinkUrl
          value={href}
          onChange={(value) => updateAttribute(node.id, "href", value)}
          indent={indent + 16}
        />

        <ElementNodeName nodeName={`/${node.tagName}`} indent={indent} />
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
      />
    );
  }

  // General rendering for other tags
  return (
    <div key={node.id}>
      <ElementNodeName nodeName={node.tagName} indent={indent} />

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
        <ElementNodeName nodeName={`/${node.tagName}`} indent={indent} />
      )}
    </div>
  );
}
