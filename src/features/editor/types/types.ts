export interface HtmlNode {
  id: string;
  tagName: string;
  textContent: string;
  isTextNode: boolean;
  attributes: { [key: string]: string };
  children: HtmlNode[];
  originalNode: Node;
}

export interface InnerHtmlNode {
  id: string;
  type: "element" | "text";
  tagName?: string;
  textContent: string;
  children: InnerHtmlNode[];
}
