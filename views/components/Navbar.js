let Navbar = {
  render: async () => {
    let view = /*html*/ `
            <nav class="navbar">
                <ul>
                    <li><a href="#/">Home</a></li>
                    <li><a href="#/about">About</a></li>
                    <li><a href="#/random">Random</a></li>
                </ul>
            </nav>  
        `;
    return view;
  },
  after_render: async () => {}
};

export default Navbar;
