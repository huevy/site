angular.module('huyovy').factory('htmlChunk', function($compile) {
  return function htmlChunk(scope, html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    var dom = $compile(div)(scope);
    return dom[0];
  };
});