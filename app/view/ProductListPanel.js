Ext.define('MyMenu.view.ProductListPanel',{
    extend: 'Ext.Container',
    xtype: 'productlistpanel',
    fullscreen: true,
    config:{

        layout:'vbox',
        items: [
            {
                flex: 0,
                xtype:'button',
                text:'Back to categories',
                handler: function() {
                    Ext.Viewport.setActiveItem({
                        xtype : 'categorylist'
                    });
                }
            },
            {
                flex: 1,
                xtype: 'productlist'
            }
        ]
    }
})