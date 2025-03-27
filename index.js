const bookList = document.querySelector(".book-list");
const input = document.querySelector(".search-input"); // Ensure correct selector
const toggleBtn = document.querySelector(".view-toggle");

async function fetchBooks() {
  const url =
    "https://api.freeapi.app/api/v1/public/books?page=1&limit=100&inc=kind%252Cid%252Cetag%252CvolumeInfo&query=tech";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    const allBooks = data.data.data;
    createBooks(allBooks);
  } catch (error) {
    console.error(error);
  }
}

function createBooks(books) {
  bookList.innerHTML = "";
  const searchTerm = input.value.toLowerCase().trim();

  let booksFound = false;

  books.forEach((book) => {
    const desc = book.volumeInfo.description
      ? book.volumeInfo.description.toLowerCase()
      : "";
    const title = book.volumeInfo.title
      ? book.volumeInfo.title.toLowerCase()
      : "";
    const authors = book.volumeInfo.authors
      ? book.volumeInfo.authors.join(", ").toLowerCase()
      : "";

    if (
      !searchTerm ||
      desc.includes(searchTerm) ||
      title.includes(searchTerm) ||
      authors.includes(searchTerm)
    ) {
      booksFound = true;

      const clonedTemplate = bookTemplate.content.cloneNode(true);
      const bookTitle = clonedTemplate.querySelector(".book-title");
      const bookAuthor = clonedTemplate.querySelector(".book-author");
      const bookPublisher = clonedTemplate.querySelector(".book-publisher");
      const bookPublishedDate = clonedTemplate.querySelector(
        ".book-published-date"
      );
      const bookCoverImg = clonedTemplate.querySelector(".book-cover img");

      bookTitle.textContent = book.volumeInfo.title || "Unknown Title";
      bookAuthor.textContent = book.volumeInfo.authors
        ? book.volumeInfo.authors.join(", ")
        : "Unknown Author";
      bookPublisher.textContent =
        book.volumeInfo.publisher || "Unknown Publisher";
      bookPublishedDate.textContent =
        book.volumeInfo.publishedDate || "Unknown Date";

      if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
        bookCoverImg.src = book.volumeInfo.imageLinks.thumbnail;
        bookCoverImg.alt = book.volumeInfo.title || "Book Cover";
      } else {
        bookCoverImg.src = "No Cover Image Available";
        bookCoverImg.alt = "No Cover Available";
      }

      if (book.volumeInfo.infoLink) {
        if (book.volumeInfo.infoLink) {
          clonedTemplate
            .querySelector(".book-item")
            .addEventListener("click", () => {
              window.open(book.volumeInfo.infoLink, "_blank");
            });
        }
      }

      bookList.appendChild(clonedTemplate);
    }
  });

  if (!booksFound) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No books found matching your search.";
    noResultsMessage.style.color = "red";
    noResultsMessage.style.textAlign = "center";
    bookList.appendChild(noResultsMessage);
  }
}

input.addEventListener("input", () => {
  fetchBooks();
});

const viewToggle = document.querySelector(".view-toggle");
let isListView = false;

viewToggle.addEventListener("click", () => {
  isListView = !isListView;

  const bookItems = document.querySelectorAll(".book-item");
  const bookDetails = document.querySelectorAll(".book-details");
  const bookCover = document.querySelectorAll(".book-cover");
  const bookTitle = document.querySelectorAll(".book-title");
  const bookAuthor = document.querySelectorAll(".book-author");
  const bookMeta = document.querySelectorAll(".book-meta");
  const bookPublisher = document.querySelectorAll(".book-publisher");
  const bookIteml = document.querySelectorAll(".book-iteml");
  const bookCoverl = document.querySelectorAll(".book-coverl");
  const bookDetailsl = document.querySelectorAll(".book-detailsl");
  const bookTitlel = document.querySelectorAll(".book-titlel");
  const bookAuthorl = document.querySelectorAll(".book-authorl");
  const bookMetal = document.querySelectorAll(".book-metal");
  const bookPublisherl = document.querySelectorAll(".book-publisherl");
  if (isListView) {
    bookList.classList.remove("book-list");
    bookList.classList.add("book-listl");

    bookItems.forEach((item) => {
      item.classList.remove("book-item");
      item.classList.add("book-iteml");
    });

    bookCover.forEach((cover) => {
      cover.classList.remove("book-cover");
      cover.classList.add("book-coverl");
    });

    bookDetails.forEach((details) => {
      details.classList.remove("book-details");
      details.classList.add("book-detailsl");
    });

    bookTitle.forEach((title) => {
      title.classList.remove("book-title");
      title.classList.add("book-titlel");
    });

    bookAuthor.forEach((author) => {
      author.classList.remove("book-author");
      author.classList.add("book-authorl");
    });

    bookMeta.forEach((meta) => {
      meta.classList.remove("book-meta");
      meta.classList.add("book-metal");
    });

    bookPublisher.forEach((publisher) => {
      publisher.classList.remove("book-publisher");
      publisher.classList.add("book-publisherl");
    });
  } else {
    bookList.classList.remove("book-listl");
    bookList.classList.add("book-list");

    bookIteml.forEach((item) => {
      item.classList.remove("book-iteml");
      item.classList.add("book-item");
    });

    bookCoverl.forEach((cover) => {
      cover.classList.remove("book-coverl");
      cover.classList.add("book-cover");
    });

    bookDetailsl.forEach((details) => {
      details.classList.remove("book-detailsl");
      details.classList.add("book-details");
    });

    bookTitlel.forEach((title) => {
      title.classList.remove("book-titlel");
      title.classList.add("book-title");
    });

    bookAuthorl.forEach((author) => {
      author.classList.remove("book-authorl");
      author.classList.add("book-author");
    });

    bookMetal.forEach((meta) => {
      meta.classList.remove("book-metal");
      meta.classList.add("book-meta");
    });

    bookPublisherl.forEach((publisher) => {
      publisher.classList.remove("book-publisherl");
      publisher.classList.add("book-publisher");
    });
  }
});
