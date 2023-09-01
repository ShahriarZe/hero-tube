let drawingBoxBtn = 0;
let sort = false;
let storeId = 1000;

// ---All Category Button---
const handleAllCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await ((response).json())
    const allcategory = data.data;
    const tabConatiner = document.getElementById('btn-container');
    allcategory.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button" onclick="sortButton('${category.category_id}')" class="btn hover:bg-error">${category.category}</button>
        `
        tabConatiner.appendChild(div)
    });
}


// ---Display Card Function---
const handleSingleCategory = async (elementId = 1000) => {
    const response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${elementId}`)
    const data = await ((response).json())
    const singleData = data.data;
    drawingBoxBtn = singleData.length;
    const cardConatiner = document.getElementById('card-container')
    const drawingbox = document.getElementById('drawing')
    if (sort) {
        singleData.sort((m, n) => {
            const sortedDataA = parseInt(m.others.views)
            const sortedDataB = parseInt(n.others.views)
            return sortedDataB - sortedDataA;
        })
    }
    cardConatiner.innerHTML = '';
    drawingbox.innerHTML = '';
    if (drawingBoxBtn) {
        singleData.forEach(element => {
            const convertTime = element.others.posted_date;
            const timeMin = Math.floor((convertTime % 3600) / 60)
            const timeHour = Math.floor(convertTime / 3600)
            const timeNum = `${timeHour} hr ${timeMin} min ago`
            const author = element.authors.map((authorName) => authorName.profile_name)
            const authorImg = element.authors.map((authorImage) => authorImage.profile_picture)
            const div = document.createElement('div');
            const authorTick = element.authors.map((verify) => {
                if (verify.verified === true) {
                    return `
                    <img src="blueTick.svg" alt="" ></img>
                    `
                }
                else {
                    return '';
                }
            })

            // ---Card Content---
            div.innerHTML = `
        <div class="card card-compact lg:w-80  bg-base-100 shadow-xl">
        <figure><div class="relative"><img class="w-full lg:w-[400px] md:w-full lg:h-40 md:h-40" src="${element.thumbnail}" alt="Shoes" /></div></figure>
        ${convertTime ? `<div class="absolute bg-slate-700 text-white text-sm rounded-lg top-[140px] lg:top-32 left-56 lg:left-48"><p>${timeNum}</p></div>` : ''}
        <div class="card-body">
          <h2 class="card-title"><img class="rounded-full w-[40px] h-[40px]" src="${authorImg}"/>${element.title}</h2>
          <div class="flex gap-2"> ${author}${authorTick}</div>
          <p> ${element.others.views}</p>
        </div>
      </div>
        `
            cardConatiner.appendChild(div)
        });
    }
    else {
        const div = document.createElement('div');

        // ---Drawing Buttton Content---
        div.innerHTML = `
        <div class="flex flex-col justify-center items-center mt-10"><img class="w-[140px] h-[140px]" src="Icon.png" alt="" ></img>
        <h1 class="text-3xl font-semibold">Opps Sorry!! No Content Found</h1></div>
    `;
        drawingbox.appendChild(div)
    }
}

const sortButton = (sortBtn) => {
    storeId = sortBtn;
    handleSingleCategory(storeId);
}

// ---Sort by View Function---
const sortByView = () => {
    sort = true;
    handleSingleCategory(storeId);
}

//---Blog Section---
const blog = blogButton = () => {
    window.location.href = 'blog.html'
}

handleAllCategory();
handleSingleCategory('1000');
