(function(){

  var el = null;
  var data = [];
  var data_dir = [];

  var append = function(str){
    el.setAttribute('value',el.getAttribute('value')+'\n'+str)
  }

  var createEl = function(){
    el = document.createElement('textbox');
    document.getElementById('main-window').appendChild(el);
    el.setAttribute('multiline','true');
    el.style.height = '200px'
    el.setAttribute('id','logbox');
  }

  window.log = function(){
    if(el)
      append(Array.prototype.join.call(arguments,', '));
    else
      data.push(arguments);
  }

  window.log.dir = function(obj){

    if(!el){
      data_dir.push(obj);
      return;
    }
    append('============')
    append('= DIR: '+obj)
    append('============')
    for(var key in obj){
      append('= '+key+': '+obj[key])
    }
    append('============')
  }

  addEventListener('DOMContentLoaded',function(){
    el = document.getElementById('logbox');
    if(!el){
      createEl();
    }
    for(var i=0,len=data.length; i<len; i++){
      log.apply(window,data[i]);
    }
    data = [];
    log(data_dir);
    for(var i=0,len=data_dir.length; i<len; i++){
      log.dir(data_dir[i]);
    }
    data_dir = [];

  },false);

 })();