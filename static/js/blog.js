let blogIndex;
let blogRows = 6;
// let blogTitle = document.getElementById("blog-title")
let blogListResults = document.getElementById("blog-list-result")
async function initBlogSearch() {
    try {
        const response = await fetch("/index.json")
        blogIndex = await response.json();
        
    } catch (e) {
        console.error(e)
    }
    // blogResults = blogIndex
    
    var blogResults = blogIndex.filter(function (el){
        return el.type == "blog"
    })
    console.log('blogResults is: ', blogIndex)
    // title.innerText = "Hello"
    // renderBlogResults(blogResults)
    // return blogResults;
}
// initBlogSearch()
function initBlogResults() {
    document.addEventListener('DOMContentLoaded', function(){
        initBlogSearch();
    })
}

initBlogResults();

function renderBlogResults(blogs) {
    let start = 0
    let end = 6
    let paginatedBlogs = blogs.slice(start, end);
    var blogResultList = ""

    for (let i = 0; i < paginatedBlogs.length; i++) {
        blogResultList += `
        <li class="post">
            <div class="row post-container">
                <div class="text-container">
                    <div>
                        <a href='${paginatedBlogs[i].href}' class="blog-title">
                            <h2 id="blog-title" style="font-size: 4rem; font-weight: 600;">${paginatedBlogs[i].title}</h2>
                        </a>
                    </div>
                    <div class="date">
                        ${paginatedBlogs[i].date}
                    </div>
                    <div class="author>${paginatedBlogs[i].author}</div>
                </div>
            </div>
        </li>`
    }
    blogListResults.innerHTML = blogResultList
    
}
