// CJS stub for markdownlint main entry (ships as .mjs, breaks Jest CJS mode)
function applyFix(input) { return input; }
function applyFixes(input) { return input; }
function getVersion() { return '0.0.0'; }
function lint(options, callback) {
  if (typeof callback === 'function') callback(null, {});
  return {};
}
module.exports = { applyFix, applyFixes, getVersion, lint };
