import { useState } from "react";
import { SimpleBannerForm } from "./banners/SimpleBannerForm.jsx";
import GradientBannerForm from "./banners/GradientBannerForm.js";
import { BorderBannerForm } from "./banners/BorderBannerForm.js";
import { HTMLOutputModal } from "./banners/HtmlOutputModal.js";

export default function ComponentList() {
  const [activeForm, setActiveForm] = useState<number | null>(null);
  const [generatedHTML, setGeneratedHTML] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const components = [
    {
      id: 1,
      name: "Simple",
      formComponent: SimpleBannerForm,
      preview: `<div style="background-color: #8a19cc; padding: 10px 20px; margin-bottom: 1rem; border-radius: 0 15px 0 5px;"><h2 style="margin: 0.5rem 0; font-size: 28px; color: #ffffff;"><strong>Heading</strong></h2></div>`,
    },
    {
      id: 2,
      name: "Gradient",
      formComponent: GradientBannerForm,
      preview: `<div style="position: relative; background: linear-gradient(135deg, #8a19cc 0%, #5a0f8c 100%); padding: 24px 32px; margin-bottom: 1rem; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset;">
  <div style="position: absolute; top: -50%; right: -10%; width: 300px; height: 300px; background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
  <div style="position: absolute; bottom: -30%; left: -5%; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%); pointer-events: none;"></div>
  <h2 style="position: relative; margin: 0; color: #ffffff; font-size: 28px; letter-spacing: -0.5px; text-shadow: 0 2px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.1); line-height: 1.3;"><strong>Heading</strong></h2>
</div>`,
    },
    {
      id: 3,
      name: "Border",
      formComponent: BorderBannerForm,
      preview: `<div style="background: #f5f7fa; padding: 24px 32px; margin-bottom: 1rem; border-radius: 8px; border-left: 10px solid #8a19cc;">
  <h2 style="margin: 0; color: #1e293b; font-size: 26px; line-height: 1.3;"><strong>Heading</strong></h2>
</div>`,
    },
  ];

  const handleGenerate = (html: string) => {
    setGeneratedHTML(html);
    setShowModal(true);
    setActiveForm(null);
  };

  return (
    <div>
      <div className="space-y-6">
        {components.map((component) => {
          const FormComponent = component.formComponent;

          return (
            <div
              key={component.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900"
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
                    dangerouslySetInnerHTML={{ __html: component.preview }}
                  />
                </div>
              )}

              <div className="bg-gray-50 p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
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
        title="Your Banner HTML"
      />
    </div>
  );
}
