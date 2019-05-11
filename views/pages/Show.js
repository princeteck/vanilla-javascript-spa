import Utils from "./../../services/Utils.js";

let getPost = async id => {
  const options = {
    method: "GET"
  };
  try {
    const response = await fetch(
      `https://yts.am/api/v2/movie_details.json?movie_id=` + id,
      options
    );
    const json = await response.json();
    // console.log(json)
    return json.data.movie;
  } catch (err) {
    console.log("Error getting documents", err);
  }
};

let Show = {
  render: async () => {
    let request = Utils.parseRequestURL();
    let post = await getPost(request.id);

    return /*html*/ `
            <section class="section">
                <h1> Post Id : ${post.id}</h1>
                <p> Post Title : ${post.title} </p>
                <p> Post Content : ${post.content} </p>
                <p> Post Author : ${post.name} </p>
            </section>
        `;
  },
  after_render: async () => {}
};

export default Show;
