let blogIndex, blogResults;
let blogRows = 6;
let blogListResults = document.getElementById("blog-list-result")
let myBlogLi = document.getElementById("my-blog-li")
let loadMoreBlogButton = document.getElementById("load-more-blog-btn")
async function initBlogSearch() {
    try {
        const response = await fetch ("/index.json")
        blogIndex = await response.json();
    } catch (e) {
        console.error(e)
    }

    blogResults = blogIndex.filter(function (el){
        return el.type == "blog"
    })

    // console.log('blogResults is : ', blogResults)
    renderBlogResults(blogResults)
}

function initBlogResults() {
    document.addEventListener('DOMContentLoaded', function() {
        initBlogSearch();
    })
}
initBlogResults()

function renderBlogResults(blogs) {
    let start = 0;
    let end = start + blogRows;
    
    let paginatedBlogs = blogs.slice(start, end);
    var blogResultList = ""

    for (let i = 0; i < paginatedBlogs.length; i++) {
        blogResultList += `
        <li class="post">
            <div class="row post-container">
                <div class="text-container">
                    <div>
                        <a href='${paginatedBlogs[i].href}' class="blog-title">
                            <h2 style="font-size: 4rem; font-weight:600;">${paginatedBlogs[i].title}</h2>
                        </a>
                    </div>
                    <div class="date">
                        ${dateFormat(paginatedBlogs[i].date)}
                    </div>
                    <div class="author">${paginatedBlogs[i].author}</div>
                    <div class="summary">${paginatedBlogs[i].description}</div>
                </div>
        </li>`
    }
    blogListResults.innerHTML = blogResultList
    
}

loadMoreBlogButton.addEventListener("click", () => {
    blogRows += 6
    renderBlogResults(blogResults)
    // console.log('hello!')
})

function dateFormat(date) {
    // console.log(document.documentElement.lang)
    let formattedDate;
    const blogDate = new Date(date)
    if (document.documentElement.lang == 'en') {
        const options = {year: 'numeric', month: 'short', day: 'numeric'}
        formattedDate = blogDate.toLocaleDateString('en-us', options)
    }
    
    return formattedDate;
}
