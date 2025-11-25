import { useState } from "react";
import { PageHeader } from "../components/index.js";
import { HtmlEditorForm } from "../components/editor/HtmlEditorForm.js";
import { HTMLOutputModal } from "../components/banners/HtmlOutputModal.js";

export default function Editor() {
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerate = (html: string) => {
    setGeneratedHtml(html);
    setIsModalOpen(true);
  };

  return (
    <>
      <PageHeader
        title="HTML Editor"
        description="Fearlessly edit HTML text without accidentally breaking styling - paste in existing HTML, make changes with confidence, and copy it right back where it belongs, in your LMS."
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <HtmlEditorForm onGenerate={handleGenerate} />
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
