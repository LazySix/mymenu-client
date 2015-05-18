Ext.define('MyMenu.view.ProductView', {
    extend: 'Ext.Container',
    xtype : 'productview',
    config: {
        html:'I am product'
    },
    updateRecord: function(record) {
        console.log(record.get('name'));
    }
});