import { useState } from "react";
import { Header } from "../components/index.js";
import { EditorForm } from "../features/editor/EditorForm.js";
import { HTMLOutputModal } from "../features/generators/components/HtmlOutputModal.js";

export function EditorPage() {
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerate = (html: string) => {
    setGeneratedHtml(html);
    setIsModalOpen(true);
  };

  return (
    <>
      <Header
        title="HTML Editor"
        description="Fearlessly edit HTML text without accidentally breaking styling - paste in existing HTML, make changes with confidence, and copy it right back where it belongs, in your LMS."
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <EditorForm onGenerate={handleGenerate} />
      </div>

      <HTMLOutputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        html={generatedHtml}
        title="Edited HTML"
        showPreview={false}
      />
    </>
  );
}
