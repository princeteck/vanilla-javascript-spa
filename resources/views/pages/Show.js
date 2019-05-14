import Utils from "./../../services/Utils.js";

let getPost = async id => {
  const options = {
    method: "GET"
  };
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=1756017a03786e306fc358d4a4186de0&`,
      options
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.log("Error getting documents", err);
  }
};

let Show = {
  render: async () => {
    let request = Utils.parseRequestURL();
    let movie = await getPost(request.id);

    // console.log(movie);

    return /*html*/ `
            <section class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"  style="text-align: left"> 
                <strong> ID : ${movie.id}</strong>
                <h1> Movie : ${movie.title} </h1>
                <h5>${movie.tagline} </h5> <br>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                <img class="img-responsive" src="https://image.tmdb.org/t/p/original/${
                  movie.poster_path
                }" ></img>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8"  style="text-align: left">
                  <div style="padding-left:1em">
                    <h2><strong>Overview</strong></h2>  <br>
                    <p> ${movie.overview} </p>
                    <br>
                    <strong>Original Language: </strong><br> ${
                      movie.original_language
                    }
                    <br>
                    <br>

                    <strong>Status: </strong><br> ${movie.status}
                    <br>
                    <br>
                    <strong>Release Date: </strong><br> ${movie.release_date}
                    <br><br>
                    <button class="btn btn-primary" onclick="window.history.back();">Go Back</button>
                  </div>
                </div>
            </section>
        `;
  },
  after_render: async () => {}
};

export default Show;
