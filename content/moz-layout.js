var
  $ = new Function("id","return document.getElementById(id)"),
  toolbox = $('navigator-toolbox'),
  statusbar = $('status-bar')
;

/*
 * UI FUNCTIONS
 */
function hide_moz_ui(){
  toolbox.style.display = 'none';
  statusbar.style.display = 'none';
}

function show_moz_ui(){
  toolbox.style.display = '';
  statusbar.style.display = '';
}
