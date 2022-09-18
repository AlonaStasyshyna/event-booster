export function countriesListMarkup(arr) {
  const countriesMarkup = arr
    .map(({ code, country }) => {
      return `<option value=${code} style="background-color: gray; color: #ffffff">${country}</option> `;
    })
    .join('');
  return countriesMarkup;
}
