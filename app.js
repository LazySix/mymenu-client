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
        'MainTabs',
        'MenuView',
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
        // // change app.css to flat.css
        // var allLinkTags = document.getElementsByTagName('link');
        // for (i = 0 ; i < allLinkTags.length; i++) {
        //     if (allLinkTags[i].href="resources/css/app.css") {
        //         allLinkTags[i].href = "resources/css/flat.css"
                
        //     }
        // }
        // Destroy the #appLoadingIndicator element

        Ext.Viewport.add(
            {
                xtype: 'container'
            },
            {
                xtype: 'mainview'
            },
            {
                xtype: 'maintabs'
            }
        );
        Ext.fly('appLoadingIndicator').destroy();

        Ext.getStore('TableStore').load();
        Ext.getStore('OrderStore').load();

        if (Ext.getStore('TableStore').getCount() == 0) {
            this.scanBarcode();
        }
        else {
            var store = Ext.create('Ext.data.Store', {
                model: "MyMenu.model.Place"
            });

            var menuId = Ext.getStore('TableStore').getAt(0).get('menu_id');
            store.setProxy({
                type:'ajax',
                url : "http://www.getideafrom.me/api/rest/menu/" + menuId +"/",
                reader: {
                    type: "mymenureader",
                    rootProperty: "users"
                }
            });
            store.load();

            Ext.Viewport.setActiveItem({
                xtype : 'maintabs'
            });
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
    },

    scanBarcode: function() {
        var me = this;
        try{
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    var tableId = result.text;
                    Ext.Ajax.request({
                        url: 'http://www.getideafrom.me/api/rest/post/' + tableId + '/',
                        headers: {
                            'Authorization': 'Token aef455b223b8908217d2162ddf45181fadd8c1ab'
                        },
                        params:'{"action":"sit_on_this_table"}',
                        success: function(response){
                            var responseJson = JSON.parse(response.responseText);
                            // process server response here
                            // check if order id is returned - free table
                            if (responseJson.error == true) {
                                Ext.Msg.show({
                                   title: 'Error',
                                   message: responseJson.reason,
                                   fullscreen: true,
                                   showAnimation: null,
                                   hideAnimation: null,
                                   buttons: Ext.MessageBox.OK,
                                   
                                   fn: function(buttonId) {
                                        me.scanBarcode();
                                   }
                                }); 
                            }
                            else {
                                var store = Ext.create('Ext.data.Store', {
                                    model: "MyMenu.model.Place"
                                });
                                store.setProxy({
                                    type:'ajax',
                                    url : "http://www.getideafrom.me/api/rest/menu/" + responseJson.menu_id +"/",
                                    reader: {
                                        type: "mymenureader",
                                        rootProperty: "users"
                                    }
                                });
                                store.load();

                                Ext.getStore('TableStore').add({
                                    'table_id': tableId,
                                    'table_code': responseJson.table_code,
                                    'menu_id': responseJson.menu_id
                                });

                                Ext.getStore('TableStore').sync();
                                Ext.Viewport.setActiveItem({
                                    xtype : 'mainview'
                                });
                            }
                        },
                        failure: function(error) {
                            Ext.Msg.show({
                               title: 'Error',
                               message: 'Please scan again!',
                               fullscreen: true,
                               showAnimation: null,
                               hideAnimation: null,
                               buttons: Ext.MessageBox.OK,
                               
                               fn: function(buttonId) {
                                    me.scanBarcode();
                               }
                            });
                        }
                    });
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
    }
});
