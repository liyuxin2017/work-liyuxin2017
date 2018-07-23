export const getGames = () => {
  return fetch('/game/')
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error( response.statusText );
  });
};

export const sendGame = ({ user, game }) => {
  const url = '/game/' + game;
  return fetch(url, {
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

export const sendLastMove = ({ user, move }, inGame) => {
  const url = '/game/' + inGame;
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify({ user, move }),
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

export const getMoves = (inGame) => {
  const url = '/game/' + inGame;
  return fetch(url)
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error( response.statusText );
  });
};

export const deleteMove = ({ inGame }) => {
  const url = '/game/' + inGame;
  return fetch(url, {
    method: "DELETE",
    body: JSON.stringify({inGame}),
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
