import React, { useState } from "react";
import "./LabReportsPage.css";
import SHA256 from "crypto-js/sha256";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function LabReportsPage() {
  const [patientId, setPatientId] =useState("");
  const [patientName, setPatientName] =useState("");
  const [verified, setVerified] =useState(false);
  const [blockHash, setBlockHash] =useState("");
  const [previousHash, setPreviousHash] =useState("");
  const [reportData, setReportData] =useState(null);
  const [loading, setLoading] =useState(false);
  /* LOGIN */
  const verifyPatient = async () => {
  if (
    !patientId.trim() ||
    !patientName.trim()
  ) {
    alert(
      "Please enter Patient ID and Username"
    );
    return;
  }
  try {
    setLoading(true);
    const response = await fetch(
      "http://localhost:5000/api/lab/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          patientId,
          username: patientName
        })
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.message || "Invalid Credentials"
      );
    }
    setVerified(true);
    setReportData(data);
    if (
      data.blockchain &&
      data.blockchain.length > 0
    ) {
      const latestBlock =
        data.blockchain[
          data.blockchain.length - 1
        ];
      setBlockHash(
        latestBlock.hash
      );
      setPreviousHash(
        latestBlock.previousHash
      );
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};
  /* VERIFY BLOCKCHAIN */
  const verifyBlockchain =
  async () => {
    try {
      const response =
        await fetch(
          `http://localhost:5000/api/lab/verify/${reportData._id}`
        );
      const data =
        await response.json();
      if (data.valid) {
        alert(
          "Blockchain Verified Successfully ✅"
        );
      } else {

        alert(
          "Blockchain Verification Failed ❌"
        );
      }
    } catch (error) {
      alert(
        "Verification Error"
      );
    }
  };
  /* GENERATE PDF */
  const generatePDF = async () => {
    const input =
      document.getElementById(
        "report-pdf"
      );
    const canvas =
      await html2canvas(input, {
        scale: 2,
        useCORS: true
      });
    const imgData =
      canvas.toDataURL("image/png");
    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );
    const pdfWidth =
      pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (canvas.height * pdfWidth) /
      canvas.width;
    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );
    pdf.save(
      `Lab_Report_${patientId}.pdf`
    );
  };
  return (
    <div className="main-container">
      {!verified ? (
        /* LOGIN PAGE */
        <div className="login-container">
          {/* LEFT SIDE */}
          <div className="login-left">
            <div className="overlay"></div>
            <div className="left-content">
              <h1>CareSync</h1>
              <p>
                Digital Laboratory
                Management System
              </p>
            </div>
          </div>
          {/* RIGHT SIDE */}
          <div className="login-right">
            <h1>Medical Login</h1>
            <p className="subtitle">
              Access Your Laboratory Reports
            </p>
            <div className="input-group">
              <input
                type="text"
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) =>
                  setPatientId(
                    e.target.value
                  )
                }
              />
              <input
                type="text"
                placeholder="Username"
                value={patientName}
                onChange={(e) =>
                  setPatientName(
                    e.target.value
                  )
                }
              />
              <button
                onClick={verifyPatient}
              >
                {
                  loading
                    ? "Loading..."
                    : "Log In"
                }
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* LAB REPORT PAGE */
        <div className="lab-container">
          {/* PDF SECTION */}
          <div id="report-pdf">
            {/* HEADER */}
            <div className="report-top">
              <div>
                <h1 className="hospital-name">
                  CareSync Diagnostics
                </h1>
                <p className="hospital-sub">
                  Advanced Digital Laboratory
                  System
                </p>
              </div>
              <div className="report-info">
                <p>
                  <strong>Report ID:</strong>
                  {" "}
                  {reportData?.reportId || "LAB-2026-101"}
                </p>
                <p>
                  <strong>Date:</strong>
                  {" "}
                  {
                    new Date()
                      .toLocaleDateString()
                  }
                </p>
              </div>
            </div>
            {/* REPORT TITLE */}
            <div className="report-title-box">
              <h2>
                Laboratory Medical Report
              </h2>
            </div>
            {/* PATIENT GRID */}
            <div className="patient-grid">
              {/* PATIENT */}
              <div className="patient-card">
                <h3>
                  Patient Information
                </h3>
                <p>
                  <strong>Patient ID:</strong>
                  {" "}
                  {patientId}
                </p>
                <p>
                  <strong>Username:</strong>
                  {" "}
                  {patientName}
                </p>
                <p>
                  <strong>Department:</strong>
                  {" "}
                  {
                    reportData?.department ||
                    "Cardiology"
                  }
                </p>
              </div>
              {/* DOCTOR */}
              <div className="patient-card">
                <h3>
                  Doctor Information
                </h3>
                <p>
                  <strong>Doctor:</strong>
                  {" "}
                  {
                    reportData?.doctor ||
                    "Dr. Ahmed Khan"
                  }
                </p>
                <p>
                  <strong>Hospital:</strong>
                  {" "}
                  City Care Hospital
                </p>
                <p>
                  <strong>Status:</strong>
                  {" "}
                  Completed ✅
                </p>
              </div>
            </div>
            {/* TABLE */}
            <div className="table-wrapper">
              <table className="lab-table">
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Result</th>
                    <th>Reference</th>
                    <th>Status</th>
                    <th>Charges</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    reportData?.tests?.map(
                      (test, index) => (
                        <tr key={index}>
                          <td>
                            {test.testName}
                          </td>
                          <td>
                            {test.result}
                          </td>
                          <td>
                            {test.reference}
                          </td>
                          <td>
                            {test.status}
                          </td>
                          <td>${test.charges}</td>
                        </tr>
                      )
                    )
                  }
                </tbody>
              </table>
            </div>
            {/* SUMMARY */}
            <div className="report-summary">
              <div className="summary-card">
                <h3>Total Charges</h3>
                <h2>
                  $
                  {
                    reportData?.totalCharges ||
                    215
                  }
                </h2>
              </div>
              <div className="summary-card">
                <h3>Final Diagnosis</h3>
                <p>
                  {
                    reportData?.diagnosis ||
                    "Patient condition is stable."
                  }
                </p>
              </div>
            </div>
            {/* SIGNATURE */}
            <div className="signature-section">
              <div>
                <div className="signature-line"></div>
                <p>
                  Authorized Lab Specialist
                </p>
              </div>
              <div>
                <div className="signature-line"></div>
                <p>
                  Medical Officer
                </p>
              </div>
            </div>
          </div>
          {/* BUTTONS */}
          <div className="report-actions">
            <button onClick={generatePDF}>
              Download PDF
            </button>
          </div>
          {/* BLOCKCHAIN */}
          <div className="blockchain-section">
            <h2>
              Blockchain Verification
            </h2>
            <div className="blockchain-box">
              <p>
                <strong>
                  Current Block Hash:
                </strong>
              </p>
              <small>
                {blockHash}
              </small>
              <br />
              <br />
              <p>
                <strong>
                  Previous Block Hash:
                </strong>
              </p>
              <small>
                {previousHash}
              </small>
              <br />
              <br />
              <p>
                <strong>Status:</strong>
                {" "}
                Immutable & Verified ✅
              </p>
            </div>
            <button
              className="verify-btn"
              onClick={verifyBlockchain}
            >
              Verify Record Integrity
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default LabReportsPage;