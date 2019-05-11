let Footer = {
  render: async () => {
    let view = /*html*/ `
            <footer>
                <div class="container">
                    <div class="content align-center">
                    <p>
                        This is the footer Section for my spa.
                    </p>
                    </div>
                </div>
            </footer>
        `;
    return view;
  },
  after_render: async () => {}
};
export default Footer;
