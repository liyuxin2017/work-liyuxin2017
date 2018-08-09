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

export const sendNewContact = ({currentUser, firstName, lastName, phone, email}) => {
  return fetch('contact', {
    method: "POST",
    body: JSON.stringify({currentUser, firstName, lastName, phone, email}),
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

export const getContactList = (currentUser) => {
  const url = '/contact/' + currentUser;
  return fetch(url)
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error( response.statusText );
  });
};

export const deleteContact = (index, currentUser) => {
  return fetch('/contact', {
    method: "DELETE",
    body: JSON.stringify({ index : index, currentUser : currentUser }),
    headers: new Headers({ 'content-type': 'application/json'}),
  })
  .then( response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error( response.statusText );
    }
  });
}
