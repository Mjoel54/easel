export interface HtmlNode {
  id: string;
  tagName: string;
  textContent: string;
  isTextNode: boolean;
  attributes: { [key: string]: string };
  children: HtmlNode[];
  originalNode: Node;
}
