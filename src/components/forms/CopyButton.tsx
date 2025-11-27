import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function CopyButton({
  html,
  handleCopy,
  copied,
}: {
  html: string;
  handleCopy: () => void;
  copied: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
        HTML Code
      </label>
      <div className="relative">
        <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-4 overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
          <code>{html}</code>
        </pre>
        <motion.button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out cursor-pointer"
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          {copied ? (
            <ClipboardDocumentCheckIcon className="w-6 h-6" />
          ) : (
            <ClipboardDocumentIcon className="w-6 h-6" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
