let Navbar = {
  render: async () => {
    let view = /*html*/ `
    <nav class="navbar">
        <span class="navbar-toggle" id="js-navbar-toggle">
            <i class="fas fa-bars"></i>
        </span>
        <a href="./" class="logo"><img class="img-responsive" height="50" src="data:image/svg+xml;base64,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"> </img> </a>
        <ul class="main-nav" id="js-menu">
            <li>
                <a href="./" class="nav-links">Home</a>
            </li>
            <li>
                <a href="#/about" class="nav-links">About Us</a>
            </li>
            <li>
                <a href="#/random" class="nav-links">Link Not Working Demo</a>
            </li>
            <li>
                <a href="#/my-collection" class="nav-links">My Collection</a>
            </li>
        </ul>
</nav>
             
        `;
    return view;
  },
  after_render: async () => {
    let mainNav = document.getElementById("js-menu");
    let navBarToggle = document.getElementById("js-navbar-toggle");
    navBarToggle.addEventListener("click", function() {
      mainNav.classList.toggle("active");
    });
  }
};

export default Navbar;
