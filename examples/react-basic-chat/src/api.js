const api = {
  sendMessage: function( message ) {
    return fetch(someUrl, {
      method: 'POST',
      body: JSON.stringify({ messsage })
    });
  },
};

export default api;


