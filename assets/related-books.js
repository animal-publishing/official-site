(() => {
  "use strict";

  const currentId = window.location.pathname.split("/").pop().replace(/\.html?$/i, "");
  const main = document.querySelector("main");
  if (!currentId || !main) return;

  fetch("../data/books.json")
    .then(response => {
      if (!response.ok) throw new Error("作品データを読み込めませんでした。");
      return response.json();
    })
    .then(books => {
      const currentBook = books.find(book => book.id === currentId);
      if (!currentBook || !Array.isArray(currentBook.authors)) return;

      const authorIds = new Set(currentBook.authors);
      const relatedBooks = books
        .map((book, index) => ({ book, index }))
        .filter(({ book }) =>
          book.id !== currentId &&
          book.status !== "絶版" &&
          Array.isArray(book.authors) &&
          book.authors.some(authorId => authorIds.has(authorId)) &&
          Boolean(book.title) &&
          Boolean(book.cover)
        )
        .sort((a, b) => {
          const dateA = Date.parse(a.book.publicationDate || "") || 0;
          const dateB = Date.parse(b.book.publicationDate || "") || 0;
          return (dateB - dateA) || (a.index - b.index);
        });

      if (relatedBooks.length === 0) return;

      const section = document.createElement("section");
      section.className = "related-books-section wrap";
      section.setAttribute("aria-labelledby", "related-books-title");

      const heading = document.createElement("h2");
      heading.className = "section-title";
      heading.id = "related-books-title";
      heading.textContent = "この作者の別の作品";

      const track = document.createElement("div");
      track.className = "related-books-track";
      track.setAttribute("aria-label", "同じ作者の別の作品");

      relatedBooks.forEach(({ book }) => {
        const link = document.createElement("a");
        link.className = "related-book-card";
        link.href = `${book.id}.html`;

        const image = document.createElement("img");
        image.src = `../${book.cover}`;
        image.alt = `${book.title}の表紙`;
        image.loading = "lazy";

        const title = document.createElement("span");
        title.className = "related-book-title";
        title.textContent = book.title;

        link.append(image, title);
        track.appendChild(link);
      });

      section.append(heading, track);
      main.appendChild(section);
    })
    .catch(error => {
      console.error("作者の別作品エリアの表示に失敗しました。", error);
    });
})();
