const https = require('https');
const fs = require('fs');
const path = require('path');

const iconUrls = {
    'react.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'nextjs.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'typescript.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'wordpress.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg',
    'python.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'nodejs.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'mongodb.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'postgresql.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'flutter.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    'firebase.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    'git.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
};

const iconsDir = path.join(process.cwd(), 'public', 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

// Delete existing icons to ensure clean download
fs.readdirSync(iconsDir).forEach(file => {
    fs.unlinkSync(path.join(iconsDir, file));
});

// Download each icon
Object.entries(iconUrls).forEach(([filename, url]) => {
    const filePath = path.join(iconsDir, filename);
    https.get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
            // Handle redirects
            https.get(response.headers.location, (redirectResponse) => {
                const fileStream = fs.createWriteStream(filePath);
                redirectResponse.pipe(fileStream);
                fileStream.on('finish', () => {
                    console.log(`Downloaded: ${filename}`);
                    fileStream.close();
                });
            });
        } else {
            const fileStream = fs.createWriteStream(filePath);
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                console.log(`Downloaded: ${filename}`);
                fileStream.close();
            });
        }
    }).on('error', (err) => {
        console.error(`Error downloading ${filename}:`, err.message);
    });
}); 