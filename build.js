const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const colorFunction = require("postcss-color-function")

// convert all precss things to real css
fs.readdir( path.join(__dirname, 'src', 'lib'), (err, files) => {

  files.forEach(fileName=>{
    console.log(fileName);

    fs.readFile(`src/main.css`, (err, css) => {

      css = `@import "./lib/${fileName}";\n\n` + css;

        postcss([ precss, colorFunction, autoprefixer ])
        .process(css, { from: `src/${fileName}` /* <- pretend filename */, to: `dist/${fileName}` })
        .then(result => {
            fs.writeFile(`dist/${fileName}`, result.css);
            if ( result.map ) fs.writeFile(`dist/${fileName}.map`, result.map);
        }).catch(err => console.error(err) );

    });


  })

});

// fs.readFile('src/app.css', (err, css) => {
//
//     postcss([ precss, colorFunction, autoprefixer ]).process(css, { from: 'src/app.css', to: 'dist/app.css' })
//     .then(result => {
//         fs.writeFile('dist/app.css', result.css);
//         if ( result.map ) fs.writeFile('dist/app.css.map', result.map);
//     }).catch(err=>console.error(err));
//
// });
