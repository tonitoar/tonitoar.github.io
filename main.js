const TWO_PI = Math.PI * 2;

const redBubble = "#4E0000";

class Application {
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

    window.addEventListener("resize", () => this.resizeCanvas(), false);
  }

  resizeCanvas() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.center = {
      x: this.width / 2,
      y: this.height / 2,
    };

    this.circleContainers = [];
    this.initializeCircleContainers();
  }

  initializeCircleContainers() {
    for (let x = 0; x < this.width + 100; x += 100) {
      for (let y = 0; y < this.height + 100; y += 100) {
        let circleContainer = new CircleContainer(this.context, x, y);

        circleContainer.initializeCircles();

        this.circleContainers.push(circleContainer);
      }
    }
  }

  update() {
    for (let i = 0; i < this.circleContainers.length; i++) {
      this.circleContainers[i].update();
    }
  }

  render() {

    this.context.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.circleContainers.length; i++) {
      this.circleContainers[i].render();
    }
  }

  loop() {
    this.update();
    this.render();

    window.requestAnimationFrame(() => this.loop());
  }
}

class CircleContainer {

  constructor(context, x, y) {
    this.context = context;
    this.position = { x, y };

    this.numberOfCircles = 19;
    this.circles = [];

    this.baseRadius = 20;
    this.bounceRadius = 150;
    this.singleSlice = TWO_PI / this.numberOfCircles;
  }

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

  update() {
    for (let i = 0; i < this.numberOfCircles; i++) {
      this.circles[i].update(this.context);
    }
  }

  render() {
    for (let i = 0; i < this.numberOfCircles; i++) {
      this.circles[i].render(this.context);
    }
  }
}

class Circle {

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

  render(context) {
    context.fillStyle = redBubble;
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, TWO_PI);
    context.fill();
  }
}

window.onload = function () {

  const application = new Application();

  application.initializeCircleContainers();

  application.loop();
};





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





const navBarMobile = document.querySelector(".nav-dropdown-toggle"); 
const navBarMobileButtons = document.querySelector(".nav-dropdown-menu"); 

navBarMobile.addEventListener("click", () => {
  navBarMobileButtons.classList.toggle("show"); 
}); 

navBarMobileButtons.addEventListener("click", () => {
  navBarMobileButtons.classList.remove("show"); 
})





const navBarMobileSticky = document.getElementById("navBar"); 

window.addEventListener("scroll", () => {
  const isSticky = navBarMobileSticky.getBoundingClientRect().top <= 0; 

  const is425to376 = window.matchMedia("(min-width: 376px) and (max-width: 425px)").matches; 
  const is375to321 = window.matchMedia("(min-width: 321px) and (max-width: 375px)").matches; 
  const is320 = window.matchMedia("(max-width: 320px)").matches; 

  if (isSticky && (is425to376 || is375to321 || is320)) {
    navBarMobileSticky.classList.add("nav-sticky-shadow"); 
  } else {
    navBarMobileSticky.classList.remove("nav-sticky-shadow"); 
  }
})





const projectNavBarMobile = document.querySelector(".project-nav-dropdown-toggle"); 
const projectNavBarMobileButtons = document.querySelector(".project-nav-dropdown-menu"); 

projectNavBarMobile.addEventListener("click", () => {
  projectNavBarMobileButtons.classList.toggle("show"); 
}); 

projectNavBarMobileButtons.addEventListener("click", () => {
  projectNavBarMobileButtons.classList.remove("show"); 
})





  const navItems = document.querySelectorAll(".project-nav ul li");
  const images = document.querySelectorAll(".project-container .project-item");

  const displayImages = (filter) => {
    images.forEach((img) => {
      const category = img.querySelector("img").getAttribute("data-category"); 
      if (filter === "all" || filter === category) {
        img.style.display = "block";
      } else {
        img.style.display = "none"; 
      }
    });
  };

  displayImages("all");

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
 
      navItems.forEach((nav) => nav.classList.remove("active"));

      item.classList.add("active");

      const filter = item.getAttribute("data-filter");
      displayImages(filter);
    });
  });





  const projectNavBAr = document.querySelectorAll(".project-nav li");

  projectNavBAr.forEach((button) => {
    button.addEventListener("click", function () {
      projectNavBAr.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });





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
    "https://github.com/tonitoar/Bufet-Argiles-Advocats",
    "https://github.com/tonitoar/tonitoar.github.io",
    "https://github.com/tonitoar/Phantom-Runner",
  ];

  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item, index) => {

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

    button.onclick = () => {
      window.open(projectUrls[index], "_blank"); 
  };

    hoverDescription.appendChild(title);
    hoverDescription.appendChild(description);
    hoverDescription.appendChild(techTools);
    hoverDescription.appendChild(button);

    item.appendChild(hoverDescription); 

    item.addEventListener("mouseenter", () => {
      hoverDescription.style.display = "flex";

      hoverDescription.setAttribute("transition-style", "in:square:center");
    });

    item.addEventListener("mouseleave", () => {

      hoverDescription.setAttribute("transition-style", "out:square:center"); 
    
      setTimeout(() => {
        hoverDescription.style.display = "none";
        hoverDescription.removeAttribute("transition-style");
      }, 500);
    });
  });





const userID = '6JDX8MOmScLQ9F5XC';
const serviceID = 'service_portfolio';
const templateID = 'template_portfolio';

emailjs.init(userID); 

const form = document.getElementById("email-content"); 
const formInput = document.getElementsByTagName("input"); 
const formTextArea = document.getElementsByTagName("textarea"); 
const subjectOption = document.getElementById("subject_type"); 

form.addEventListener("submit", function(event) {
  event.preventDefault(); 

  emailjs.sendForm(serviceID, templateID, this)
  .then(function(response) {
    console.log("Success!", response.status, response.text);
    alert("Message sent successfully!");
  
    for (let i = 0; i < formInput.length; i++) {
      formInput[i].value = ""; 
    }
    for (let i = 0; i < formTextArea.length; i++) {
      formTextArea[i].value = ""; 
    }

    subjectOption.value = "Recruiter"; 
  }, function(error) {
    console.log("Failed...", error);
    alert("Failed to send message");
  });
}); 
