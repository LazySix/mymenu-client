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
            },
            {
                flex:2,
                itemId: 'quantity',
                xtype:'textfield',
                label:'Quantity'
            },
            {
                flex:2,
                xtype: 'button',
                text: 'Order now',
                handler: function() {
                    var quantiyValue = this.up('productview').down('#quantity').getValue();
                    var productId = this.up('productview').getRecord().get('id');
                    Ext.getStore('OrderStore').add({ product_id: productId, quantity: quantiyValue});
                    var newProductToOrder = {};
                    newProductToOrder[productId] = quantiyValue;

                    Ext.Ajax.request({
                        url: 'http://www.getideafrom.me/api/rest/post/' + Ext.getStore('TableStore').getAt(0).get('table_id') + '/',
                        params: {
                            "action": "add_in_order", 
                            "products": newProductToOrder
                        },
                        success: function(response){
                            var text = response.responseText;
                            // process server response here
                        }
                    });
                    Ext.Msg.alert('Message', 'The item was added to your order successful.', Ext.emptyFn);
                }
            },
            {
                xtype:'button',
                text: 'View Current Order',
                handler: function() {
                    Ext.Viewport.setActiveItem({
                        xtype : 'orderview'
                    });
                }
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