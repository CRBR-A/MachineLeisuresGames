// Raccoon docs viewer
'use strict';

function rcn_docs_ed() {
  rcn_docs_ed.prototype.__proto__ = rcn_window.prototype;
  rcn_window.call(this);
  this.iframe = document.createElement('iframe');
  this.iframe.src = 'docs.html';
  this.add_child(this.iframe);
}

rcn_docs_ed.prototype.title = 'Documentation';
rcn_docs_ed.prototype.type = 'docs_ed';

rcn_docs_ed.prototype.lookup = function(key) {
  this.iframe.src = 'docs.html#' + key; //location.origin + 
}

rcn_editors.push(rcn_docs_ed);
