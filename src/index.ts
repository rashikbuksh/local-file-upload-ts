import { Buffer } from "node:buffer";
import * as fs from "node:fs";
import path from "node:path";

import nanoid from "./lib/nanoid";

export async function insertFile(
	file: any,
	folderName: string,
	uploadDir?: string
) {
	const buffer = await file.arrayBuffer(); // Ensure this is awaited

	// Use provided year or current year
	const targetYear = new Date().getFullYear();

	const upload_path = `/uploads/${targetYear}/${folderName}/${nanoid()}.${file.name.split(".").pop()}`;
	// Use process.cwd() to get the user's project root, not the package location
	// Allow custom upload directory or default to current working directory
	const baseDir = uploadDir || process.cwd();
	const fullUploadPath = path.join(baseDir, upload_path);

	// Ensure the directory exists
	fs.mkdirSync(path.dirname(fullUploadPath), { recursive: true });

	fs.writeFileSync(fullUploadPath, Buffer.from(buffer));

	return upload_path;
}

export async function deleteFile(filePath: string, uploadDir?: string) {
	// delete the file
	// Use process.cwd() to get the user's project root, not the package location
	// Allow custom upload directory or default to current working directory
	const baseDir = uploadDir || process.cwd();
	const fullFilePath = path.join(baseDir, filePath);
	fs.unlinkSync(fullFilePath);
}

export async function updateFile(
	file: any,
	oldFilePath: string,
	folderName: string,
	uploadDir?: string
) {
	// delete the old file
	await deleteFile(oldFilePath, uploadDir);

	// upload the new file
	return insertFile(file, folderName, uploadDir);
}
