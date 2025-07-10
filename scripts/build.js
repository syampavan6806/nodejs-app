
require('dotenv').config();
const fs = require('fs');
const archiver = require('archiver');

const appName = process.env.APP_NAME;
const version = process.env.VERSION;
const outputFile = `${appName}-${version}.tar.gz`;

const output = fs.createWriteStream(outputFile);
const archive = archiver('tar', { gzip: true });

output.on('close', () => {
  console.log(`✅ ${outputFile} created (${archive.pointer()} bytes)`);
});

archive.on('error', err => {
  console.error('❌ Archiving failed:', err.message);
  process.exit(1);
});

archive.pipe(output);

archive.glob('**/*', {
  ignore: ['node_modules/**', '.git/**', '*.tar.gz', '*.zip']
});

archive.finalize();
