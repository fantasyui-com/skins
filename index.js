module.exports = function({theme, type}){

    let cssFilePath = `./themes/${theme}`;
    let cssSelector = `.${type}`;

    // EXTRACT DECLARATIONS FOR cssSelector FROM cssFilePath AND RETURN AS STRING

    return `
      border: 1px solid orange;
      background-color: red;
    `;

}
