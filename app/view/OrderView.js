Ext.define('MyMenu.view.OrderView',{
    extend: 'Ext.Container',
    xtype: 'orderview',
    fullscreen: true,
    config:{

        layout:'vbox',
        items: [
            {
                flex: 1,
                xtype:'container',
                layout:'hbox',
                items: [
                    {
                        flex: 1,
                        itemId:'total-price',
                        xtype:'container'
                    },
                    {
                        flex: 1,
                        xtype: 'button',
                        text: 'Pay',
                        handler: function() {
                            if (Ext.getStore('TableStore').getAllCount() > 0) {
                                var tableId = Ext.getStore('TableStore').getAt(0).get('table_id')
                                Ext.Ajax.request({
                                    url: 'http://www.getideafrom.me/api/rest/post/' + tableId + '/',
                                    headers: {
                                        'Authorization': 'Token aef455b223b8908217d2162ddf45181fadd8c1ab'
                                    },
                                    params:'{"action":"pay_the_bill"}',
                                    success: function(response){
                                        Ext.Msg.show({
                                           title: 'Pay the bill',
                                           message: "Thank you for using MyMenu! <br> Waitress will bring your bill soon. <br>",
                                           fullscreen: true,
                                           hideAnimation: null,
                                           buttons: Ext.MessageBox.OK,
                                               fn: function(buttonId) {
                                                    Ext.getStore('TableStore').removeAll();
                                                    Ext.getStore('TableStore').sync();
                                                    Ext.getStore('OrderStore').removeAll();
                                                    Ext.getStore('OrderStore').sync();
                                                    window.location.reload();
                                               }
                                        });
                                    }
                                });
                            }
                        }
                    }
                ]
            },
            {
                flex: 11,
                itemId: 'ordercontainer',
                scrollable: true,
                xtype: 'container',
                html: 'No orders'

            }
        ],
        listeners: {    
            show: function() {
                var containerHtml = [];
                var totalPrice = 0;
                Ext.getStore('OrderStore').each(function(record){
                    var orderProduct = Ext.getStore('ProductStore').findRecord('id', record.get('product_id'));
                    if (typeof orderProduct !== 'undefined' && orderProduct) {
                        var currentPrice = record.get('quantity') * parseFloat(orderProduct.get('price'),10);
                        totalPrice += currentPrice;
                        containerHtml.push(
                            record.get('quantity') + ' x ' + orderProduct.get('name') + ' - ' + currentPrice + ' lv.'
                        );
                    }
                });
                if (containerHtml.length == 0) {
                    containerHtml.push(
                       'No orders'
                        );
                }
                this.down('#ordercontainer').setHtml(containerHtml.join('<br>'));
                this.down('#total-price').setHtml('Total price: ' + totalPrice + 'lv.');
            }
        }
    }
})