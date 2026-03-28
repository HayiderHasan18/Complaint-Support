import { FileText, Sparkles, Clock, ShieldCheck, CheckCircle } from "lucide-react";

function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      <section className="px-6 pt-5 pb-20 text-center">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Submit Clear Complaints
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Get Faster Responses
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            This system helps customers write clear, professional complaints and helps
            organizations understand and resolve issues more efficiently.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4 text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" /> Easy to use
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" /> AI clarity support
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" /> Faster handling
            </span>
          </div>
        </div>
      </section>

     
      <section className="px-6 py-18 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What This System Does
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<FileText />}
              title="Simple Complaint Form"
              text="Customers describe their issue using a clean and guided form."
            />
            <Feature
              icon={<Sparkles />}
              title="AI Writing Help"
              text="AI rewrites complaints clearly without changing the meaning."
            />
            <Feature
              icon={<ShieldCheck />}
              title="Safe & Confidential"
              text="All submitted complaints are handled securely and privately."
            />
          </div>
        </div>
      </section>

     
      <section className="px-6 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            How to Use the Complaint System
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-3 mb-12 max-w-3xl mx-auto">
            Follow these simple steps to submit your complaint and get a quicker response
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <Step num="1" title="Write Complaint" text="Explain what happened clearly." />
            <Step num="2" title="Improve with AI" text="Use AI to fix grammar and clarity." />
            <Step num="3" title="Submit Complaint" text="Send your complaint securely." />
            <Step num="4" title="Get Response" text="Support team reviews and responds." />
          </div>
        </div>
      </section>

      
      <section className="px-6 py-20 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <Guideline
            title="For Best Results"
            icon={<CheckCircle className="text-green-500" />}
            items={[
              "Describe the issue clearly",
              "Include important details",
              "Use AI before submitting",
              "Be respectful and specific"
            ]}
          />

          <Guideline
            title="Please Avoid"
            icon={<ShieldCheck className="text-red-500" />}
            items={[
              "Unclear descriptions",
              "Offensive language",
              "Duplicate complaints",
              "Unrelated information"
            ]}
          />
        </div>
      </section>

    </div>
  );
}

const Feature = ({ icon, title, text }) => (
  <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-700 text-center shadow">
    <div className="flex justify-center mb-4 text-blue-600">{icon}</div>
    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{text}</p>
  </div>
);

const Step = ({ num, title, text }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow">
    <div className="w-8 h-8 mx-auto mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
      {num}
    </div>
    <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{text}</p>
  </div>
);

const Guideline = ({ title, icon, items }) => (
  <div className="p-8 bg-gray-50 dark:bg-gray-700 rounded-2xl shadow">
    <h3 className="flex items-center gap-3 font-semibold text-lg mb-4 text-gray-900 dark:text-white">
      {icon} {title}
    </h3>
    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
      {items.map((i, idx) => <li key={idx}>• {i}</li>)}
    </ul>
  </div>
);

export default LandingPage;
