const moment = require('moment')

module.exports = {
  truncate: (str, len) => {
    if (str.length > len && str.length > 0) {
       let new_str = str.substring(0, len - 1)
       return new_str + '…'
    }
    return str
  },
  stripTags: (input) => {
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  formatDate: (date, format) => {
    return moment(date).format(format)
  },
  select: function(selected, options){
    return options.fn(this).replace( new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace( new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
  }
}
