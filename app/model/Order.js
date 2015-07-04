Ext.define("MyMenu.model.Order", {
    extend: "Ext.data.Model",
    config: {
        autoSync: true,
        fields: [
            "product_id",
            "quantity"
        ],
        belongsTo: [
            "Category"
        ]
    }
});