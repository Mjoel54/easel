import { useState } from "react";
import { HTMLOutputModal } from "./index.js";

interface ComponentType<T = unknown> {
  id: number;
  name: string;
  FormComponent: React.ComponentType<{
    onCancel: () => void;
    onGenerate: (html: string) => void;
  }>;
  generate: (data: T) => string;
  defaultData: T;
}

interface ComponentListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: readonly ComponentType<any>[];
  title?: string;
}

export default function ComponentList({
  components,
  title = "Your HTML",
}: ComponentListProps) {
  const [activeForm, setActiveForm] = useState<number | null>(null);
  const [generatedHTML, setGeneratedHTML] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const handleGenerate = (html: string) => {
    setGeneratedHTML(html);
    setShowModal(true);
    setActiveForm(null);
  };

  return (
    <div>
      <div className="space-y-6">
        {components.map((component) => {
          const { FormComponent, generate, defaultData } = component;
          const preview = generate(defaultData);

          return (
            <div
              key={component.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            >
              {activeForm === component.id ? (
                <div className="p-6">
                  <FormComponent
                    onCancel={() => setActiveForm(null)}
                    onGenerate={handleGenerate}
                  />
                </div>
              ) : (
                <div className="dark:bg-gray-800 p-6 min-h-[150px] flex items-center justify-center">
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{ __html: preview }}
                  />
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 rounded-b-lg flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {component.name}
                </h3>
                {activeForm !== component.id && (
                  <button
                    onClick={() => setActiveForm(component.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Create
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <HTMLOutputModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        html={generatedHTML}
        title={title}
      />
    </div>
  );
}
