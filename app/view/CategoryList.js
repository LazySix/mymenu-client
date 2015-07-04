Ext.define('MyMenu.view.CategoryList', {
    extend: 'Ext.dataview.List',
    xtype : 'categorylist',
    config: {
        itemTpl: '{name}',
        store: 'CategoryStore',
        listeners: {
            select: function( me, record, eOpts ){
                var productStore = Ext.getStore('ProductStore');
                productStore.clearFilter();
                productStore.filter('category_id', record.get('id'));
                this.up('menuview').setActiveItem(1);
                me.deselectAll();
            }
        }
    }
});