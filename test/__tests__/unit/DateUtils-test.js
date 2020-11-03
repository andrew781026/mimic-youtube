const moment = require('moment');

const parse = (date, format = {origin: 'YYYY/MM/DD HH:mm:ss', dest: 'YYYY/MM/DD HH:mm:ss'})=> {

    if (date) return moment(date, format.origin).format(format.dest);
    else return date;
}


const parsedStr= parse('22:03',{origin: 'HH:mm',dest:'HH:mm:ss'});
console.log(parsedStr)