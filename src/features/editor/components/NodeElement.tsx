export interface NodeElementProps {
  nodeName: string;
  indent: number;
}

export function NodeElement({ nodeName, indent }: NodeElementProps) {
  return (
    <div className="pl-1 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
      <div style={{ paddingLeft: `${indent}px` }}>
        <span className="text-sm font-mono text-blue-600 dark:text-blue-400">
          &lt;{nodeName}&gt;
        </span>
      </div>
    </div>
  );
}
