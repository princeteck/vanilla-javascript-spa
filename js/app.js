"use strict";

import Home from "../views/pages/Home.js";
import About from "../views/pages/About.js";
import Error404 from "../views/pages/Error404.js";
import Show from "../views/pages/Show.js";

import Navbar from "../views/components/Navbar.js";
import Footer from "../views/components/Footer.js";

import Utils from "../services/Utils.js";

// Listing all Supported routes. Any url other than these will throw a 404 error

const routes = {
  "/": Home,
  "/about": About,
  "/movie/:id": Show
};

// Below is the router section. It takes a url, checks it agaisnt the route list and then renders the corresponding content page.

const router = async () => {
  // lazy loading of view
  const header = null || document.getElementById("header_container");
  const content = null || document.getElementById("page_container");
  const footer = null || document.getElementById("footer_container");

  // after loading the view, redner the header and footer of the page

  header.innerHTML = await Navbar.render();
  await Navbar.after_render();
  footer.innerHTML = await Footer.render();
  await Footer.after_render();

  // get the parsed URL form the address bar or browser
  let request = Utils.parseRequestURL();

  // Parse the URL and if it has a id part, change it with string ":id"
  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  // get the page from our hash of supported routes.
  // if the parsed url is not in our url list, select 404 error page instead

  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

// listen on the hash change
window.addEventListener("hashchange", router);
// listen on page load
window.addEventListener("load", router);
