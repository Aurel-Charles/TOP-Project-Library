console.log("hello Odin");

const myLibrary = [];

function Book(title, author, date ) {
  // the constructor...
  this.title = title
  this.author = author
  this.date = date
  this.id = crypto.randomUUID()
  Book.prototype.read = false
}

function addBookToLibrary(title, author, date) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, date)
  myLibrary.push(newBook)
}


addBookToLibrary("Harry potter-Goblet of fire", "JK Rowling", 2002)
addBookToLibrary("Harry potter-Order of the Phoenix", "JK Rowling", 2006)

// UPADTE LIBRARY IN THE HTML
const cardContainer = document.querySelector('.card-container')
function updateLibrary() {
    cardContainer.replaceChildren() 


    myLibrary.forEach(element => {
        console.log(`${element.title} de ${element.author}, ${element.date} - ID: ${element.id}` );
        const bookDiv = document.createElement("div")
        bookDiv.setAttribute('class', 'book-card')
        bookDiv.setAttribute('data-id', element.id)
        
        const bookTitle = document.createElement('h3')
        bookTitle.textContent = `${element.title}`
        bookTitle.setAttribute('class', 'book-title')
        bookDiv.appendChild(bookTitle)
        
        const bookAuthor = document.createElement('p')
        bookAuthor.textContent = `${element.author}`
        bookAuthor.setAttribute('class', 'book-author')
        bookDiv.appendChild(bookAuthor)
        
        const bookDate = document.createElement('p')
        bookDate.textContent = `${element.date}`
        bookDate.setAttribute('class', 'book-published-date')
        bookDiv.appendChild(bookDate)

        const btnRemoveBook = document.createElement('button')
        btnRemoveBook.textContent = 'X'
        btnRemoveBook.setAttribute('class', 'btn-delete-book')
        btnRemoveBook.setAttribute('data-remove', element.id)
        bookDiv.appendChild(btnRemoveBook)

        const readToogle = document.createElement('button')
        readToogle.textContent = 'To read'
        readToogle.setAttribute('class', 'btn-to-read')
        readToogle.setAttribute('data-read', element.id)
        bookDiv.appendChild(readToogle)
        
        cardContainer.appendChild(bookDiv)
    });
}



// ADDING BOOK //
const form = document.querySelector('form')

// open form
const btnAddBook =  document.querySelector('#add-book')
const dialog = document.querySelector('dialog')

btnAddBook.addEventListener('click', ()=> {
    dialog.showModal()
})

// Validate form
const btnValidateBook = document.querySelector('.validate-book')
btnValidateBook.addEventListener('click', (e)=> {
    e.preventDefault()
    const newTitle = document.querySelector('input[name=new-book-title]').value
    const newAuthor = document.querySelector('input[name=new-book-author]').value
    const newDate = document.querySelector('input[name=new-book-date]').value
    
    addBookToLibrary(newTitle, newAuthor, newDate)
    updateLibrary()
    form.reset()
    dialog.close()
})

// Cancel form
const cancelForm = document.querySelector('.cancel-btn')
cancelForm.addEventListener('click', (e)=>{
    e.preventDefault()
    if (e) {
        form.reset()
        dialog.close()
    }
})



// DELETE BOOK //

cardContainer.addEventListener('click', (e)=>{
    if (e.target.classList.contains('btn-delete-book')) {
        const id = e.target.getAttribute('data-remove');
        console.log(id);
        document.querySelector(`[data-id="${id}"]`).remove()
        
        // update myLibrary Array
        const indexToRemove = myLibrary.findIndex(obj => obj.id === id);
        myLibrary.splice(indexToRemove, 1)
        console.log(myLibrary);
        
    }
})


// READ TOGGLE

cardContainer.addEventListener('click', (e)=>{
    if (e.target.classList.contains('btn-to-read')) {
        e.target.classList.toggle('read')
        
        // update object 
        const id = e.target.getAttribute('data-read')
        const indexToToogle = myLibrary.findIndex(obj => obj.id === id);
        if (!myLibrary[indexToToogle].read) {
            myLibrary[indexToToogle].read = true
        }
        else{
            myLibrary[indexToToogle].read = false
        }
        console.log(myLibrary[indexToToogle]);
        
    }
})

updateLibrary()
console.log(myLibrary);

