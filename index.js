
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const select = require('postcss-select')

module.exports = function({theme, type}){
    let cssFilePath = path.join(__dirname, 'dist', `${theme}.css`);
    let cssSelector = `.${type}`;

    // EXTRACT DECLARATIONS FOR cssSelector FROM cssFilePath AND RETURN AS STRING
    let myCss = fs.readFileSync(cssFilePath);
    let response = postcss([select([cssSelector])]).process(myCss).css
    response = response.replace(new RegExp(`${cssSelector} {`), '');
    response = response.replace(new RegExp(`}$`, 'm'), '');
    response = response.trim();
    return response;
}
