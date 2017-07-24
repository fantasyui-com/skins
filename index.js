
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const declarations = require('select-declarations')

module.exports = function({theme, type}){
    const file = path.join(__dirname, 'dist', `${theme}.css`);
    const css = fs.readFileSync(file);
    const selector = `.${type}`;
    let response = declarations(css, selector);
    return response;
}
