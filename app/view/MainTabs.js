Ext.define('MyMenu.view.MainTabs', {
    extend: 'Ext.TabPanel',
    xtype: 'maintabs',
    config: {
        itemId:'maintabs',
        fullscreen: true,
        tabBarPosition: 'bottom',
        items: [
            {
                itemId: 'menu-tab',
                title: 'Menu',
                iconCls: 'home',
                xtype: 'menuview'
            },
            {
                title: 'Order',
                iconCls: 'user',
                xtype: 'orderview'
            }
        ]
    }
});