console.log("hello Odin");


const myLibrary = [];

function Book(title, author, date ) {
  // the constructor...
  this.title = title
  this.author = author
  this.date = date
  this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, date) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, date)
  myLibrary.push(newBook)
}

addBookToLibrary("Harry potter-Goblet of fire", "JK Rowling", 2002)
addBookToLibrary("Harry potter-Order of the Phoenix", "JK Rowling", 2006)


const cardContainer = document.querySelector('.card-container')

myLibrary.forEach(element => {
    console.log(`${element.title} de ${element.author}, ${element.date} - ID: ${element.id}` );
    const bookDiv = document.createElement("div")
    bookDiv.setAttribute('class', 'bookCard')

    const bookTitle = document.createElement('h3')
    bookTitle.textContent = `${element.title}`
    bookDiv.appendChild(bookTitle)

    const bookAuthor = document.createElement('p')
    bookAuthor.textContent = `${element.author}`
    bookDiv.appendChild(bookAuthor)

    const bookDate = document.createElement('p')
    bookDate.textContent = `${element.date}`
    bookDiv.appendChild(bookDate)

    const bookId = document.createElement('p')
    bookId.textContent = `${element.id}`
    bookDiv.appendChild(bookId)
    
    cardContainer.appendChild(bookDiv)
});



// adding book

const btnAddBook =  document.querySelector('#add-book')

btnAddBook.addEventListener('click', function (title, author, date){
    let newTitle = prompt("whats the title?")
    let newAuthor = prompt("who write it?")
    let newDate  = prompt("When was it published?")
    addBookToLibrary(newTitle, newAuthor, newDate)
})