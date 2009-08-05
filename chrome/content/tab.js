function Tab(tabbar,firefox_tab){

  Tab.IdSeq+=1;

  this.tabbar = tabbar;
  this.firefox_tab = firefox_tab;
  this.firefox_tab.uzbl_tab = this;
  this.index = Array.prototype.indexOf.call(tabbar.firefox_tab_container.childNodes,firefox_tab);

  if(!this.id)
    this.id = Tab.IdSeq;

  this.create_elements();

  if(this.selected)
    this.select();
  
  // Listen Tab Progress
  firefox_tab.linkedBrowser.addProgressListener(
    new ProgressListener(this),
    Components.interfaces.nsIWebProgressListener.NOTIFY_ALL
  );

  this.browser.addEventListener('DOMTitleChanged',curry(this.refresh,this),false);

}
Tab.prototype  = {
  /*
   * Properties
   */
  get browser(){
    return this.firefox_tab.linkedBrowser;
  },
  get document(){
   return this.browser.contentDocument;
  },
  get id(){
    return this.firefox_tab.getAttribute('id');
  },
  set id(val){
    this.firefox_tab.setAttribute('id',val);
  },
  get label(){
    return this.firefox_tab.label;
  },
  get selected(){
    return this.firefox_tab.selected;
  },
  get title(){
    return this.label_element.childNodes[0].nodeValue;
  },
  set title(val){
    this.label_element.childNodes[0].nodeValue = val;
  },
  get ip(){
    return this._uri.host&&resolve_ip(this._uri.host)||"0.0.0.0";
  },
  get uri(){
    return this._uri.spec||this._uri;
  },
  set uri(val){
    this._uri = val;
  },
  '_uri':'about:blank',
  'tabbar':null,
  'index':0,
  'load_percent':0,
  'status_msg':'Done.',
  'firefox_tab':null,
  'hint_handler_initialized':false,
  'container_element':null,
  'index_element':null,
  'label_element':null,
  /*
   * Methods
   */
  'create_elements':function(){
    this.container_element = document.createElement('html:span');
    this.container_element.setAttribute('id','uzbl-tab-'+this.id);
    this.container_element.setAttribute('class','UZBLTab');

    this.index_element = document.createElement('html:span');
    this.index_element.setAttribute('class','UZBLTabIndex');
    this.index_element.appendChild( document.createTextNode(this.index+1) );

    this.label_element = document.createElement('html:span');
    this.label_element.setAttribute('class','UZBLTabLabel');
    this.label_element.appendChild( document.createTextNode(''+this.id) );

    this.container_element.appendChild( document.createTextNode('[') );
    this.container_element.appendChild(this.index_element);
    this.container_element.appendChild(this.label_element);
    this.container_element.appendChild( document.createTextNode(']'));
  },
  'deselect':function(){
    this.container_element.setAttribute('class','UZBLTab');
    this.tabbar.active_tab = null;
  },
  'init_hint_handler':function(){
    this.document.addEventListener('mousemove',curry(this.handle_hints,this),false);
  },
  'select':function(){
    this.container_element.setAttribute('class','UZBLTab UZBLTabSelected');
    this.tabbar.active_tab = this;
    this.refresh();
  },
  'refresh':function(){
    log('---------------');
    log(Number(new Date));
    log("refreshing tab#"+this.id+" isSelected?"+this.selected);
    this.title = cut_str(this.label, this.tabbar.label_width);
    if(this.selected){
      log(this.ip,this.load_percent,this.uri,this.status_msg);
      uzbl_bottombar.set_ip(this.ip);
      uzbl_bottombar.set_progress_value(this.load_percent);
      uzbl_bottombar.set_uri(this.uri);
      uzbl_bottombar.set_status_msg(this.status_msg);
    }
    log('..............');
  },
  'remove':function(){
    this.tabbar.content_element.removeChild(this.container_element);
  }
}

Tab.IdSeq = 10;