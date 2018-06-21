

export const getMessages = () => {
  return fetch('/messages')
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error( response.json() );
  });
};

