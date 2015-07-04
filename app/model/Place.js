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
            url : "http://www.getideafrom.me/api/rest/menu/5/",
            reader: {
                type: "mymenureader",
                rootProperty: "users"
            }
        }
    }
});