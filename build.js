const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const colorFunction = require("postcss-color-function")

const spacers = require("spacers");

fs.readdir( path.join(__dirname, 'src', 'lib'), (err, files) => {
  files.forEach(fileName=>{

    const name = path.basename(fileName, '.css');

    fs.readFile(`src/guide.html`, (err, html) => {
      html = html.toString().replace(/<%= theme %>/g, name);
      fs.writeFile(`dist/${name}.html`, html);
    });

    spacers.writeFile(`dist/spacers.css`);

    fs.readFile(`src/style.css`, (err, css) => {
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
