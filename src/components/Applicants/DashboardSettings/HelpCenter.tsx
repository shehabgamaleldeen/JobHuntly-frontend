import { Link } from "react-router-dom";

export function DashboardHelpCenter() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Help Center</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" className="inline-block">
            <button className="px-4 py-2 border border-purple-200 rounded text-[#4640DE] text-sm hover:bg-purple-50">
              Back to homepage
            </button>
          </Link>
        </div>
      </header>

      {/* Search Bar */}
      <section className="bg-white rounded-lg border border-gray-100 p-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Search for help
          </label>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search for topics, FAQs, and guides..."
              className="w-full border border-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Browse by category</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Category cards */}
          {[
            { title: "Account & Login", desc: "Help with logging in or managing your account settings." },
            { title: "Applications", desc: "Guides for tracking, editing or withdrawing applications." },
            { title: "Profile", desc: "Learn how to update your profile and visibility settings." },
            { title: "Security & Privacy", desc: "Understand how we protect your data and privacy." },
            { title: "Notifications", desc: "Manage what types of notifications you receive." },
            { title: "Getting Started", desc: "New user? Start with these beginner guides." },
          ].map((c, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-lg p-5 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-slate-900 mb-1">{c.title}</h3>
              <p className="text-sm text-slate-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Questions */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Popular questions</h2>

        <div className="bg-white border border-gray-100 rounded-lg divide-y">
          {[
            "How do I reset my password?",
            "How do I change my account email?",
            "How do I hide my profile from employers?",
            "Why am I not receiving notifications?",
            "How do I delete my account permanently?",
          ].map((q, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50 cursor-pointer">
              <p className="text-sm text-slate-800">{q}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-white border border-gray-100 rounded-lg p-6 mb-10">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Still need help?</h2>
        <p className="text-sm text-slate-600 mb-4">
          If you can’t find what you’re looking for, our support team is here to help.
        </p>

        <button className="px-4 py-2 bg-[#4640DE] text-white rounded text-sm hover:opacity-90">
          Contact Support
        </button>
      </section>
    </div>
  );
}

export default DashboardHelpCenter;
