// Electron Code...adapted a little
// Awesome!!

const links = document.querySelectorAll('link[rel="import"]');


// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {
  let template = link.import.querySelector('.html-content');
  let clone = document.importNode(template.content, true);

  // Good function to manage many displays

  if (link.href.match('login.html')) {
    let b = document.querySelector('body')
    b.insertBefore(clone, b.childNodes[0]);
  }
  if (link.href.match('tabs.html')) {
    document.querySelector('#topNav').appendChild(clone);
  }
  else {
    document.querySelector('#content').appendChild(clone);
  }
});


