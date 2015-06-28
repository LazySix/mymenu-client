/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'MyMenu',

    requires: [
        'Ext.MessageBox',
        'Ext.Container',
        'MyMenu.reader.MyMenuReader'
    ],

    models: [
        'Place',
        'Category',
        'Product',
        'Order'
    ],

    stores:[
        'MenuStore',
        'CategoryStore',
        'ProductStore',
        'OrderStore',
        'TableStore'
    ],

    views: [
        'Main',
        'CategoryList',
        'ProductList',
        'ProductView',
        'ProductListPanel',
        'OrderView'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        var store = Ext.create('Ext.data.Store', {
            model: "MyMenu.model.Place"
        });
        store.load();
        Ext.Viewport.add(
            {
                xtype: 'mainview'
            },
            {
                xtype: 'categorylist'
            },
            {
                xtype: 'productlist'
            },
            {
                xtype: 'orderview'
            }
        );
        Ext.fly('appLoadingIndicator').destroy();

        try{
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    // alert("We got a barcode\n" +
                    //     "Result: " + result.text + "\n" +
                    //     "Format: " + result.format + "\n" +
                    //     "Cancelled: " + result.cancelled);
                    Ext.Viewport.setActiveItem({
                        xtype : 'categorylist'
                    });
                    var tableId = 1;
                    Ext.Ajax.request({
                        url: 'http://www.getideafrom.me/api/rest/post/' + tableId + '/',
                        params: {
                            "action": "sit_on_this_table"
                        },
                        success: function(response){
                            var text = response.responseText;
                            // process server response here
                            // check if order id is returned - free table
                        }
                    });

                    // TODO add result.text
                    Ext.getStore('TableStore').add({'table_id': tableId});

                }, 
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        }catch(e){
            Ext.Viewport.setActiveItem({
                xtype : 'mainview'
            });
            alert(e);
        }
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
