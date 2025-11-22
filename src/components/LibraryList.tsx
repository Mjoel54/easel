export default function LibraryList() {
  const components = [
    {
      id: 1,
      name: "Banner 1",
      preview: `<div class="banner"><h2>Heading</h2></div>`,
    },
    {
      id: 2,
      name: "Tabbed Content",
      preview: "<div>Tabs preview HTML here</div>",
    },
    {
      id: 3,
      name: "Callout Box",
      preview: "<div>Callout preview HTML here</div>",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Canvas Components
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Ready-to-use components for your Canvas LMS pages
        </p>
      </div>

      <div className="space-y-6">
        {components.map((component) => (
          <div
            key={component.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900"
          >
            {/* Preview */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 min-h-[200px] flex items-center justify-center">
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: component.preview }}
              />
            </div>

            {/* Card Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {component.name}
              </h3>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Create
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
