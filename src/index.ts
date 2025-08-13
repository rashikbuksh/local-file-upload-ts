import { Buffer } from "node:buffer";
import * as fs from "node:fs/promises";
import path from "node:path";
import nanoid from "./lib/nanoid";

// Type for file parameter supporting both Node.js (multer) and Hono/browser
type UploadFile = {
	buffer?: Buffer;
	arrayBuffer?: () => Promise<ArrayBuffer>;
	name?: string;
	originalname?: string;
};

export async function insertFile(
	file: UploadFile,
	folderName: string,
	uploadDir?: string
) {
	let buffer: ArrayBuffer | Buffer;
	if (typeof file.arrayBuffer === "function") {
		// Hono/browser style
		buffer = await file.arrayBuffer();
	} else if (file.buffer) {
		// Node.js (e.g., multer) style
		buffer = file.buffer;
	} else {
		throw new Error(
			"Unsupported file object: must have arrayBuffer() method or buffer property"
		);
	}

	// Use provided year or current year
	const targetYear = new Date().getFullYear();

	const fileName = file.name || file.originalname;
	if (!fileName) {
		throw new Error(
			"File object must have a name or originalname property"
		);
	}
	const ext = fileName.includes(".") ? fileName.split(".").pop() : "";
	const upload_path = `/uploads/${targetYear}/${folderName}/${nanoid()}${ext ? "." + ext : ""}`;
	// Use process.cwd() to get the user's project root, not the package location
	// Allow custom upload directory or default to current working directory
	const baseDir = uploadDir || process.cwd();
	const fullUploadPath = path.join(baseDir, upload_path);

	// Ensure the directory exists
	await fs.mkdir(path.dirname(fullUploadPath), { recursive: true });

	const dataToWrite = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
	await fs.writeFile(fullUploadPath, dataToWrite);

	return upload_path;
}

export async function deleteFile(filePath: string, uploadDir?: string) {
	// Use process.cwd() to get the user's project root, not the package location
	// Allow custom upload directory or default to current working directory
	const baseDir = uploadDir || process.cwd();
	const fullFilePath = path.join(baseDir, filePath);
	try {
		await fs.unlink(fullFilePath);
	} catch (err: any) {
		if (err.code !== "ENOENT") throw err; // Ignore if file doesn't exist
	}
}

export async function updateFile(
	file: UploadFile,
	oldFilePath: string,
	folderName: string,
	uploadDir?: string
) {
	// delete the old file
	await deleteFile(oldFilePath, uploadDir);

	// upload the new file
	return insertFile(file, folderName, uploadDir);
}
