// CJS stub for stylelint (ships as .mjs in v17, breaks Jest CJS mode)
async function lint() {
  return { results: [], report: '', errored: false };
}
const stylelint = { lint };
module.exports = stylelint;
module.exports.default = stylelint;
module.exports.lint = lint;
