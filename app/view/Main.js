Ext.define('MyMenu.view.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',
    config: {
        itemId:'mainview',
        layout: 'vbox',
        items: [
            {
                flex:5,
                html:"Welcome!"
            },
            {
                flex:1,
                xtype: 'button',
                text:'Menu',
                handler: function() {
                    Ext.Viewport.setActiveItem({
                        xtype : 'maintabs'
                    });
                }
            },
            {
                flex:1,
                xtype: 'button',
                text:'Orders',
                handler: function() {
                    Ext.Viewport.setActiveItem({
                        xtype : 'orderview'
                    });
                }
            },
            {
                xtype: 'container',
                flex:2
            }
        ]
    }
});
