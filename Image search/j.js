const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const accessKey = "tZ4yX0W5OMIGVGXR_ghEQhgPph0MtJa2BS7iRHvSdRg";

const clearBtn = document.createElement("button");
const imageCount = document.createElement("p");
const categoryContainer = document.createElement("div");

let keyword = "";
let page = 1;
let totalResults = 0; // To track total images available
let isLoading = false; // To manage loading state

function initializeUI() {
    // Clear button
    clearBtn.id = "clear-btn";
    clearBtn.textContent = "Clear Search";
    clearBtn.style.display = "none";
    clearBtn.setAttribute("aria-label", "Clear search input and results");
    searchForm.appendChild(clearBtn);

    // Image count display
    imageCount.id = "image-count";
    imageCount.style.textAlign = "center";
    imageCount.style.margin = "10px 0";
    searchResult.before(imageCount);

    // Category suggestions
    categoryContainer.id = "category-container";
    // Remove style.margin and textAlign, let CSS handle it
    const categories = ["Nature", "City", "Technology", "Animals", "Food"];
    categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.className = "category-btn";
        btn.setAttribute("aria-label", `Search for ${category} images`);
        categoryContainer.appendChild(btn);
    });
    searchForm.after(categoryContainer);
}

async function searchImages() {
    if (isLoading) return; 
    isLoading = true;
    showLoading(true);

    keyword = searchBox.value.trim();

    if (!keyword) {
        searchResult.innerHTML = "<p>Please enter a search term.</p>";
        showMoreBtn.style.display = "none";
        clearBtn.style.display = "none";
        imageCount.textContent = "";
        showLoading(false);
        isLoading = false;
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const results = data.results;
        totalResults = data.total; 

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        if (results.length === 0) {
            searchResult.innerHTML = "<p>No images found.</p>";
            showMoreBtn.style.display = "none";
            clearBtn.style.display = "block";
            imageCount.textContent = "";
            showLoading(false);
            isLoading = false;
            return;
        }

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Unsplash image";
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.setAttribute("aria-label", `View image on Unsplash: ${result.alt_description || "Unsplash image"}`);

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        const displayedImages = page * 12;
        imageCount.textContent = `Showing ${Math.min(displayedImages, totalResults)} of ${totalResults} images`;

        showMoreBtn.style.display = displayedImages < totalResults ? "block" : "none";
        clearBtn.style.display = "block";

    } catch (error) {
        console.error("Error fetching images:", error);
        searchResult.innerHTML = `<p>Something went wrong. <button id="retry-btn" aria-label="Retry search">Try again</button></p>`;
        showMoreBtn.style.display = "none";
        clearBtn.style.display = "block";
        imageCount.textContent = "";
    }

    showLoading(false);
    isLoading = false;
}

function showLoading(show) {
    if (show) {
        searchResult.innerHTML = '<p class="loading">Loading images...</p>';
    } else {
        if (searchResult.innerHTML === '<p class="loading">Loading images...</p>') {
            searchResult.innerHTML = "";
        }
    }
}

function resetSearch() {
    searchBox.value = "";
    searchResult.innerHTML = "";
    imageCount.textContent = "";
    showMoreBtn.style.display = "none";
    clearBtn.style.display = "none";
    page = 1;
    keyword = "";
    totalResults = 0;
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

clearBtn.addEventListener("click", () => {
    resetSearch();
});

categoryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("category-btn")) {
        searchBox.value = e.target.textContent;
        page = 1;
        searchImages();
    }
});

searchResult.addEventListener("click", (e) => {
    if (e.target.id === "retry-btn") {
        searchImages();
    }
});

initializeUI();