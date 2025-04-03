//Search Bar Script

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search");

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    const blogPosts = document.querySelectorAll(".blog-post");

    blogPosts.forEach((post) => {
      const title = post.querySelector("h2").textContent.toLowerCase();
      const description = post
        .querySelector("p:not(.meta)")
        .textContent.toLowerCase();
      const meta = post.querySelector(".meta").textContent.toLowerCase();

      const isMatch =
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        meta.includes(searchTerm);

      if (isMatch) {
        post.style.display = "block";
      } else {
        post.style.display = "none";
      }
    });
  });
});

// Main page script
document.addEventListener("DOMContentLoaded", function () {
  const blogPosts = document.querySelectorAll(".blog-post");

  blogPosts.forEach((post) => {
    const imgSrc = post.querySelector("img").getAttribute("src");
    const day = post.querySelector(".date-box .day").textContent;
    const monthYear = post.querySelector(".date-box .month-year").textContent;
    const title = post.querySelector("h2").textContent;
    const paragraphs = Array.from(post.querySelectorAll("p:not(.meta)"))
      .map((p) => p.textContent)
      .join("|||");

    const readMoreLink = post.querySelector(".read-more");

    readMoreLink.addEventListener("click", function (e) {
      e.preventDefault();
      const newUrl = `blogDetails.html?img=${encodeURIComponent(
        imgSrc
      )}&day=${day}&monthYear=${encodeURIComponent(
        monthYear
      )}&title=${encodeURIComponent(title)}&content=${encodeURIComponent(
        paragraphs
      )}`;
      window.location.href = newUrl;
    });
  });
});

/* Blog Details Script For Show Post */
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);

  // Set image
  const imgSrc = urlParams.get("img");
  if (imgSrc) {
    document.getElementById("blogImage").src = decodeURIComponent(imgSrc);
  }

  // Set date
  const day = urlParams.get("day");
  const monthYear = urlParams.get("monthYear");
  if (day && monthYear) {
    document.getElementById("postDay").textContent = day;
    document.getElementById("postMonthYear").textContent =
      decodeURIComponent(monthYear);
    document.getElementById(
      "dateText"
    ).textContent = `${day} ${decodeURIComponent(monthYear)}`;
  }

  // Set title
  const title = urlParams.get("title");
  if (title) {
    document.getElementById("postTitle").textContent =
      decodeURIComponent(title);
  }

  // Set content
  const content = urlParams.get("content");
  if (content) {
    const paragraphs = decodeURIComponent(content).split("|||");
    const contentDiv = document.getElementById("postContent");
    paragraphs.forEach((text) => {
      if (text.trim()) {
        const p = document.createElement("p");
        p.textContent = text;
        contentDiv.appendChild(p);
      }
    });
  }
});
