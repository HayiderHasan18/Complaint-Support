import { useState } from "react";
import { toast } from "react-toastify";
import CustomerLayout from "../../components/layouts/CustomerLayout";
import Button from "../../components/common/Button";
import { createComplaint } from "../../services/complaintService";
import { sendMessageToAi } from "../../services/aiService";
import LandingPage from "./Landing";
const emptyForm = { customer_name: "", contact: "", issue: "", message: "" };

const Field = ({ label, name, textarea, form, onChange }) => (
  <div>
    <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
      {label}
    </label>
    {textarea ? (
      <textarea
        name={name}
        rows={8}
        value={form[name]}
        onChange={onChange}
        placeholder="Describe detail of your complaint here.."
        className="w-full px-4 py-3 border rounded-lg resize-none bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
      />
    ) : (
      <input
        name={name}
        value={form[name]}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
      />
    )}
  </div>
);

function SubmitComplaint()
{
  
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const isValid = () => form.customer_name && form.contact && form.issue && form.message;

  const handleSubmit = async () => {
    if (!isValid()) return toast.error("Please fill in all fields");
    try {
      setSubmitting(true);
      await createComplaint(form);
      toast.success("Complaint submitted successfully!");
      setForm(emptyForm);
      setTimeout(() => window.location.reload(), 3000);
    } catch {
      toast.error("Failed to submit complaint");
    } finally {
      setSubmitting(false);
    }
  };

  const improveWithAI = async () => {
    if (!form.message) return toast.error("Write your complaint first");
    try {
      setAiLoading(true);
      const reply = await sendMessageToAi(
        "Please rewrite this complaint clearly and professionally:\n\n" + form.message,
        "customer"
      );
      setForm(p => ({ ...p, message: reply }));
      toast.success("Complaint improved by AI");
    } catch {
      toast.error("AI failed to improve complaint");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <CustomerLayout>
      <LandingPage/>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Submit Your Complaint</h2>
            <p className="text-gray-600 dark:text-gray-300">Please fill in the form below</p>
          </div>

          <div className="space-y-6">
            <Field label="Your Name" name="customer_name" form={form} onChange={onChange} />
            <Field label="Your Email" name="contact" form={form} onChange={onChange} />
            <Field label="Issue Title" name="issue" form={form} onChange={onChange} />
            <Field label="Your Complaint" name="message" textarea form={form}  onChange={onChange}  />

            <div className="flex gap-4 pt-6">
              <Button variant="outline" className="flex-1" onClick={improveWithAI} disabled={aiLoading}>
                {aiLoading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                    Improving...
                  </span>
                ) : "Ask AI to Improve"}
              </Button>
               <Button className="flex-1" onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : "Submit Complaint"}
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-600 text-center text-sm text-gray-500 dark:text-gray-400">
            We'll respond within 24–48 hours
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default SubmitComplaint;