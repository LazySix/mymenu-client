Ext.define('MyMenu.view.ProductView', {
    extend: 'Ext.Container',
    xtype : 'productview',
    config: {
        layout: 'vbox',
        items: [
            {   
                flex:1,
                xtype: 'button',
                text: 'Back to product list',
                handler: function() {
                    Ext.Viewport.setActiveItem({
                        xtype : 'productlistpanel'
                    });
                }
            },
            {
                flex:1,
                xtype: 'button',
                text: 'Back to category list',
                handler: function() {
                    Ext.Viewport.setActiveItem({
                        xtype : 'categorylist'
                    });
                }
            },
            {
                flex:12,
                itemId: 'productcontainer',
                xtype: 'container',
                tpl:"Product name:{name} <br> Product price: {price} <br> Product short description:{s_description} <br> Product description:{description}"
            }
        ]
    },
    updateRecord: function(record) {
        var html = this.down('#productcontainer').getTpl().apply({
            name:record.get('name'),
            price:record.get('price'),
            description:record.get('full_description'),
            s_description:record.get('short_description')
        });

        this.down('#productcontainer').setHtml(html);
    }
});