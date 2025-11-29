export interface NodeElementProps {
  nodeName: string;
  indent: number;
}

export default function NodeElement({ nodeName, indent }: NodeElementProps) {
  return (
    <div
      className="py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      style={{ paddingLeft: `${indent}px` }}
    >
      <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
        &lt;{nodeName}&gt;
      </span>
    </div>
  );
}

// <div
//   className="py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
//   style={{ paddingLeft: `${indent}px` }}
// >
//   <span className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400">
//     &lt;{nodeName}&gt;
//   </span>
// </div>
