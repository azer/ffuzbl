var is_enabled = false;

function navigate(event_obj){
  var
    keyCode = event_obj.keyCode,
    charCode = event_obj.charCode
  ;

  switch(keyCode){
    case 120:
      toggle();
      break;
  }
}

function enable(){
  hide_moz_ui();
  show_uzbl_ui();
  commander.reset();
  is_enabled = true;
}

function disable(){
  show_moz_ui();
  hide_uzbl_ui();
  is_enabled = false;
}

function toggle(){
  if(is_enabled)
    disable();
  else
    enable();
}

function init_navigator(){
  addEventListener('keypress',navigate,false);
}
