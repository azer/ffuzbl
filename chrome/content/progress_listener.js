const STATE_START = Components.interfaces.nsIWebProgressListener.STATE_START;
const STATE_STOP = Components.interfaces.nsIWebProgressListener.STATE_STOP;

var ProgressListener = function(tab){
 this._tab = tab;
}
ProgressListener.prototype  = {
  _tab:null,
  get tab(){
    return this._tab||uzbl_tabbar.active_tab;
  },
  QueryInterface: function(aIID){
    if (   aIID.equals(Components.interfaces.nsIWebProgressListener) ||
           aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
           aIID.equals(Components.interfaces.nsISupports)   )
    {
      return this;
    }

    throw Components.results.NS_NOINTERFACE;
  },
  onStateChange:function(aWebProgress, aRequest, aFlag, aStatus){
    if(aFlag & STATE_STOP){
      this.tab.status_msg = 'Done.';
      this.tab.refresh();
    }
  },
  onLocationChange:function(aProgress,aRequest,aURI){},
  onProgressChange:function(aWebProgress,aRequest,aCurSelf,aMaxSelf,aCurTotal,aMaxTotal){
    log('EV.PRG',aCurTotal,aMaxTotal);
    this.tab.load_percent = Math.round((aCurTotal* 100) / aMaxTotal);
    this.tab.refresh();
  },
  onStatusChange:function(aWebProgress, aRequest, aStatus, aMessage){
    log('EV.STATUS',aMessage);
    this.tab.status_msg = aMessage;
    this.tab.refresh();
  },
  onSecurityChange:function(){}
};
