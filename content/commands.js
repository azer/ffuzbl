var commands = {};

commands.copy_uri = function(){
  copy_string( uzbl_tabbar.active_tab.uri );
}

commands.eval = function(cmd){
  eval(cmd);
}

commands.toggle_firebug = function(){
  cmd_toggleFirebug();
}

commands.open_help = function(){
  commands.open_url_in_new_tab('chrome://ffuzbl/content/help.html');
}

commands.open_about = function(){
 commands.open_url_in_new_tab('chrome://ffuzbl/content/help.html#about');  
}

commands.open_url = function(){
  var url= Array.prototype.join.call(arguments,' ');
  openUILink(url);
}
commands.open_url_in_new_tab = function(url){
  gBrowser.selectedTab = gBrowser.addTab(url||'about:blank');
}