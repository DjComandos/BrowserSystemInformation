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

    bsInf.browser = getBrowser(navigator.userAgent, window);
    bsInf.os = getOs(navigator.userAgent);

    function getBrowser(ua, window){
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

      for(var i = 0, match, len = browsers.length; i < len; i++) {
        if(!!(match = ua.match(browsers[i].test))) {
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
    // Make available to unit tests.
    bsInf.__getBrowser = getBrowser;

    function getOs(ua){
      var result = {};
      var oss = [
        {name:'osx', test: /\(Macintosh\; Intel /}
        ,{name: 'android', test: /(Android);?[\s\/]+([\d.]+)?/}
        ,{name: 'webos', test: /(webOS|hpwOS)[\s\/]([\d.]+)/}
        ,{name: 'kindle', test: /Kindle\/([\d.]+)/}
        ,{name: 'blackberry', test: /(BlackBerry).*Version\/([\d.]+)/}
        ,{name: 'playbook', test: /PlayBook/}
        ,{name: 'rimtabletos', test: /(RIM\sTablet\sOS)\s([\d.]+)/}
        ,{name: 'bb10', test: /(BB10).*Version\/([\d.]+)/}
        ,{name: 'silk', test: /Silk\/([\d._]+)/}
      ];

      for(var i = 0, match, len = oss.length; i < len; i++) {
        if(!!(match = ua.match(oss[i].test))) {
          result.name = oss[i].name;
          result.version = match[2] || match[1] || '-';
          return result;
        }
      }

      // TODO: implement it for windows.
      return result;
    }
    // Make available to unit tests.
    bsInf.__getOs = getOs;


 }(window, 'bsInf', document, navigator);