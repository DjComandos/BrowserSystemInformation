/**
 * author: Mikita Manko / MikitaManko.com / gmail@MikitaManko.com
 * source: https://github.com/DjComandos/BrowserSystemInformation
 */

 /**
  * Wrap lib functionality with simple noconflict\context pattern.
  * @param {!Object} context The context for the library.
  * @param {!string} libraryName The name of the library object.
  */
 ~function(context, libraryName, document, navigator){
    var bsInf = context[libraryName] = {};

    bsInf.browser = getBrowser();
    bsInf.os = getOs();

    function getBrowser(){
      var result = {};
      var browsers = [
        { name: 'chrome', test: /Chrome\/([\d.]+)/ }
        ,{ name: 'chrome', test: /CriOS\/([\d.]+)/ }
        ,{ name: 'firefox', test: /Firefox\/([\d.]+)/ }
        ,{ name: 'safari', test: /Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/}
        ,{ name: 'safari', test: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/}
        ,{ name: 'ie', test: /MSIE\s([\d.]+)/}
        ,{ name: 'ie', test: /Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/}
      ];

      for(var i = 0, len = browsers.length; i < len; i++) {
        var match = navigator.userAgent.match(browsers[i].test);
        if(!!match) {
          result.name = browsers[i].name;
          result.version = match[1];
          return result;
        }
      }

      if(!(window.ActiveXObject) && "ActiveXObject" in window) {
        result.name = 'ie';
        result.version = '11';
      }

      return result;
    }

    function getOs(){
      var result = {};

      // TODO: implement it.

      return result;
    }

 }(window, 'bsInf', document, navigator);