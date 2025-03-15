import { useState, useEffect } from "react";
import styles from "./laboratory.module.css";
import { 
  getLiveData, 
  getReports, 
  createReport, 
  updateReport, 
  deleteReport 
} from "../../api";

const Laboratory = () => {
  // State for live process data fetched from backend
  const [liveData, setLiveData] = useState(null);
  
  // State for managing reports and report form
  const [reports, setReports] = useState([]);
  const [reportForm, setReportForm] = useState({ 
    stage: "", 
    quality: "", 
    remarks: "", 
    parameters: [] 
  });
  const [editingReportIndex, setEditingReportIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  // Other UI state
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [activeTab, setActiveTab] = useState("weekly");
  const [expandedStage, setExpandedStage] = useState(null);

  const processingStages = [
    { title: "Corn Cleaning", inputs: "Raw Corn", outputs: "Cleaned Corn" },
    { title: "Steeping", inputs: "Cleaned Corn, Water, SO2", outputs: "Softened Corn, Steep Water" },
    { title: "Milling", inputs: "Softened Corn", outputs: "Corn Germ, Corn Slurry" },
  ];

  // Fetch live data on component mount
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const data = await getLiveData();
        setLiveData(data);
      } catch (error) {
        console.error("Failed to fetch live data:", error);
      }
    };
    fetchLiveData();
  }, []);

  // Fetch reports every time the active tab changes
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports(activeTab);
        setReports(data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };
    fetchReports();
  }, [activeTab]);

  // Toggle display for a processing stage's details
  const toggleStage = (index) => {
    setExpandedStage(expandedStage === index ? null : index);
  };

  // Open the report form for a particular processing stage
  const openReportForm = (stageTitle) => {
    setReportForm({ 
      stage: stageTitle, 
      quality: "", 
      remarks: "", 
      parameters: [{ parameter: "", value: "" }]
    });
    setEditingReportIndex(null);
    setShowForm(true);
  };

  // Handle changes to the main report fields
  const handleInputChange = (e) => {
    setReportForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle changes to a specific parameter row
  const handleParameterChange = (index, field, value) => {
    const updatedParameters = [...reportForm.parameters];
    updatedParameters[index][field] = value;
    setReportForm((prev) => ({ ...prev, parameters: updatedParameters }));
  };

  // Add a new row for parameters
  const addParameterRow = () => {
    setReportForm((prev) => ({
      ...prev,
      parameters: [...(prev.parameters || []), { parameter: "", value: "" }]
    }));
  };

  // Remove a parameter row
  const deleteParameterRow = (index) => {
    setReportForm((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index)
    }));
  };

  // Save a new report or update an existing one via the backend API
  const saveReportHandler = async () => {
    try {
      if (editingReportIndex !== null) {
        // Update an existing report. Use the report's id from the API response.
        const reportToEdit = reports[editingReportIndex];
        const updated = await updateReport(reportToEdit.id, reportForm);
        setReports((prev) =>
          prev.map((report, index) =>
            index === editingReportIndex ? updated : report
          )
        );
      } else {
        // Create a new report
        const created = await createReport(reportForm);
        setReports((prev) => [...prev, created]);
      }
      setShowForm(false);
    } catch (error) {
      console.error("Error saving report:", error);
    }
  };

  // Populate the form for editing a selected report
  const editReportHandler = (index) => {
    const reportToEdit = reports[index];
    setReportForm({
      stage: reportToEdit.stage,
      quality: reportToEdit.quality,
      remarks: reportToEdit.remarks,
      parameters: reportToEdit.parameters || []
    });
    setEditingReportIndex(index);
    setShowForm(true);
  };

  // Delete a report via the API
  const deleteReportHandler = async (index) => {
    try {
      const reportToDelete = reports[index];
      await deleteReport(reportToDelete.id);
      setReports((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  // View a report in a modal
  const viewReportHandler = (index) => {
    setSelectedReport(reports[index]);
    setShowReportModal(true);
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.mainHeader}>Laboratory Dashboard</h2>
      
      {/* Overview Panel */}
      <div className={styles.overview}>
        {liveData ? (
          [
            { title: "Corn Processed", value: `${liveData.totalCornProcessed} kg` },
            { title: "Glucose Produced", value: `${liveData.totalGlucoseProduced} kg` },
            { title: "Batch No.", value: liveData.batchNumber },
            { title: "Status", value: liveData.status }
          ].map((item, index) => (
            <div key={index} className={styles.overviewCard}>
              <h4>{item.title}</h4>
              <p className={styles.overviewValue}>{item.value}</p>
            </div>
          ))
        ) : (
          <p>Loading live data...</p>
        )}
      </div>
  
      {/* Processing Stages */}
      <h3 className={styles.subHeader}>Processing Stages</h3>
      <div className={styles.stagesContainer}>
        {processingStages.map((stage, index) => (
          <div key={index} className={styles.stageCard}>
            <div className={styles.stageTitle} onClick={() => toggleStage(index)}>
              {stage.title}
            </div>
            {expandedStage === index && (
              <div className={styles.stageDetails}>
                <p>Input: {stage.inputs}</p>
                <p>Output: {stage.outputs}</p>
                <progress value={Math.random() * 100} max="100" className={styles.progressBar}></progress>
                <button onClick={() => openReportForm(stage.title)}>Add Report</button>
              </div>
            )}
          </div>
        ))}
      </div>
  
      {/* Report Form */}
      {showForm && (
        <div className={styles.reportForm}>
          <h3>{editingReportIndex !== null ? "Edit Report" : "New Report"}</h3>
          <label className={styles.repoStage}>
            Stage: <strong>{reportForm.stage}</strong>
          </label>
          <input
            className={styles.repoInput}
            type="text"
            name="quality"
            placeholder="Quality Data"
            value={reportForm.quality}
            onChange={handleInputChange}
          />
          <input
            className={styles.repoInput}
            type="text"
            name="remarks"
            placeholder="Remarks"
            value={reportForm.remarks}
            onChange={handleInputChange}
          />
  
          {/* Dynamic Table for Parameters */}
          <div className={styles.repoTable}>
            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reportForm.parameters?.map((param, index) => (
                  <tr key={index}>
                    <td>
                      <input 
                        type="text" 
                        value={param.parameter} 
                        onChange={(e) => handleParameterChange(index, "parameter", e.target.value)} 
                        placeholder="Enter parameter" 
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        value={param.value} 
                        onChange={(e) => handleParameterChange(index, "value", e.target.value)} 
                        placeholder="Enter value" 
                      />
                    </td>
                    <td>
                      <button onClick={() => deleteParameterRow(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          <div className={styles.repoBtnDiv}>
            <button className={styles.formButton} onClick={addParameterRow}>
              Add Parameter
            </button>
            <button className={styles.formButton} onClick={saveReportHandler}>
              {editingReportIndex !== null ? "Update" : "Save"}
            </button>
            <button className={styles.formButton} onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Reports & Insights */}
      <h3 className={styles.subHeader}>Reports & Insights</h3>
      <div className={styles.reports}>
        <div className={styles.reportTabs}>
          {["weekly", "monthly", "yearly"].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={activeTab === tab ? styles.active : ""}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
  
        <div className={styles.reportContent}>
          <h4>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Reports</h4>
          {reports.length > 0 ? (
            <ul>
              {reports.map((report, index) => (
                <li key={report.id}>
                  <strong>{report.stage}</strong>: {report.quality} - {report.remarks}
                  <button onClick={() => viewReportHandler(index)}>View</button>
                  <button onClick={() => editReportHandler(index)}>Edit</button>
                  <button onClick={() => deleteReportHandler(index)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reports available.</p>
          )}
        </div>
        {showReportModal && selectedReport && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3>Report Details</h3>
              <ul className={styles.reportDetails}>
                <li><strong>Stage:</strong> {selectedReport.stage}</li>
                <li><strong>Quality:</strong> {selectedReport.quality}</li>
                <li><strong>Remarks:</strong> {selectedReport.remarks}</li>
              </ul>
  
              {/* Display Parameters in List Format */}
              {selectedReport.parameters && selectedReport.parameters.length > 0 && (
                <>
                  <h4>Parameters</h4>
                  <ul className={styles.parameterList}>
                    {selectedReport.parameters.map((param, index) => (
                      <li key={index}>
                        <strong>{param.parameter}:</strong> {param.value}
                      </li>
                    ))}
                  </ul>
                </>
              )}
  
              <button 
                className={styles.closeBtn} 
                onClick={() => setShowReportModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Laboratory;
