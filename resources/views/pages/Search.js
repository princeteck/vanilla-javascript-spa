import Utils from "./../../services/Utils.js";

let getMoviesList = async id => {
  console.log(process.env.API_URL);
  function snackbarToast(msg) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = msg;
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json; charset=utf-8",
  //     "Access-Control-Allow-Origin": "*"
  //   }
  // };
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1756017a03786e306fc358d4a4186de0&query=${id}`
    );
    const json = await response.json();
    console.log(json);
    return json.results;
  } catch (e) {
    console.log("Error getting data: ", e);
    snackbarToast("Error getting data: " + e);
  }
};

let Search = {
  render: async () => {
    let request = Utils.parseRequestURL();
    let movies = await getMoviesList(request.id);
    let view = /*html*/ `
                
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <h1> Home </h1>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                    <input name="search" id="sparam" placeholder="Name of the Movie to Search" />
                    <button class="btn btn-primary" type="submit" id="search" ><i class="fas fa-search"></i> </button>
                  </div>
                </div>
                

                <div class="row">
                  
                    ${movies
                      .map(
                        movie => /*html*/ `<div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
        <div class="card">
          <div class="card-media">
            <figure>
            <img
              class="img-responsive"
              src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${
                movie.poster_path
              }"
              alt="${movie.original_title} banner"
            />
            </figure>
          </div>
            <div class="card-content">
             ${movie.overview.substr(0, 160)}...
             <br><br> 
             <button class="btn btn-primary addToLib" data-id="${
               movie.id
             }" data-title="${movie.original_title}" data-overview="${
                          movie.overview
                        }" data-banner="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${
                          movie.poster_path
                        }" id="addToLib" > ADD TO COLLECTION </button>
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
    let request = Utils.parseRequestURL();
    document.addEventListener("click", function(e) {
      if (e.target && e.target.id == "addToLib") {
        //do something
        var x = e.target.dataset;

        function findInArray(cart, val) {
          for (var i = 0, len = cart.length; i < len; i++) {
            if (cart[i]["id"] === val) {
              // strict equality test
              return true;
            }
          }
          return false;
        }
        console.log(x.id);
        var cart = JSON.parse(localStorage.getItem("movies")) || {};

        //check if cart if empty and if yes the init it.
        if (cart.length === 0) {
          console.log("cart length not zero");
          cart.push({
            id: x.id,
            title: x.title,
            overview: x.overview,
            banner: x.banner
          });
          localStorage.setItem("movies", JSON.stringify(cart));
        } else {
          if (!findInArray(cart, x.id)) {
            console.log("item not in collection");
            cart.push({
              id: x.id,
              title: x.title,
              overview: x.overview,
              banner: x.banner
            });
            localStorage.setItem("movies", JSON.stringify(cart));
          }
        }
      }

      if (e.target && e.target.id == "search") {
        var s = document.getElementById("sparam");
        console.log(s.value);
        var url = window.location.toString();
        console.log(url);
        if (s.value != "") {
          window.location = url.replace(
            "#/search/" + request.id,
            "#/search/" + s.value
          );
        }
      }
    });
  }
};

export default Search;
