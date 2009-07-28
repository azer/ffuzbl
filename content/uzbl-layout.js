var
  uzbl_bottombar = null
;

function show_uzbl_ui(){
  uzbl_bottombar.style.display = 'block';
}

function update_uzbl_ui(){
  //uzbl_bottombar.innerHTML=new Date();
}

function hide_uzbl_ui(){
  uzbl_bottombar.style.display = 'none';
}

function sel_uzbl_ui(){
  uzbl_bottombar = $('uzbl-bottombar');
}

addEventListener('DOMContentLoaded',sel_uzbl_ui,false);
