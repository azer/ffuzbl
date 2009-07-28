var
  uzbl_bottombar = null,
  uzbl_tabbar = null,
  uzbl_input = null
;

function show_uzbl_ui(){
  uzbl_bottombar.style.display = 'block';
  uzbl_tabbar.style.display = 'block';
}

function update_uzbl_ui(){
  //uzbl_bottombar.innerHTML=new Date();
}

function hide_uzbl_ui(){
  uzbl_bottombar.style.display = 'none';
  uzbl_tabbar.style.display = 'none';
}

function sel_uzbl_ui(){
  uzbl_bottombar = $('uzbl-bottombar');
  uzbl_tabbar = $('uzbl-tabbar');
  uzbl_input = $('uzbl-input')
}

function reg_listeners(){
  addEventListener('keypress',commander.navigate,false);
}

function set_input_focus(){
  uzbl_input.focus();
}

var commander = {
  cmd_map: { 'o':openUILink },
  value:'',
  navigate:function(event_args){
    var
      keyCode = event_args.keyCode,
      charCode = event_args.charCode
    ;
    switch(keyCode){
      case 13:
        this.execute();
        break;
    }
    this.clean();
  },
  execute:function(cmd_comp){
    var cmd,cmd_name,cmd_args;
    cmd =  cmd_comp.split(' ');
    cmd_name = cmd[0];
    cmd_args = cmd.slice(1);

    if(this.cmd_map[cmd_name]){
      this.cmd_map[cmd_name].apply(window,cmd_args);
    }
  },
  clean:function(){}
}


addEventListener('DOMContentLoaded',sel_uzbl_ui,false);
addEventListener('DOMContentLoaded',reg_listeners,false);
addEventListener('DOMContentLoaded',set_input_focus,false);

