export function countriesListMurkup(arr) {
  const countriesMurkup = arr
    .map(({ code, country }) => {
      return `<option value=${code}>${country}</option> `;
    })
    .join('');
  return countriesMurkup;
}
