
export const getGames = () => {
  return fetch('/game')
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error( response.statusText );
  });
};

export const sendGame = ({ user, game }) => {
  return fetch('/game', {
    method: "POST",
    body: JSON.stringify({ user, game }),
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

export const sendUser = ({ user }) => {
  return fetch('/login', {
    method: "POST",
    body: JSON.stringify({ user }),
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

export const deleteUser = ({ user }) => {
  return fetch('/login', {
    method: "DELETE",
    body: JSON.stringify({ user }),
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
