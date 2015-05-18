Ext.define('MyMenu.reader.MyMenuReader', {
    extend : 'Ext.data.reader.Json',
    alias : 'reader.mymenureader',

    getResponseData : function(response) {
        var data = this.callParent([response]);
        var storeProducts = Ext.getStore('ProductStore');
        var storeCategories = Ext.getStore('CategoryStore');
        for(var i = 0; i < data.products.length; i++){
            var product = data.products[i];
            var tmpProduct = Ext.create('MyMenu.model.Product', {
                id   : product.id,
                name : product.name,
                price: product.price,
                short_description : product.short_description,
                full_description  : product.full_description,
                category_id:product.category.id
            });
            storeProducts.add(tmpProduct);
            if (product.category && product.category.id) {
                if (storeCategories.find('id',product.category.id) == -1) {
                    var tmpCategory = Ext.create('MyMenu.model.Category', {
                        id: product.category.id,
                        name: product.category.name
                    });
                    storeCategories.add(tmpCategory);
                }
            }
        }

        return {id:data.id, name:data.name};
    }
});