Ext.define('MyMenu.view.ProductList', {
    extend: 'Ext.Panel',
    xtype : 'productlist',
    config: {
        layout: 'vbox',
        items:[
            {
                flex:1,
                xtype: 'button',
                text: 'Back',
                handler: function() {
                    this.up('menuview').setActiveItem(0);
                }
            },
            {
                flex:11,
                xtype: 'list',
                itemTpl: '{name}',
                store: 'ProductStore',
                listeners: {
                    select: function( me, record, eOpts ){

                        me.deselectAll();

                        this.up('menuview').setActiveItem({
                            xtype : 'productview',
                            record: record
                        });
                    }
                }
            }
        ]
    }
});