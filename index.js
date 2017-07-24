module.exports = function({theme, type}){

    let cssFilePath = `./dist/${theme}.css`;
    let cssSelector = `.${type}`;

    // EXTRACT DECLARATIONS FOR cssSelector FROM cssFilePath AND RETURN AS STRING

    return `
      border: 1px solid orange;
      background-color: red;
    `;

}
