var usersTable = $("#usersTable").DataTable({
    "paging": false,
    "ordering": true,
    "info": true,
    // "columnDefs": [
    //     {
    //         "render": function (data, type, row) {
    //             var out = "";
                
    //             return data;
    //         },
    //         "targets": 4
    //     }
    // ]
});

db.collection('slack').doc('users').collection('list').where('deleted','==',false).onSnapshot(function(querySnapshot) {
    usersTable.clear();
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        let email = (data.profile.email == undefined)?"":data.profile.email;
        let name = (data.profile.display_name == undefined || data.profile.display_name === "")?data.name:data.profile.display_name;
        
        usersTable.row.add([doc.id,name,0,email,""]).draw();
    });
});