# nmb-html-boilerplate

**Version:** 0.0.3

# Description
Application boilerplate for making websites with HTML, Bootstrap, and jQuery. You don't have to depend on these plugins, you can develop with whatever technologies you want to develop with. Compresses CSS, JS, and image files. Converts all images to WebP format. Automatically makes changes to all HTML files. You only focus on the coding part.

With the Live Reload feature, you can write and save your code, the page will be automatically refreshed and you will be able to view the updated version of the page.

With the QR Code feature, scan the QR Code image created for you from your mobile device and follow the changes instantly from your mobile device.

Code according to the folder structure and run `npm run build`. If you are using VS Code, use `Ctrl + Shift + B`.

# Turkish Description
Html, Bootstrap ve jQuery ile web siteleri yapmak için uygulama ortak metini. Bu eklentilere bağlı kalmak zorunda değilsiniz, siz hangi teknolojilerle geliştirme yapmak isterseniz o şekilde geliştirebilirsiniz. css, js, img dosyalarını sıkıştırır. Tüm resimleri webp formatına dönüştürür. Tüm html dosyalarında değişiklikleri otomatik yapar. Siz sadece işin kodlama kısmına odaklanırsınız.

Live Reload özelliği sayesinde kodunuzu yazın ve kaydedin, ilgili sayfa otomatik olarak yenilenecek ve sayfanın güncel halini görüntüleyebileceksiniz.

QR Code özelliği sayesinde, sizin için oluşturulan QR Code görüntüsünü mobil cihazınızdan okutun ve değişiklikleri mobil cihazınızdan da anlık olarak takip edin.

Klasör yapısına uygun olarak kodlamanızı yapın ve `npm run build` çalıştırın. VS Code kullanıyorsanız `Ctrl + Shift + B` kullanın.

# Plugins

### `NMB Interactive JS`

This plugin is only 5KB in size. ☺️

The `NMBInteractiveJS` plugin is designed to handle interactive JavaScript elements within an HTML document. It allows for dynamic updates of variables and their corresponding DOM elements.

- Turkish

Bu eklenti yalnızca 5KB boyutundadır. ☺️

`NMBInteractiveJS` eklentisi, bir HTML belgesi içindeki etkileşimli JavaScript öğelerini işlemek için tasarlanmıştır. Değişkenlerin ve bunlara karşılık gelen DOM öğelerinin dinamik olarak güncellenmesine olanak tanır.

### Example

**JS**
```javascript
<script id="nmb-html-boiler-plate-js">
   let helloWorld = "Hello World";
</script>
<script src="assets/plugins/nmb-html-boiler-plate/nmb-interactive-js/nmb.interactive.min.js"></script>
```
**HTML**
```html
<h2>{{helloWorld}}</h2> 
```

**Result**
```html
<h2>Hello World</h2> 
```

Visit for further use cases; [NMB Interactive JS Documentation](https://nazimmertbilgi.github.io/nmb-html-boilerplate/#/plugins?id=nmbinteractivejs-nmb-interactive-js)

# Video - 1 ( Live Reload and QR Code )

https://github.com/user-attachments/assets/28de027c-0ec3-4e80-ad10-726982576b5c

# Video - 2 ( Build )

https://github.com/user-attachments/assets/705b49db-3bee-43ea-9a19-16529a9f3322

# Lets Try

- `git clone https://github.com/NazimMertBilgi/nmb-html-boilerplate firstAwesomeApp`
- `npm install`
- `npm start`

# Build

- `npm run build`
- `go to the /dist folder`

# Scripts
- `build`: Runs the build process using `node index.js`.
- `grunt`: Runs Grunt tasks.
- `copy:3rdplugins`: Copies third-party plugins from `./assets/plugins` to `./dist/assets/plugins` using `robocopy`.

# Keywords
- boilerplate
- html
- css
- js
- grunt
- minify
- bootstrap
- node

# Author
Nazım Mert Bilgi (https://github.com/NazimMertBilgi)

# License
ISC

# Dependencies
- `express`: ^4.21.1
- `qrcode`: ^1.5.4
- `serve-static`: ^1.16.2

# DevDependencies
- `connect-livereload`: ^0.6.1
- `grunt`: ^1.6.1
- `grunt-contrib-cssmin`: ^5.0.0
- `grunt-contrib-htmlmin`: ^3.1.0
- `grunt-contrib-uglify`: ^5.2.2
- `grunt-cwebp`: ^3.0.3
- `livereload`: ^0.9.3
- `nodemon`: ^3.1.7

