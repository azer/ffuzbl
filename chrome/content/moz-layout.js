var
  toolbox = $('navigator-toolbox'),
  bottombox = $('browser-bottombox'),
  statusbar = $('status-bar')
;
function hide_moz_ui(){
  toolbox.collapsed = true;
  statusbar.collapsed = true;
  gBrowser.tabContainer.collapsed = true;
}

function show_moz_ui(){
  toolbox.collapsed = false;
  statusbar.collapsed = false;
  gBrowser.tabContainer.collapsed = false;
}
