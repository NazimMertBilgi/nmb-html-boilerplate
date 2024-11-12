var cp = require('child_process');
var fs = require('fs');
var path = require('path');

function build() {
    removeDistFolder();
    minify();
    copy3rdPartyPlugins();
    changeHtmlImgExtensions();
    openIndexHtml();
}

function removeDistFolder() {
    var distPath = path.join(__dirname, 'dist');

    if (fs.existsSync(distPath)) {
        fs.rmSync(distPath, { recursive: true });
    } else {
        console.log('dist folder does not exist');
    }
}

function minify() {
    cp.execSync('npm run grunt', function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Minified');
    });
}

function copy3rdPartyPlugins() {
    cp.exec('npm run copy:3rdplugins', function (err, stdout, stderr) {
        if (err) {
            // Even though the operation is successful, it gives an error, so console.log was removed.
            return;
        }
        console.log('Copied 3rd party plugins');
    });
}

function changeHtmlImgExtensions() {
    var distPath = path.join(__dirname, 'dist');

    fs.readdirSync(distPath).forEach(file => {
        if (path.extname(file) === '.html') {
            var filePath = path.join(distPath, file);
            var content = fs.readFileSync(filePath, 'utf8');
            var updatedContent = content.replace(/<img\s+[^>]*src="([^"]+)\.(jpg|jpeg|png)"/g, (match, p1, p2) => {
                return match.replace(p1 + '.' + p2, p1 + '.webp');
            });
            fs.writeFileSync(filePath, updatedContent, 'utf8');
        }
    });
}

async function openIndexHtml() {
    var distPath = path.join(__dirname, 'dist');
    var indexHtmlPath = path.join(distPath, 'index.html');

    await sleep(1000);

    if (fs.existsSync(indexHtmlPath)) {
        cp.exec('start ' + indexHtmlPath, function (err, stdout, stderr) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Opened index.html');
        });
    } else {
        console.log('index.html does not exist');
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

build();