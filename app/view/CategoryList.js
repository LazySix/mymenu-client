Ext.define('MyMenu.view.CategoryList', {
    extend: 'Ext.dataview.List',
    xtype : 'categorylist',
    config: {
        itemTpl: '{name}',
        store: 'CategoryStore',
        listeners: {
            select: function( me, record, eOpts ){
                Ext.getStore('ProductStore').setFilters({property: "category_id", value: record.get('id')});
                Ext.Viewport.setActiveItem({
                    xtype : 'productlist'
                });
                me.deselectAll();
                // me.up('mainview').setActiveItem( 1 );
            },
        }
    }
});