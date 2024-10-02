//! 3D-BACKGROUND

/**
 * Constants
 */
const TWO_PI = Math.PI * 2;

const purpelBubble = "#560a77";

/**
 * Application Class
 */
class Application {
  /**
   * Application constructor
   */
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.center = {
      x: this.width / 2,
      y: this.height / 2,
    };

    this.circleContainers = [];

    //Resize listener for the canvas to fill browser window dynamically
    window.addEventListener("resize", () => this.resizeCanvas(), false);
  }

  /**
   * Simple resize function. Reinitializes everything on the canvas while changing the width/height
   */
  resizeCanvas() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.center = {
      x: this.width / 2,
      y: this.height / 2,
    };

    //Empty the previous container and fill it again with new CircleContainer objects
    this.circleContainers = [];
    this.initializeCircleContainers();
  }

  /**
   * Create a number of CircleContainer objects based on the numberOfContainers variable
   * @return void
   */
  initializeCircleContainers() {
    for (let x = 0; x < this.width + 100; x += 100) {
      for (let y = 0; y < this.height + 100; y += 100) {
        //Initialize a new instance of the CircleContainer class
        let circleContainer = new CircleContainer(this.context, x, y);

        //Let the CircleContainer initialize it's children
        circleContainer.initializeCircles();

        //Add the container to our array of CircleContainer objects
        this.circleContainers.push(circleContainer);
      }
    }
  }

  /**
   * Updates the application and every child of the application
   * @return void
   */
  update() {
    for (let i = 0; i < this.circleContainers.length; i++) {
      this.circleContainers[i].update();
    }
  }

  /**
   * Renders the application and every child of the application
   * @return void
   */
  render() {
    //Clear the entire canvas every render
    this.context.clearRect(0, 0, this.width, this.height);

    //Trigger the render function on every child element
    for (let i = 0; i < this.circleContainers.length; i++) {
      this.circleContainers[i].render();
    }
  }

  /**
   * Update and render the application at least 60 times a second
   * @return void
   */
  loop() {
    this.update();
    this.render();

    window.requestAnimationFrame(() => this.loop());
  }
}

/**
 * CircleContainer Class
 */
class CircleContainer {
  /**
   * CircleContainer constructor
   * @param context - The context from the canvas object of the Application
   * @param x
   * @param y
   */
  constructor(context, x, y) {
    this.context = context;
    this.position = { x, y };

    this.numberOfCircles = 19;
    this.circles = [];

    this.baseRadius = 20;
    this.bounceRadius = 150;
    this.singleSlice = TWO_PI / this.numberOfCircles;
  }

  /**
   * Create a number of Circle objects based on the numberOfCircles variable
   * @return void
   */
  initializeCircles() {
    for (let i = 0; i < this.numberOfCircles; i++) {
      this.circles.push(
        new Circle(
          this.position.x,
          this.position.y + Math.random(),
          this.baseRadius,
          this.bounceRadius,
          i * this.singleSlice
        )
      );
    }
  }

  /**
   * Try to update the application at least 60 times a second
   * @return void
   */
  update() {
    for (let i = 0; i < this.numberOfCircles; i++) {
      this.circles[i].update(this.context);
    }
  }

  /**
   * Try to render the application at least 60 times a second
   * @return void
   */
  render() {
    for (let i = 0; i < this.numberOfCircles; i++) {
      this.circles[i].render(this.context);
    }
  }
}

/**
 * Circle Class
 */
class Circle {
  /**
   * Circle constructor
   * @param x - The horizontal position of this circle
   * @param y - The vertical position of this circle
   * @param baseRadius
   * @param bounceRadius
   * @param angleCircle
   */
  constructor(x, y, baseRadius, bounceRadius, angleCircle) {
    this.basePosition = { x, y };
    this.position = { x, y };
    this.speed = 0.01;
    this.baseSize = 10;
    this.size = 10;
    this.angle = x + y;
    this.baseRadius = baseRadius;
    this.bounceRadius = bounceRadius;
    this.angleCircle = angleCircle;
  }

  /**
   * Update the position of this object
   * @return void
   */
  update() {
    this.position.x =
      this.basePosition.x +
      Math.cos(this.angleCircle) *
        (Math.sin(this.angle + this.angleCircle) * this.bounceRadius +
          this.baseRadius);
    this.position.y =
      this.basePosition.y +
      Math.sin(this.angleCircle) *
        (Math.sin(this.angle + this.angleCircle) * this.bounceRadius +
          this.baseRadius);
    this.size = Math.cos(this.angle) * 8 + this.baseSize;

    this.angle += this.speed;
  }

  /**
   * Renders this Circle object on the canvas
   * @param context - The context from the canvas object of the Application
   * @return void
   */
  render(context) {
    context.fillStyle = purpelBubble;
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, TWO_PI);
    context.fill();
  }
}

