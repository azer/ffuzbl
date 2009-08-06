function Tabbar(){
  this.container_element = $('uzbl-tabbar');
  this.content_element = $('uzbl-tabbar-content');

  if(this.tab_count){
    this.clean();

    for(var i=0,len=this.tab_count; i<len; i++){
      this.create_tab(null,this.firefox_tab_container.childNodes[i]);
    }

  }
  this.firefox_tab_container.addEventListener("TabSelect", curry(this.select_tab,this), true);
  this.firefox_tab_container.addEventListener("TabClose", curry(this.close_tab,this), true);
  this.firefox_tab_container.addEventListener("TabOpen", curry(this.create_tab,this), true);
}
Tabbar.prototype = {
  /*
   * Properties
   */
  get viewport(){
    return $('main-window').boxObject.width;
  },
  get firefox_tab_container(){
    return gBrowser.tabContainer;
  },
  get tab_count(){
    return this.firefox_tab_container.childNodes.length;
  },
  get tab_width(){
    return Math.round(this.viewport/this.tab_count);
  },
  get label_width(){
    return Math.round((this.tab_width-Tabbar.TAB_WIDTH_SUBTRAHEND)/Tabbar.FONT_SIZE);
  },
  'container_element':null,
  'content_element':null,
  'active_tab':null,
  /*
   * Methods
   */
  'clean':function(){
    if(this.content_element)
      this.container_element.removeChild(this.content_element);
    this.content_element = document.createElement('html:div');
    this.content_element.setAttribute('id','uzbl-tabbar-content');
    this.container_element.appendChild(this.content_element);
  },
  'create_tab':function(aEvent,fftab){
    fftab = fftab||aEvent.target;
    var tab = new Tab(this,fftab);
    this.content_element.appendChild( tab.container_element );
    this.refresh();
  },
  'refresh':function(){
    for(var i=0,len=this.tab_count; i<len; i++){
      this.firefox_tab_container.childNodes[i].uzbl_tab.refresh();
    }
  },
  'close_tab':function(aEvent){
    aEvent.target.uzbl_tab.remove();
  },
  'select_tab':function(aEvent,fftab){
    fftab = fftab||aEvent.target;
    var tab = fftab.uzbl_tab;
    if(this.active_tab)
      this.active_tab.deselect();
    tab.select();
    tab.refresh();
  },
  'show':function(){
    this.container_element.style.display = 'block';
  },
  'hide':function(){
    this.container_element.style.display = 'none';
  }
};

Tabbar.FONT_SIZE = 10;
Tabbar.TAB_WIDTH_SUBTRAHEND = 20;
