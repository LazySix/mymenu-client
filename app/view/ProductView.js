Ext.define('MyMenu.view.ProductView', {
    extend: 'Ext.Container',
    xtype : 'productview',
    config: {
        layout: 'vbox',
        items: [
            {   
                flex:1,
                xtype: 'button',
                text: 'Back',
                handler: function() {
                    this.up('menuview').setActiveItem(1);
                }
            },
            {
                flex:12,
                itemId: 'productcontainer',
                scrollable: true,
                xtype: 'container',
                tpl:"Product name:{name} <br> Product price: {price} <br> Product short description:{s_description} <br> Product description:{description}"
            },
            {
                flex:2,
                itemId: 'quantity',
                xtype:'selectfield',
                options: [
                    {text: '1',  value: '1'},
                    {text: '2',  value: '2'},
                    {text: '3',  value: '3'},
                    {text: '4',  value: '4'},
                    {text: '5',  value: '5'},
                    {text: '6',  value: '6'},
                    {text: '6',  value: '6'},
                    {text: '7',  value: '7'}
                ],
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
                    Ext.getStore('OrderStore').sync();
                    var newProductToOrder = {};
                    newProductToOrder[productId] = quantiyValue;

                    Ext.Ajax.request({
                        headers: {
                            'Authorization': 'Token aef455b223b8908217d2162ddf45181fadd8c1ab'
                        },
                        url: 'http://www.getideafrom.me/api/rest/post/' + Ext.getStore('TableStore').getAt(0).get('table_id') + '/',
                        params: JSON.stringify({
                            "action": "add_in_order", 
                            "products": newProductToOrder
                        }),
                        success: function(response){
                            var text = response.responseText;
                            // process server response here
                        }
                    });
                    Ext.Msg.alert('Message', 'The item was added to your order successful.', Ext.emptyFn);
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