Ext.define('MyMenu.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'mainview',
    fullscreen: true,
    config: {
        itemId:'mainview',
        layout: 'card',
        items: [
            {
                xtype: 'categorylist'
            },
            {
                html: "scanbarcode"
            }
        ]
    }
});
