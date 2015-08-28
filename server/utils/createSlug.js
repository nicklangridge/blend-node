// creates a clean, url-safe, slug from a given string

var removeDiacritics = require('diacritics').remove;

function createSlug(str) {
  return removeDiacritics(str)
         .toLowerCase()
         .replace(/&/g, 'and')
         .replace(/['"]/g, '')
         .replace(/[^a-z0-9]/g, '-')
         .replace(/-+/g, '-')
         .replace(/^-/, '')
         .replace(/-$/, '');
}

module.exports = createSlug;
