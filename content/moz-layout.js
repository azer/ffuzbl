var
  toolbox = $('navigator-toolbox'),
  statusbar = $('status-bar')
;
function hide_moz_ui(){
  toolbox.style.display = 'none';
  statusbar.style.display = 'none';
  gBrowser.tabContainer.collapsed = true;
}

function show_moz_ui(){
  toolbox.style.display = '';
  statusbar.style.display = '';
  gBrowser.tabContainer.collapsed = false;
}
