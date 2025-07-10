const gulp = require('gulp');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const pkg = require('./package.json');
const appName = pkg.name || 'node-app';
const version = pkg.version || '1.0.0';
const isSnapshot = version.includes('SNAPSHOT');

const artifact = `${appName}-${version}.tar.gz`;

const baseUrl = isSnapshot
  ? process.env.NEXUS_SNAPSHOT_URL || pkg.config.nexusSnapshotUrl
  : process.env.NEXUS_RELEASE_URL || pkg.config.nexusReleaseUrl;

const username = process.env.NEXUS_USER;
const password = process.env.NEXUS_PASSWORD;

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

  const targetUrl = `${baseUrl}${appName}/${version}/${artifact}`;
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
