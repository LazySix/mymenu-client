Ext.define("MyMenu.model.Order", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            "product_id",
            "quantity"
        ],
        belongsTo: [
            "Category"
        ]
    }
});