document.addEventListener("DOMContentLoaded", function() {
  const booksURL = 'http://localhost:3000/books';
  const usersURL = 'http://localhost:3000/users';
  const randomID = Math.floor(Math.random() * 10) + 1;
  let randomUser = {};

  fetch(usersURL + `/${randomID}`).then((response) => response.json())
    .then((user) => {console.log(user); randomUser = user});

  fetch(booksURL).then((response) => response.json())
    .then((books) => displayBooks(books));

  function displayBooks(books) {
    const ul = document.getElementById('list');
    const div = document.getElementById('show-panel');

    let likesBook = false;

    books.map((book) => {
      const li = document.createElement('li');

      li.innerText = book.title;
      li.style.cursor = 'pointer';

      li.addEventListener('click', () => {
        while(div.firstChild) {
          div.firstChild.remove();
        }

        const thumbnail = document.createElement('img');
        const title = document.createElement('h2');
        const author = document.createElement('h2');
        const subtitle = document.createElement('h3');
        const description = document.createElement('p');
        const button = document.createElement('button');
        const ul = document.createElement('ul');

        thumbnail.src = book.img_url;
        title.innerText = book.title;
        author.innerText = book.author;
        subtitle.innerText = book.subtitle;
        description.innerText = book.description;
        console.log(likesBook);
        button.innerText = 'Like';

        book.users.map((user) => {
          const li = document.createElement('li');

          li.innerText = user.username;

          ul.append(li);
        });

        button.addEventListener('click', () => {
          const newUsers = [...book.users, randomUser];
          console.log(newUsers);
          console.log(book.id);
          // console.log(exist);

          const configObject = {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              Accept: 'application/json'
            },
            body: JSON.stringify({
              users: newUsers
            })
          };

          fetch(booksURL + `/${book.id}`, configObject);
          window.location.reload();
        });

        div.append(thumbnail, title, author, subtitle, description, ul, button);
      });
      likesBook = false;
      ul.append(li);
    });
  }
});
