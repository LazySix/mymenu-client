Ext.define('MyMenu.view.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',
    config: {
        itemId:'mainview',
        layout: 'vbox',
        items: [
            {
                flex:1,
                html:"Welcome!"
            },
            {
                flex:1,
                xtype: 'button',
                text:'Scan barcode',
                handler: function() {
                    try{

                        cordova.plugins.barcodeScanner.scan(
                            function (result) {
                                // alert("We got a barcode\n" +
                                //     "Result: " + result.text + "\n" +
                                //     "Format: " + result.format + "\n" +
                                //     "Cancelled: " + result.cancelled);
                                Ext.Msg.alert('Thank you', 'Welcome on table '+ result.text, Ext.emptyFn);
                                Ext.Viewport.setActiveItem({
                                    xtype : 'categorylistpanel'
                                });
                            }, 
                            function (error) {
                                alert("Scanning failed: " + error);
                            }
                        );
                    }catch(e){
                        alert(e);
                    }
                }
            }
        ],
    }
});
