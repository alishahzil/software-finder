const tocItems = [
  { id: "buying-process", label: "Project management 5-step software buying process" },
  {
    id: "step-1",
    label:
      "1. Define outcomes and requirements: What matters most when choosing project management software?",
  },
  {
    id: "step-2",
    label: "2. Explore solutions with confidence: How do you find the right shortlist?",
  },
  {
    id: "step-3",
    label: "3. Narrow your list and be decisive: How do you compare vendors?",
  },
  {
    id: "step-4",
    label: "4. Get the best deal: How do you negotiate the right contract?",
  },
  {
    id: "step-5",
    label: "5. Plan for success: How do you ensure a smooth rollout?",
  },
];

const overviewSteps = [
  {
    title: "Define outcomes and requirements:",
    body: "Set clear goals (e.g., improve on-time delivery, reduce manual tracking), involve key stakeholders, and outline your budget and must-have features. This upfront clarity helps you avoid misalignment and overspending.",
  },
  {
    title: "Explore solutions with confidence:",
    body: "Use trusted sources, such as expert advice and verified reviews, to build a shortlist. Buyers who succeed rely more on peer insights and less on generative AI to assess usability, support, and integration capabilities.",
  },
  {
    title: "Narrow your list and be decisive:",
    body: "Focus on three vendors and schedule demos or trials. Use a comparison scorecard to evaluate how each tool supports your workflows, team structures, and reporting needs. Timely decisions (within three months) are a hallmark of successful buyers.",
  },
  {
    title: "Get the best deal:",
    body: "Negotiate terms that reflect your goals and risks. Clarify what's included in onboarding, integrations, and support. Involve IT, finance, and legal teams to ensure the contract protects your business and data.",
  },
  {
    title: "Plan for success:",
    body: "Build a rollout plan that covers onboarding, testing, training, and documentation. Confirm vendor support during implementation and refer to your contract to hold them accountable. A strong launch sets the tone for long-term value.",
  },
];

export default function ArticleSections() {
  return (
    <div className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex gap-10 items-start">

          {/* ── Table of Contents ─────────────────────────────── */}
          <aside className="w-[30%] flex-shrink-0 hidden lg:block sticky top-6 self-start">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Table of Contents</h2>
            <nav className="border-l border-gray-200">
              <ul>
                {tocItems.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`block text-sm leading-snug px-4 py-3 -ml-px border-l-2 transition-colors ${
                        idx === 0
                          ? "bg-gray-100 border-gray-400 text-gray-800 font-medium"
                          : "border-transparent text-gray-500 hover:text-[#0073EA] hover:border-[#0073EA]"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* ── Article body ──────────────────────────────────── */}
          <article className="w-[70%] flex-1 min-w-0">
            <section id="buying-process" className="scroll-mt-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What is project management software?
              </h2>
              <div className="space-y-4 text-[15px] text-gray-700 leading-relaxed">
                <p>
                  Project management software is a digital platform that teams use to plan,
                  organize, and manage projects, such as marketing campaigns or product launches. It
                  assigns tasks, builds workflows, enables live collaboration, and tracks progress
                  through dashboards and reports.
                </p>
                <p>
                  Many businesses report that the top trigger for buying new project management (PM)
                  tools is to gain artificial intelligence (AI) functionality. In Capterra&apos;s PM
                  Software Trends survey<sup className="text-[#0073EA]">[1]</sup>, 55% of buyers said
                  they&apos;re seeking platforms that offer AI capabilities to improve productivity,
                  decision-making, and collaboration.
                </p>
                <p>
                  As AI reshapes work, choosing the right PM software has never been more critical.
                  Yet the selection process is difficult to get right. According to Capterra&apos;s{" "}
                  <a href="#" className="text-[#0073EA] font-semibold hover:underline">
                    2026 Software Buying Trends Report
                  </a>
                  <sup className="text-[#0073EA]">[2]</sup>, 66% of buyers experience unexpected
                  disruption, disappointment, or both after a software purchase, often due to unclear
                  requirements, mismatched features, or poor implementation.
                </p>
                <p>
                  This guide offers a practical, five-step process to help you avoid those pitfalls.
                  It&apos;s backed by real user reviews, expert insights, and proven strategies for
                  defining goals, evaluating tools effectively, and making confident decisions. As
                  highlighted in our latest research, most successful software adopters make their
                  final software selection within three months, while longer timelines are often
                  associated with lower satisfaction.
                </p>
              </div>
            </section>

            <section className="mt-8">
              <p className="text-[15px] font-bold text-gray-900 mb-4">
                Here&apos;s a quick overview of the process:
              </p>
              <ol className="space-y-4 text-[15px] text-gray-700 leading-relaxed">
                {overviewSteps.map((step, idx) => (
                  <li key={step.title} id={`step-${idx + 1}`} className="flex gap-3 scroll-mt-6">
                    <span className="font-medium text-gray-700 flex-shrink-0">{idx + 1}.</span>
                    <p>
                      <span className="font-bold text-gray-900">{step.title}</span> {step.body}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-[15px] text-gray-700 leading-relaxed">
                Let&apos;s start with the foundation: defining what success looks like.
              </p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
