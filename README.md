# nmb-html-boilerplate

**Version:** 0.0.1

## Description
Application boilerplate for making websites with HTML, Bootstrap, and jQuery. Compresses CSS, JS, and image files. Converts all images to WebP format. Automatically makes changes to all HTML files. You only focus on the coding part.

Code according to the folder structure and run `npm run build`. If you are using VS Code, use `Ctrl + Shift + B`.

## Turkish Description
Html, Bootstrap ve jQuery ile web siteleri yapmak için uygulama ortak metini. css, js, img dosyalarını sıkıştırır. Tüm resimleri webp formatına dönüştürür. Tüm html dosyalarında değişiklikleri otomatik yapar. Siz sadece işin kodlama kısmına odaklanırsınız.

Klasör yapısına uygun olarak kodlamanızı yapın ve `npm run build` çalıştırın. VS Code kullanıyorsanız `Ctrl + Shift + B` kullanın.

## Scripts
- `build`: Runs the build process using `node index.js`.
- `grunt`: Runs Grunt tasks.
- `copy:3rdplugins`: Copies third-party plugins from `./assets/plugins` to `./dist/assets/plugins` using `robocopy`.

## Keywords
- boilerplate
- html
- css
- js
- grunt
- minify
- bootstrap
- node

## Author
Nazım Mert Bilgi (https://github.com/NazimMertBilgi)

## License
ISC

## DevDependencies
- `grunt`: ^1.6.1
- `grunt-contrib-cssmin`: ^5.0.0
- `grunt-contrib-htmlmin`: ^3.1.0
- `grunt-contrib-uglify`: ^5.2.2
- `grunt-cwebp`: ^3.0.3