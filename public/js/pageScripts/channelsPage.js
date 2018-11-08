var usersTable = $("#usersTable").DataTable({
    "paging": true,
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

db.collection('slack').doc('channels').collection('list').where('is_archived','==',false).onSnapshot(function(querySnapshot) {
    usersTable.clear();
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        
        usersTable.row.add([doc.id,data.name,data.num_members,data.topic.value,""]).draw();
    });
});