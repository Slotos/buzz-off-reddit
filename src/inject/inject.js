// A naive implementation of attribute cleaner
// It monitors changes to document and it's children
// Looping through them, looking for elements with
// tracking url data attribute.
// When one is found, a remoteAttribute is called.
//
// Works with RES or any other endless scroll implementation
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    // Loop over added nodes (these can be actual trees)
    for (var i = 0, ilen = mutation.addedNodes.length; i < ilen; i++) {
      if (typeof mutation.addedNodes[i].querySelectorAll === 'undefined') continue;

      var tracking_elements = mutation.addedNodes[i].querySelectorAll('[data-inbound-url]');
      for (var j = 0, jlen = tracking_elements.length; j < jlen; j++) {
        tracking_elements[j].removeAttribute('data-inbound-url');
      }
    }
  });
});
var config = { childList: true, subtree: true };
observer.observe(document.documentElement, config)
