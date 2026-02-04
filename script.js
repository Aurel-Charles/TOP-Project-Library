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
        
        cardContainer.appendChild(bookDiv)
    });
}



// ADDING BOOK //

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
    dialog.close()
})



// DELETE BOOK //

cardContainer.addEventListener('click', (e)=>{
    if (e.target.classList.contains('btn-delete-book')) {
        const id = e.target.getAttribute('data-remove');
        console.log(id);
        document.querySelector(`[data-id="${id}"]`).remove()
        
        // update myLibrary Array

        
    }
})


// const btnDeleteBook = document.querySelectorAll('.btn-delete-book')
// btnDeleteBook.forEach((btn)=> {
//     btn.addEventListener('click', ()=>{
//         const id = btn.getAttribute('data-remove')
//         console.log(id);
//         const cardToDelete = document.querySelector(`[data-id=${id}]`)
//         console.log(cardToDelete);
        
//     })
    
// })


updateLibrary()
