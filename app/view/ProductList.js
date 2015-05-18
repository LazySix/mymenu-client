Ext.define('MyMenu.view.ProductList', {
    extend: 'Ext.dataview.List',
    xtype : 'productlist',
    config: {
        itemTpl: '{name}',
        store: 'ProductStore',
        listeners: {
            select: function( me, record, eOpts ){

                me.deselectAll();
                Ext.Viewport.setActiveItem({
                    xtype : 'productview',
                    record: record
                });
            }
        }
    }
});