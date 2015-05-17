Ext.define("MyMenu.model.Place", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            {name:"id", type:"int"},
            {name:"name", type:"string"}
        ],
        hasMany: {
            model: "Category",
            name: "categories"
        },
        proxy: {
            type:'ajax',
            url : "/menu.js",
            reader: {
                type: "mymenureader",
                rootProperty: "users"
            }
        }
    }
});