var
  toolbox = null,
  bottombox = null,
  statusbar = null
;

function init_moz_layout(){
  toolbox = $('navigator-toolbox');
  bottombox = $('browser-bottombox');
  statusbar = $('status-bar');
}

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
