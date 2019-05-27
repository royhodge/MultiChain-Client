// Electron Code...adapted a little
// Awesome!!

const links = document.querySelectorAll('link[rel="import"]');
// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {
  let template = link.import.querySelector('.html-content');
  let clone = document.importNode(template.content, true);

  // Good function to manage many displays

  switch (link.classList.value) {
    case `tabs`:     
      document.querySelector('#topNavRoot').appendChild(clone);
      break;
    case `loading`:     
      document.querySelector('#loading').appendChild(clone);
      break;
    default:
      document.querySelector('#contentRoot').appendChild(clone);
      break;
  }
});