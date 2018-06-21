
export const getMessages = () => {
  return fetch('/messages')
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error( response.statusText );
  });
};

export const sendMessage = ({ from, text }) => {
  return fetch('/messages', {
    method: "POST",
    body: JSON.stringify({ from, text }),
    headers: new Headers({ 'content-type': 'application/json'}),
  })
  .then( response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error( response.statusText );
    }
  });
};
