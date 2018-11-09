const usersTable = $('#usersTable').DataTable({
  'paging': true,
  'ordering': true,
  'info': true,
});

db.collection('slack').doc('users').collection('list').where('is_bot', '==', false).where('deleted', '==', false).onSnapshot(function(querySnapshot) {
  usersTable.clear();
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const email = (data.profile.email == undefined)?'':data.profile.email;
    const name = (data.profile.display_name == undefined || data.profile.display_name === '')?'['+data.name+']':data.profile.display_name;

    usersTable.row.add([doc.id, name, 0, email, '']).draw();
  });
});
