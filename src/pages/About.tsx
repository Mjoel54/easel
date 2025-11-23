import { PageHeader } from "../components/index.js";

export default function About() {
  return (
    <section className="max-w-4xl mx-auto my-8 px-4">
      <PageHeader
        title="About"
        description="Your creative studio for crafting UI components"
      />

      <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          Easel bridges the technical gap that LMS administrators face when
          trying to create custom, visually engaging components for their
          learning platforms.
        </p>

        <p>
          Using Easel's intuitive component builder, you can design and
          customise elements visually, then export production-ready code that
          works seamlessly in any LMS environment. Whether you're creating
          interactive course elements, custom layouts, or engaging content
          blocks, Easel handles the technical complexity so you can focus on
          what matters - delivering exceptional learning experiences.
        </p>

        <p>Effortless design. Clean code. Zero technical barriers.</p>
      </div>
    </section>
  );
}
