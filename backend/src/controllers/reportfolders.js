import fs from "fs";
import path from "path";
import express from "express";

const router = express.Router();

const LOGS_DIR = path.join(process.cwd(), "system_reports");

export const getReportFolders = (req, res, next) => {
    try {
    const folders = fs
        .readdirSync(LOGS_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name)
        .sort((a, b) => b.localeCompare(a)); // newest first

    res.json(folders);
    } 
    catch (err) 
    {
        next(err);
    }
};

export default router;
