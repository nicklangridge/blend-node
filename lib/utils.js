var removeDiacritics = require('diacritics').remove;

module.exports = {

  createSlug: function(str) {
    str = removeDiacritics(str);
    str = str.toLowerCase();
    str = str.replace(/&/g, 'and');
    str = str.replace(/['"]/g, '');
    str = str.replace(/[^a-z0-9]/g, '-');
    str = str.replace(/-+/g, '-');
    str = str.replace(/^-/, '');
    str = str.replace(/-$/, '');
    return str;
  }

};