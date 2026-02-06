console.log("hello Odin");

const myLibrary = [];

function Book(title, author, date ) {
  // the constructor...
  this.title = title
  this.author = author
  this.date = date
  this.id = crypto.randomUUID()
}
Book.prototype.toggleRead = function() {
    this.read = !this.read
}

function addBookToLibrary(title, author, date) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, date)
  myLibrary.push(newBook)
}


addBookToLibrary("Gargantua", "Rabelais", 1534)
addBookToLibrary("Don Juan ", "Moliere", 1665)
addBookToLibrary("Candide", "Voltaire", 1759)
addBookToLibrary("La Peau de chagrin", "Balzac", 1831)
addBookToLibrary("Les Trois Mousquetaires", "Balzac", 1831)
addBookToLibrary("Notre-Dame de Paris", "Alexandre Dumas", 1844)

// UPADTE LIBRARY IN THE HTML
const cardContainer = document.querySelector('.card-container')
function updateLibrary() {
    cardContainer.replaceChildren() 


    myLibrary.forEach(element => {
        // console.log(`${element.title} de ${element.author}, ${element.date} - ID: ${element.id}` );
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

        const btnDiv = document.createElement('div')
        btnDiv.setAttribute('class', 'btn-div')
        bookDiv.appendChild(btnDiv)


        const btnRemoveBook = document.createElement('button')
        btnRemoveBook.textContent = 'Remove?'
        btnRemoveBook.setAttribute('class', 'btn-delete-book')
        btnRemoveBook.setAttribute('data-remove', element.id)
        btnDiv.appendChild(btnRemoveBook)

        const readToogle = document.createElement('button')
        readToogle.textContent = 'To read'
        readToogle.setAttribute('class', 'btn-to-read')
        readToogle.setAttribute('data-read', element.id)
        btnDiv.appendChild(readToogle)

        if (element.read === true) {
            readToogle.classList.add('read')
            btnDiv.appendChild(readToogle)
        }

        
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
    const newTitle = document.querySelector('input[name=new-book-title]')
    const newAuthor = document.querySelector('input[name=new-book-author]')
    const newDate = document.querySelector('input[name=new-book-date]')
    const readState = document.querySelector('input[name=read-state]')
    console.log(readState.checked);
    
    isValid = true

    ;[newTitle, newAuthor, newDate].forEach(element => {
        element.setAttribute("class", "")
    });
    if (!newTitle.value) {
        newTitle.classList.add("invalid")
        isValid = false
    }
    if (!newAuthor.value) {
        newAuthor.classList.add("invalid")
        isValid = false
    }
    if (!newDate.value) {
        newDate.classList.add("invalid")
        isValid = false
    }
    if (!isValid) {
        return
    }

    addBookToLibrary(newTitle.value, newAuthor.value, newDate.value)
    
    if (readState.checked === true) {
        myLibrary.at(-1).toggleRead()

    }
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
        const indexBook = myLibrary.findIndex(obj => obj.id === id);
        const book = myLibrary[indexBook]
        
        myLibrary.splice(indexBook, 1)
        console.log(`${book.title} has been removed from the base`);
        
    }
})


// READ TOGGLE

cardContainer.addEventListener('click', (e)=>{
    // update object 
    const id = e.target.getAttribute('data-read')
    const book = myLibrary.find(obj => obj.id === id);

    if (e.target.classList.contains('btn-to-read')) {
        
        if (book) {
            book.toggleRead()
            e.target.classList.toggle('read', book.read)
            e.target.textContent = book.read? 'Read' : 'To read'
            console.log(book.read);
            console.log(`Status "read" for ${book.title} has change to ${book.read}`);
        }
    }
    
})

// Sort BOOKS
const sortBy = document.querySelector('select')
sortBy.addEventListener('change', (e)=> {
    value = e.target.value;
    switch (value) {
        case 'date-oldest':
                console.log('sort by published date from oldest to newest:' + value);
                myLibrary.sort( (a, b) => a.date - b.date )
                updateLibrary()
            break;
        case 'date-newest':
                console.log('sort by published date from newest to oldest:' + value);
                myLibrary.sort( (a, b) => b.date - a.date )
                updateLibrary()
            break;
        case 'author-up':
                console.log('sort by author from "A" to "Z":' + value);
                myLibrary.sort( (a, b) => a.author.localeCompare(b.author) )
                updateLibrary()
            break;
        case 'author-down':
                console.log('sort by author from "A" to "Z":' + value);
                myLibrary.sort( (a, b) => b.author.localeCompare(a.author) )
                updateLibrary()
            break;
        default:
            break;
    }
})

updateLibrary()
console.log(myLibrary);

