let About = {
  render: async () => {
    let view = /*html*/ `
            <section class="section">
                <h1> About </h1>
                <br><br>
                <p>
                  This is a Developer experiment for learning and creating a spa from vanilla javascript. here i have implemented router, components i.e. pages itself. so let's have fun with the experiment...
                </p>
            </section>
        `;
    return view;
  },
  after_render: async () => {}
};

export default About;
