var removeDiacritics = require('diacritics').remove;

function createSlug(str) {
  str = removeDiacritics(str)
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/['"]/g, '')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-/, '')
        .replace(/-$/, '');
  return str;
}

module.exports = createSlug;
