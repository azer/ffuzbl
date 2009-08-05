function Bottombar(){
  this.container_element = $('uzbl-bottombar');
  this.input_element = $('uzbl-input');
  this.commandline_element = $('uzbl-commandline');
  this.progressbar_element = $('uzbl-progressbar');
  this.uri_element = $('uzbl-uri');
  this.status_element = $('uzbl-status');
  this.ip_element = $('uzbl-tab-ip');
  this.hint_element = $('uzbl-hint');

  addEventListener('keypress',commander.navigate,false);
  this.input_element.addEventListener('keyup',commander.listenInput,false);

  $('browser').addEventListener('mousemove',curry(this.handle_hints,this),false);
  $('browser').addEventListener('mouseout',curry(this.set_hint,this,''), false );
}
Bottombar.prototype = {
  // properties
  'container_element':null,
  'input_element':null,
  'commandline_element':null,
  'progressbar_element':null,
  'uri_element':null,
  'status_element':null,
  'ip_element':null,
  'hint_element':null,
  // methods
  'set_ip':function(id){
    this.ip_element.setAttribute('value',id);
  },
  'set_status_msg':function(msg){
    this.status_element.setAttribute('value',msg);
  },
  'set_uri':function(uri){
    this.uri_element.setAttribute('value',cut_str(uri,50));
  },
  'set_hint':function(text){
    this.hint_element.setAttribute('value',cut_str(text,50));
  },
  'set_progress_value':function(percentage){
    var
      view = "",
      eq = Math.round(percentage/10),
      dot = 10-eq
    ;
    for(i=0;i<10;i++){
      if(i<=eq){
        view+='=';
      } else
        view+='.';
    }
    this.progressbar_element.childNodes[0].nodeValue = view;
  },
  'hide':function(){
    this.container_element.style.display = 'none';
  },
  'show':function(){
    this.container_element.style.display = 'block';
  },
  'handle_hints':function(aEvent){
    if(!is_enabled)
      return false;
    var
      el = aEvent.target,
      attr = Bottombar.HINT_MAP[el.tagName],
      hint = el.tagName+( !attr?'':'.'+attr+'='+el.getAttribute(attr) )
    ;
    this.set_hint(hint);
  }
};

Bottombar.HINT_MAP = {
  // tag name, attribute to display
  'A':'href',
  'IMG':'src',
  'FORM':'action',
  'INPUT':'name',
  'TEXTAREA':'name'
}