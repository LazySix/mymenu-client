Ext.define('MyMenu.store.TableStore',{
    extend: 'Ext.data.Store',
    config: {
        autoSync: true,
        fields: [
            'table_id',
            'table_code',
            'menu_id'
        ],
        proxy: {
            type: 'localstorage',
            id  : 'mymenu-tables'
        }
    }

})