/**
 * Onload function is executed whenever the page is done loading, initializes the application
 */
window.onload = function () {
  //Create a new instance of the application
  const application = new Application();

  //Initialize the CircleContainer objects
  application.initializeCircleContainers();

  //Start the initial loop function for the first time
  application.loop();
};

//! 3D-BACKGROUND

//! WORD ANIMATED

  // Wrap every letter in a span
  var textWrapper = document.querySelector(".word-anime");
  if (textWrapper) {
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: true })
      .add({
        targets: ".word-anime .letter",
        scale: [4, 1],
        opacity: [0, 99],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 800,
        delay: (el, i) => 70 * i,
      })
      .add({
        targets: ".word-anime",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
  }

//! WORD ANIMATED

//! PROJECT NAV-BAR SELECTOR "FILTER"

  const navItems = document.querySelectorAll(".project-nav ul li");
  const images = document.querySelectorAll(".project-container .project-item");

  const displayImages = (filter) => {
    images.forEach((img) => {
      const category = img.querySelector("img").getAttribute("data-category"); // Get data-category from the img tag inside .project-item
      if (filter === "all" || filter === category) {
        img.style.display = "block"; // Show the project item
      } else {
        img.style.display = "none"; // Hide the project item
      }
    });
  };

  // Initially display all images
  displayImages("all");

  // Add click event listeners to filter items
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove 'active' class from all nav items
      navItems.forEach((nav) => nav.classList.remove("active"));

      // Add 'active' class to the clicked nav item
      item.classList.add("active");

      // Get the filter from the clicked item and display the filtered images
      const filter = item.getAttribute("data-filter");
      displayImages(filter);
    });
  });



//! PROJECT NAV-BAR SELECTOR "FILTER"

//! PROJECT NAV-BAR SELECTOR "ACTIVE"

  const navBar = document.querySelectorAll(".project-nav li");

  navBar.forEach((button) => {
    button.addEventListener("click", function () {
      //* Remove 'active' class from all buttons
      navBar.forEach((btn) => btn.classList.remove("active"));
      //* Add 'active' class to the clicked button
      this.classList.add("active");
    });
  });

//! PROJECT NAV-BAR SELECTOR "ACTIVE"

//! IMAGES PROJECT :HOVER TO SHOW DESCRIPTION

//* Array of object for the info of each project image

  const contentData = [
    {
      title: "Bufet Argilés Bertran",
      description: "Law firm web page",
      techTools: "HTML / CSS",
    },
    {
      title: "Portfolio 1.0",
      description: "Personal Web Developer Portfolio",
      techTools: "JS / HTML / CSS",
    },
    {
      title: "Phantom Runner",
      description: "2D Game",
      techTools: "JS / HTML / CSS",
    },
  ];

  const projectUrls = [
    "https://www.bufetargiles.com",
    "https://github.com/tonitoar/tonitoar.github.io",
    "https://github.com/tonitoar/Phantom-Runner",
  ];

  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item, index) => {
    // Crear la descripción que aparece al hacer hover
    const hoverDescription = document.createElement("div");
    hoverDescription.classList.add("hover-description");

    const title = document.createElement("h3");
    title.innerText = contentData[index].title;

    const description = document.createElement("p");
    description.innerText = contentData[index].description;

    const techTools = document.createElement("h4");
    techTools.innerText = contentData[index].techTools;

    const button = document.createElement("button");
    button.innerHTML = "LEARN MORE";

    // Set the onclick event to open the URL in a new tab (target="_blank")
    button.onclick = () => {
      window.open(projectUrls[index], "_blank"); // Opens in a new tab
  };

    hoverDescription.appendChild(title);
    hoverDescription.appendChild(description);
    hoverDescription.appendChild(techTools);
    hoverDescription.appendChild(button);

    item.appendChild(hoverDescription); // Añadir la descripción al contenedor de cada imagen

    // Mostrar la descripción al hacer hover
    item.addEventListener("mouseover", () => {
      hoverDescription.style.display = "flex";
    });

    // Ocultar la descripción al quitar el hover
    item.addEventListener("mouseout", () => {
      hoverDescription.style.display = "none";
    });
  });


//! IMAGES PROJECT :HOVER TO SHOW DESCRIPTION



//! CONNECT FORM TO GMAIL


const userID = '6JDX8MOmScLQ9F5XC';
const serviceID = 'service_portfolio';
const templateID = 'template_portfolio';

emailjs.init(userID); 

const form = document.getElementById("email-content");

form.addEventListener("submit", function(event) {
  event.preventDefault(); //* Prevent default form submission

  emailjs.sendForm(serviceID, templateID, this)
  .then(function(response) {
    console.log("Success!", response.status, response.text);
    alert("Message sent successfully!");
  }, function(error) {
    console.log("Failed...", error);
    alert("Failed to send message");
  });
}); 