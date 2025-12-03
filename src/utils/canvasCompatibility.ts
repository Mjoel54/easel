export const CANVAS_ALLOWED_CSS_PROPERTIES = new Set([
  "background",
  "border",
  "border-radius",
  "clear",
  "color",
  "cursor",
  "direction",
  "display",
  "flex",
  "float",
  "font",
  "grid",
  "height",
  "left",
  "line-height",
  "list-style",
  "margin",
  "max-height",
  "max-width",
  "min-height",
  "min-width",
  "overflow",
  "overflow-x",
  "overflow-y",
  "padding",
  "position",
  "right",
  "text-align",
  "table-layout",
  "text-decoration",
  "text-indent",
  "top",
  "vertical-align",
  "visibility",
  "white-space",
  "width",
  "z-index",
  "zoom",
]);

// Helper function to check if a CSS property is Canvas-safe
export const isCanvasSafeProperty = (property: string): boolean => {
  return CANVAS_ALLOWED_CSS_PROPERTIES.has(property);
};

// Helper to filter out unsafe properties from a style object
export const filterCanvasSafeStyles = (
  styles: Record<string, string>
): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(styles).filter(([property]) =>
      isCanvasSafeProperty(property)
    )
  );
};
