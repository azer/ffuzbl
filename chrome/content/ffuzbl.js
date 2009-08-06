const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);

//
function init(){
  init_navigator();
  commander.init();
  uzbl_bottombar = new Bottombar();
  uzbl_tabbar = new Tabbar();
}
addEventListener('load',init,false);
//


function $(id){
  return document.getElementById(id);
}

function copy_string(str){
  gClipboardHelper.copyString(str);
}

function curry(fn,scope,args){
  scope = scope||window;
  args = Array.prototype.slice.call(arguments,2);
  return function(){
    return fn.apply(scope,args.concat( Array.prototype.slice.call(arguments,0) ));
  }
}

function cut_str(str,len){
  var res = str;
  if(str.length>len){
    if(len>8){
      var mid = Math.round(len/2);
      res = str.substring(0,mid-2)+'...'+str.substring(str.length-(len-mid-2));
    } else if(len>4) {
      res = str.substring(0,3)+'..'
    } else
      res = str.substring(0,len);
  }
  return res;
}

function resolve_ip(host){
  var
    cls = Components.classes['@mozilla.org/network/dns-service;1'],
    iface = Components.interfaces.nsIDNSService,
    dns = cls.getService(iface),
    ip = '0.0.0.0',
    nsrecord = dns.resolve(host,false)
  ;
  if(nsrecord.hasMore()){
    ip = nsrecord.getNextAddrAsString();
  }
  return ip;
}

window.log = window.log||new Function('');
