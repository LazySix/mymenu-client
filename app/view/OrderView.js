Ext.define('MyMenu.view.OrderView',{
    extend: 'Ext.Container',
    xtype: 'orderview',
    fullscreen: true,
    config:{

        layout:'vbox',
        items: [
            {
                flex: 1,
                xtype:'button',
                text:'Back to categories',
                handler: function() {
                    Ext.Viewport.setActiveItem({
                        xtype : 'categorylist'
                    });
                }
            },
            {
                flex: 11,
                itemId: 'ordercontainer',
                xtype: 'container',
                html: 'dad'
            }
        ],
        listeners: {    
            show: function() {
                var containerHtml = [];
                Ext.getStore('OrderStore').each(function(record){
                    containerHtml.push(
                        Ext.getStore('ProductStore').findRecord('id', record.get('product_id')).get('name')
                    );
                });
                this.down('#ordercontainer').setHtml(containerHtml.join('<br>'));
            }
        }
    }
})