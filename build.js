const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// create the dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// list of files to copy
const filesToCopy = [
  'src/js/content.js',
  'src/js/options.js',
  'src/css/styles.css',
  'src/interface/index.html',
  'src/icons/icon16.png',
  'src/icons/icon32.png',
  'src/icons/icon48.png',
  'src/icons/icon128.png',
];

// copy each file to the dist directory
filesToCopy.forEach((file) => {
  const srcPath = path.join(__dirname, file);
  const destPath = path.join(distDir, file.replace('src/', ''));
  const destDir = path.dirname(destPath);

  // create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copyFileSync(srcPath, destPath);
});

// function to create a archive
const createArchive = (outputFilename) => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputFilename);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => resolve());
    archive.on('error', (err) => reject(err));

    // copy the correct manifest file based on output file name
    let manifestFile = 'src/manifest-chrome.json';
    if (outputFilename.endsWith('.xpi')) {
      manifestFile = 'src/manifest-firefox.json';
    }

    fs.copyFileSync(manifestFile, path.join(distDir, 'manifest.json'));

    archive.pipe(output);
    archive.directory(distDir, false);
    archive.finalize();
  });
};

// create ZIP file for chrome
createArchive(path.join(__dirname, 'search-word-on-cambridge.zip'))
  .then(async () => {
    console.log(`ZIP file created`);

    // create XPI file for chrome
    await createArchive(path.join(__dirname, 'search-word-on-cambridge.xpi'));
    console.log(`XPI file created`);
    fs.rmSync(distDir, { recursive: true });
  })
  .catch((err) => console.error('Error creating ZIP file:', err));
