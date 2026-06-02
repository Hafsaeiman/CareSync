const express = require("express");
const router = express.Router();

const LabReport = require("../models/LabReport");
const Blockchain = require("../utils/blockchain");

/* LOGIN */

router.post("/login", async (req, res) => {
  try {
    const { patientId, username } = req.body;

    const report = await LabReport.findOne({
      patientId,
      patientName: username
    });

    if (!report) {
      return res.status(401).json({
        message: "Invalid Patient ID or Username"
      });
    }

    if (
      !report.blockchain ||
      report.blockchain.length === 0
    ) {
      const chain =
        Blockchain.createReportChain({
          patientId: report.patientId,
          patientName: report.patientName,
          department: report.department,
          tests: report.tests,
          diagnosis: report.diagnosis
        });

      report.blockchain = chain;

      await report.save();
    }

    const updatedReport =
      await LabReport.findById(report._id);

    res.json(updatedReport);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
});

/* VERIFY BLOCKCHAIN */

router.get("/verify/:id", async (req, res) => {
  try {

    const report =
      await LabReport.findById(
        req.params.id
      );

    if (!report) {
      return res.status(404).json({
        message: "Report not found"
      });
    }

    const valid =
      Blockchain.verify(
        report.blockchain
      );

    res.json({ valid });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
});

/* SEED DATA */

router.get("/seed", async (req, res) => {
  try {

    await LabReport.deleteMany({});

    const reports =
      await LabReport.insertMany([

        {
          patientId: "P001",
          patientName: "Ali",
          reportId: "LAB-2026-101",
          department: "Cardiology",
          doctor: "Dr. Ahmed Khan",

          tests: [
            {
              testName: "Blood Sugar",
              result: "95 mg/dL",
              reference: "70-110",
              status: "Normal",
              charges: 20
            },
            {
              testName: "ECG",
              result: "Normal",
              reference: "Normal",
              status: "Normal",
              charges: 50
            },
            {
              testName: "Cholesterol",
              result: "180 mg/dL",
              reference: "<200",
              status: "Normal",
              charges: 35
            },
            {
              testName: "Blood Pressure",
              result: "120/80",
              reference: "120/80",
              status: "Normal",
              charges: 15
            }
          ],

          totalCharges: 120,
          diagnosis:
            "Patient is healthy. Cardiac functions normal.",

          blockchain: []
        },

        {
          patientId: "P002",
          patientName: "Ahmed",
          reportId: "LAB-2026-102",
          department: "Neurology",
          doctor: "Dr. Sarah Malik",

          tests: [
            {
              testName: "MRI Brain",
              result: "Normal",
              reference: "Normal",
              status: "Normal",
              charges: 150
            },
            {
              testName: "CBC",
              result: "Low Hemoglobin",
              reference: "13-17",
              status: "Abnormal",
              charges: 30
            },
            {
              testName: "Vitamin B12",
              result: "220 pg/mL",
              reference: "200-900",
              status: "Normal",
              charges: 25
            }
          ],

          totalCharges: 205,
          diagnosis:
            "Mild anemia detected. Neurological findings normal.",

          blockchain: []
        },

        {
          patientId: "P003",
          patientName: "Sara",
          reportId: "LAB-2026-103",
          department: "General Medicine",
          doctor: "Dr. Fatima Noor",

          tests: [
            {
              testName: "HbA1c",
              result: "8.2%",
              reference: "<5.7%",
              status: "High",
              charges: 40
            },
            {
              testName: "Blood Sugar Fasting",
              result: "210 mg/dL",
              reference: "70-110",
              status: "High",
              charges: 20
            },
            {
              testName: "Urine Glucose",
              result: "Positive",
              reference: "Negative",
              status: "Abnormal",
              charges: 15
            }
          ],

          totalCharges: 75,
          diagnosis:
            "Type 2 Diabetes suspected. Endocrinology consultation recommended.",

          blockchain: []
        },

        {
          patientId: "P004",
          patientName: "Ayesha",
          reportId: "LAB-2026-104",
          department: "Pulmonology",
          doctor: "Dr. Hassan Raza",

          tests: [
            {
              testName: "Chest X-Ray",
              result: "Mild Infection",
              reference: "Clear",
              status: "Abnormal",
              charges: 60
            },
            {
              testName: "CBC",
              result: "Elevated WBC",
              reference: "4000-11000",
              status: "High",
              charges: 25
            },
            {
              testName: "Oxygen Saturation",
              result: "95%",
              reference: "95-100%",
              status: "Normal",
              charges: 10
            }
          ],

          totalCharges: 95,
          diagnosis:
            "Mild respiratory infection detected.",

          blockchain: []
        },

        {
          patientId: "P005",
          patientName: "Usman",
          reportId: "LAB-2026-105",
          department: "Orthopedics",
          doctor: "Dr. Bilal Ahmed",

          tests: [
            {
              testName: "Bone X-Ray",
              result: "Hairline Fracture",
              reference: "No Fracture",
              status: "Abnormal",
              charges: 80
            },
            {
              testName: "Vitamin D",
              result: "18 ng/mL",
              reference: "20-50",
              status: "Low",
              charges: 35
            }
          ],

          totalCharges: 115,
          diagnosis:
            "Minor fracture with Vitamin D deficiency.",

          blockchain: []
        }

      ]);

    res.json({
      message: "Sample reports inserted successfully",
      reports
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;