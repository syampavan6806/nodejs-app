
require('dotenv').config();
const gulp = require('gulp');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const appName = process.env.APP_NAME || 'nodejs-app';
const version = process.env.VERSION || '1.0.0';
const artifact = `${appName}-${version}.tar.gz`;
const nexusUrl = process.env.NEXUS_URL;

gulp.task('build', () => {
  return gulp.src([
    '**/*',
    '!node_modules/**',
    '!.git/**',
    '!scripts/**',
    '!*.tar.gz',
    '!*.zip'
  ])
  .pipe(tar(`${appName}-${version}.tar`))
  .pipe(gzip())
  .pipe(gulp.dest('.'));
});

gulp.task('deploy', async function () {
  const filePath = path.resolve(artifact);
  if (!fs.existsSync(filePath)) {
    console.error('❌ Build artifact missing. Run `gulp build` first.');
    process.exit(1);
  }

  const targetUrl = `${nexusUrl}${appName}/${version}/${artifact}`;
  const username = process.env.NEXUS_USER;
  const password = process.env.NEXUS_PASSWORD;

  const stream = fs.createReadStream(filePath);
  try {
    const response = await axios.put(targetUrl, stream, {
      auth: { username, password },
      headers: { 'Content-Type': 'application/gzip' }
    });
    console.log(`✅ Uploaded to Nexus: ${targetUrl}`);
  } catch (err) {
    console.error('❌ Upload failed:', err.response?.status, err.message);
  }
});
