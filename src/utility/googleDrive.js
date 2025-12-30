const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

// Expecting these env variables:
// GOOGLE_SERVICE_ACCOUNT_EMAIL
// GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY  (with \n escaped or real newlines)
// GOOGLE_DRIVE_FOLDER_ID              (parent folder for uploads)

let driveClient;

const getDriveClient = () => {
  if (driveClient) return driveClient;

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error("Google service account env vars not configured");
  }

  // Handle escaped newlines in env value
  privateKey = privateKey.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  driveClient = google.drive({ version: "v3", auth });
  return driveClient;
};

const uploadToDrive = async (localFilePath, fileName, mimeType) => {
  const drive = getDriveClient();

  const fileMetadata = {
    name: fileName,
    parents: process.env.GOOGLE_DRIVE_FOLDER_ID ? [process.env.GOOGLE_DRIVE_FOLDER_ID] : undefined,
  };

  const media = {
    mimeType,
    body: fs.createReadStream(localFilePath),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id, webViewLink, webContentLink",
  });

  const fileId = response.data.id;

  // Make file readable by anyone with the link
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  const publicUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;

  return {
    fileId,
    publicUrl,
    webViewLink: response.data.webViewLink,
    webContentLink: response.data.webContentLink,
  };
};

module.exports = {
  uploadToDrive,
};


