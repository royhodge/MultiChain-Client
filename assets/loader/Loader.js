const dom = require('../DOM');
// 
// 
dom.appendTop(document.body,'div','loadingModal'); 
dom.newEl(loadingModal,'div','loaderContent'); 
let el = dom.newEl(loaderContent,'div','loader-1'); 
dom.newEl(el,'div','loader'); 