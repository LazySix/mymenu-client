Ext.define("MyMenu.model.Category", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            "id",
            "name",
            "place_id"
        ],
        hasMany: {
            model: "Product",
            name: "productItems",
            associationKey: "category_id"
        },
        belongsTo: "Place"
    }
});