Ext.define('MyMenu.store.OrderStore',{
    extend: 'Ext.data.Store',
    config: {
        model: 'MyMenu.model.Order',
        proxy: {
            type: 'localstorage',
            id  : 'mymenu-orders'
        }
    }
})