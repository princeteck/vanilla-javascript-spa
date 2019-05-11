// define source data

let getMoviesList = async () => {
  const options = {
    method: "GET"
  };
  try {
    const response = await fetch(
      `https://yts.am/api/v2/list_movies.json?limit=10`,
      options
    );
    const json = await response.json();
    console.log(json.data);
    return json.data.movies;
  } catch (e) {
    console.log("Error getting data: ", e);
  }
};

let Home = {
  render: async () => {
    let movies = await getMoviesList();
    let view = /*html*/ `
            <section class="section">
                <h1> Home ( Listing Movies ) </h1>
                <ul>
                    ${movies
                      .map(
                        movie =>
                          /*html*/ `<li><a href="#/movie/${movie.id}">${
                            movie.title
                          }</a></li>`
                      )
                      .join("\n ")}
                </ul>
            </section>
        `;
    return view;
  },
  after_render: async () => {}
};

export default Home;
