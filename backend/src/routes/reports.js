// routes/monitor.js
import express from "express";

import { getReportFolders } from "../controllers/reportfolders.js";
import  { getFolderLogs } from "../controllers/foldersLogs.js";

const router = express.Router();

router.post("/folders", getReportFolders);
router.get("/folders/:folderName", getFolderLogs);

export default router;