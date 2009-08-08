var commander = {
  cmd_map : {},
  init:function(){
    addEventListener('keypress',this.navigate,false);
  },
  navigate:function(event_args){
    var
      keyCode = event_args.keyCode,
      charCode = event_args.charCode
      ;
    switch(keyCode){
      // esc
      case COMMANDER_FOCUS_KEYCODE:
        commander.reset();
        break;
    }
  },
  listenInput:function(event_args){
    var keyCode = event_args.keyCode;
    if(keyCode==COMMANDER_EXECUTE_KEYCODE){
      commander.execute( uzbl_bottombar.input_element.value );
      commander.reset();
    } else {
      commander.display();
    }
  },
  execute:function(cmd_comp){
    var cmd,cmd_name,cmd_args;
    cmd =  cmd_comp.split(' ');
    cmd_name = cmd[0];
    cmd_args = cmd.slice(1);
    log('executing '+cmd_name+' '+cmd_args[0]);
    if(this.cmd_map[cmd_name]){
      this.cmd_map[cmd_name].apply(window,cmd_args);
    }
  },
  reset:function(){
    uzbl_bottombar.input_element.value = '';
    this.setCommandLineText('');
    this.focus();
  },
  focus:function(){
    uzbl_bottombar.input_element.focus();
  },
  setCommandLineText:function(str){
    uzbl_bottombar.commandline_element.setAttribute('value',str);
  },
  display:function(){
    this.setCommandLineText(uzbl_bottombar.input_element.value);
  }
}
