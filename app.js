let menu = document.querySelector(".menu-icon")
let navbar = document.querySelector(".menu")
let loader1 = document.getElementById("loader1")
let loader2 = document.getElementById("loader2")

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500"
const trendingURL = "https://api.themoviedb.org/3/trending/all/day?api_key=53429b93896ec0365c0d076f33deebb1"

const baseLatestURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=53429b93896ec0365c0d076f33deebb1&language=en-US&page='



let trendingSlider = document.getElementById("trending-slider")
let newContent = document.getElementById("new-content")
let nextPageBtn = document.getElementById("next-page-button")
const trendingMoviesList = [];
menu.onclick = () => {
  menu.classList.toggle('move')
  navbar.classList.toggle('active')
}

let pageCount = 1;

nextPageBtn.addEventListener('click', () => {
  pageCount++;
  loader1.style.display = "flex"
  fetchLatestMovies(pageCount)
  console.log(pageCount)
})


class Movie {

  constructor(title, rating, imgurl, type) {
    this.title = title
    this.rating = rating
    this.imgurl = imgurl
    this.type = type
  }


}

async function fetchTrendingMovies() {
  let response = await fetch(trendingURL);
  let data = await response.text();
  let results = JSON.parse(data).results;
  let str = ``
  Array.from(results).forEach(currMovie => {
    let imgUrl = BASE_IMG_URL + currMovie.poster_path;
    let rating = currMovie.vote_average;
    let title = currMovie.title;

    if (title == undefined) {
      title = currMovie.name;
    }

    let type = currMovie.media_type.toUpperCase()

    str += `<div class="swiper-slide">
              <div class="box">
                  <img src="${imgUrl}" alt="">
                  <div class="box-text">
                      <h2>${title}</h2>
                      <h3>${type}</h3>
                      <div class="play-movie">
                          <div class="rating">
                              <i class='bx bxs-star' ></i><span>${rating}</span>

                          </div>
                          <a href="#" class="box-btn"><i class='bx bx-play-circle'></i></a>
                      </div>
                  </div>
              </div>
          </div>`
  })
  loader1.style.display = "none"
  trendingSlider.innerHTML = str;


}
async function fetchLatestMovies(pageCount) {

  let latestURL = baseLatestURL + `${pageCount}`
  let response = await fetch(latestURL);
  let data = await response.text();
  let results = JSON.parse(data).results;
  let str = ``;
  Array.from(results).forEach(currMovie => {
    let imgUrl = BASE_IMG_URL + currMovie.poster_path;
    let rating = currMovie.vote_average;
    let title = currMovie.title;

    if (title == undefined) {
      title = currMovie.name;
    }
    
    let type = "MOVIE"

    str += `<div class="box">
    <img src="${imgUrl}" alt="">


    <div class="box-text">
        <h2>${title}</h2>
        <h3>${type}</h3>
        <div class="play-movie">
            <div class="rating">
                <i class='bx bxs-star'></i>
                <span>${rating}</span>

            </div>
            <a href="#" class="box-btn"><i class='bx bx-play-circle'></i></a>
        </div>
    </div>
</div>`
  })

  loader1.style.display = "none"
  newContent.innerHTML = str;


}

fetchTrendingMovies();
fetchLatestMovies();
var swiper = new Swiper(".trending-content", {
  slidesPerView: 1,
  spaceBetween: 5,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  breakpoints: {
    640: {
      slidesPerView: 10,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1068: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});

// swiperBtn.style.top = "25%"