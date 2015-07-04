Ext.define('MyMenu.view.MenuView', {
    extend: 'Ext.Panel',
    xtype: 'menuview',
    config: {
        layout:'card',
        itemId:'menuview',
        items: [
            {
                itemId: 'menu-view-categorylist',
                xtype: 'categorylist'
            },
            {
                itemId: 'menu-view-productlist',
                xtype: 'productlist'
            },
            {
                itemId: 'menu-view-productview',
                xtype: 'productview'
            }
        ]
    }
});