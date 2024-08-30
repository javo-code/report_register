import Report from "../models/report.model.js";

export const getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reports" });
    }
};

export const createReport = async (req, res) => {
    try {
        const { patient, report } = req.body;
        const newReport = new Report({ patient, report });
        const savedReport = await newReport.save();
        res.json(savedReport);
    } catch (error) {
        res.status(500).json({ message: "Error creating report" });
    }
};

export const getReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ message: "Report not found" });
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: "Error fetching report" });
    }
};

export const updateReport = async (req, res) => {
    try {
        // Usar Report.findByIdAndUpdate()
        const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Devuelve el documento modificado
        });
        if (!report) return res.status(404).json({ message: "Report not found" });
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: "Error updating report" });
    }
};

export const deleteReport = async (req, res) => {
    try {
        // Usar Report.findByIdAndDelete()
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) return res.status(404).json({ message: "Report not found" });
        res.json({ message: "Report deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting report" });
    }
};
