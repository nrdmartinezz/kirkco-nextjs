const url = 'https://kirkcocorp.com/equipment-options/adhesives-sealants/two-component/';
const html = await fetch(url).then((r) => r.text());
const idx = html.indexOf('View Product');
console.log('first View Product at', idx);
console.log(html.slice(idx - 400, idx + 200));
