//---Blog Section---
const blog = blogButton = () => {
    location.href = 'blog.html'
}


// ---All Category Button---
const handleAllCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await ((response).json())
    const allcategory = data.data;
    const tabConatiner = document.getElementById('tab-container');
    allcategory.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="handleSingleCategory('${category.category_id}')" class="btn">${category.category}</button>
        `
        tabConatiner.appendChild(div)
    });

}
handleAllCategory();

// ---Display Card Function---
const handleSingleCategory = async (elementId) => {
    const response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${elementId}`)
    const data = await ((response).json())
    const singleData = data.data;
    const cardConatiner = document.getElementById('card-container')
    cardConatiner.innerHTML = '';
    singleData.forEach(element => {
        const author = element.authors.map((authorName) => authorName.profile_name)
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="card card-compact lg:w-80  bg-base-100 shadow-xl">
    <figure><img class="lg:w-full md:w-full lg:h-40 md:h-40" src="${element.thumbnail}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${element.title}</h2>
      <p class="text-xl"> ${author}</p>
      <p> ${element.others.views}</p>
    </div>
  </div>
    `
        cardConatiner.appendChild(div)
    });
}