
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const appName = process.env.APP_NAME;
const version = process.env.VERSION;
const nexusUrl = process.env.NEXUS_URL;
const artifact = `${appName}-${version}.tar.gz`;

const filePath = path.resolve(artifact);
if (!fs.existsSync(filePath)) {
  console.error('❌ Artifact not found. Run `npm run build` first.');
  process.exit(1);
}

const targetUrl = `${nexusUrl}${appName}/${version}/${artifact}`;

// Use Jenkins environment variables injected via withCredentials
const username = process.env.NEXUS_USER;
const password = process.env.NEXUS_PASSWORD;

const stream = fs.createReadStream(filePath);
axios.put(targetUrl, stream, {
  auth: { username, password },
  headers: { 'Content-Type': 'application/gzip' }
}).then(() => {
  console.log(`✅ Uploaded to Nexus: ${targetUrl}`);
}).catch(err => {
  console.error('❌ Upload failed:', err.response?.status, err.message);
});
