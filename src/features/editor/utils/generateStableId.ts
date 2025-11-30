export function generateStableId(path: number[]): string {
  return path.join("-");
}
