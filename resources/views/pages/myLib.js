import Utils from "./../../services/Utils.js";

function getMyLib() {
  return JSON.parse(localStorage.getItem("movies"));
}

let Show = {
  render: async () => {
    let request = Utils.parseRequestURL();
    let myMovies = getMyLib();

    console.log(myMovies);

    let view = /*html*/ `
            
                <h1> My Collection Movies Listing </h1>
                <div id="emptyCollection"></div>
                <div class="row">
                  
                    ${myMovies
                      .map(
                        movie => /*html*/ `<div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
        <div class="card">
          <div class="card-media">
            <figure>
            <img
              class="img-responsive"
              src="${movie.banner}"
              alt="${movie.original_title} banner"
            />
            </figure>
          </div>
            <div class="card-content">
             ${movie.overview.substr(0, 160)}...
             <br><br> 
             <button class="btn btn-danger rmFromLib" data-id="${
               movie.id
             }" data-title="${movie.original_title}" data-desc="${
                          movie.overview
                        }" data-banner="${
                          movie.banner
                        }" id="rmFromLib" > REMOVE FROM COLLECTION </button>
             <br><br>
             <a class="btn btn-white" href="#/movie/${movie.id}"> READ MORE </a>
            </div>
        </div>
      </div>`
                      )
                      .join("\n ")}
                    
                    
                </div>
        `;
    return view;
  },
  after_render: async () => {
    var cart = JSON.parse(localStorage.getItem("movies")) || {};

    if (cart.length === 0) {
      document.getElementById("emptyCollection").innerHTML =
        "<h2 style='margin-top: 2em; border: 1px solid #222; border-radius: 5px; padding: 10vh 1em'>  You have not movies added to your collection. Please add it first and come back later ... </h2>";
    } else {
      document.addEventListener("click", function(e) {
        if (e.target && e.target.id == "rmFromLib") {
          //do something
          var x = e.target.dataset;
          function removeInArray(cart, val) {
            for (var i = 0, len = cart.length; i < len; i++) {
              if (cart[i]["id"] === val) {
                console.log(i + cart[i]["title"]);
                var old_cart = JSON.parse(localStorage.getItem("movies"));
                old_cart.splice(i, 1);
                localStorage.removeItem("movies");
                localStorage.setItem("movies", JSON.stringify(old_cart));
                console.log(old_cart);
                old_cart = [];
              }
            }
          }
          removeInArray(cart, x.id);
          document.getElementById("loader-container").style.visibility =
            "hidden";
          document.location.reload();
        }
      });
    }
  }
};

export default Show;
