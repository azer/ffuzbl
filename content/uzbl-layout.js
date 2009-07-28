var
  uzbl_bottombar = null,
  uzbl_tabbar = null
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
}

addEventListener('DOMContentLoaded',sel_uzbl_ui,false);
