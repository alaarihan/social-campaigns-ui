async function logRemotely(error){
    await fetch('https://logs-01.loggly.com/inputs/0401038d-dbae-47fb-b166-e97e1f551210/tag/http/', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(error),
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }

  export default logRemotely;