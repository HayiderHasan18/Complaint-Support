import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge"; 
import { toast } from "react-toastify";
import { getComplaintById, markResolved, closeComplaint } from "../../services/complaintService";

function ComplaintDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getComplaintById(id);
        setData(res.data);
        setResponse(res.data.ai_analysis?.draft_response || "");
      } catch {
        toast.error("Failed to load complaint");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Loading complaint...</p>;
  if (!data) return <p>Complaint not found</p>;

  const { complaint, ai_analysis } = data;

  const updateStatus = (status) => setData(p => ({ ...p, complaint: { ...p.complaint, status } }));

  const handleResolved = async () => {
    try {
      const res = await markResolved(id);
      toast.success(res.data.msg);
      updateStatus("resolved");
    } catch { toast.error("Failed to update complaint"); }
  };

  const handleClose = async () => {
    try {
      setSending(true);
      const res = await closeComplaint(id, response);
      toast.success(res.data.msg || "Complaint closed successfully");
      updateStatus("closed");
    } catch { toast.error("Failed to close complaint"); }
    finally { setSending(false); }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Complaint Details: #{complaint.id}</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Customer Information">
          <p><b>Name:</b> {complaint.customer_name}</p>
          <p><b>Contact:</b> {complaint.contact}</p>
          <p><b>Status:</b> <Badge label={complaint.status} type={complaint.status} /></p>
          <p><b>Complaint:</b> {complaint.message}</p>
        </Card>

        <Card title="AI Analysis">
          {ai_analysis ? (
            <>
              <p><b>Category:</b> {ai_analysis.category}</p>
              <p><b>Urgency:</b> <Badge label={ai_analysis.urgency} type={ai_analysis.urgency} /></p>
              <p><b>Confidence:</b> {ai_analysis.confidence}%</p>
              <p className="text-gray-600 dark:text-gray-300">{ai_analysis.summary}</p>
            </>
          ) : (
            <p>No AI analysis available</p>
          )}
        </Card>
      </div>

      <Card className="mt-4" title="AI Suggested Response">
        <textarea
          className="w-full border-2 border-gray-200/70 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-lg resize-none sm:resize-y"
          rows={12}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3">
          <Button variant="outline" className="w-full sm:w-auto" onClick={handleResolved}>
            Mark Resolved
          </Button>
          <Button className="w-full sm:w-auto" onClick={handleClose} disabled={sending}>
            {sending ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              "Approve & Send"
            )}
          </Button>
        </div>
      </Card>
    </>
  );
}

export default ComplaintDetails;
