Ext.define("MyMenu.model.Product", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            "name",
            "price",
            "short_description",
            "full_description",
            'category_id'
        ],
        belongsTo: [
            "Category"
        ]
    }
});