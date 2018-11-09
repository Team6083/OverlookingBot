const usersTable = $('#usersTable').DataTable({
  'paging': true,
  'ordering': true,
  'info': true,
});

db.collection('slack').doc('channels').collection('list').where('is_archived', '==', false).onSnapshot(function(querySnapshot) {
  usersTable.clear();
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    usersTable.row.add([doc.id, data.name, data.num_members, data.topic.value, '']).draw();
  });
});
