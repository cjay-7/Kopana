const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = `
<link rel="stylesheet" href="../css/all.min.css" />
  <style>
        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Montserrat";
        }
        body {
          background-color: #131416;
        }
        section {
          margin-bottom: 2%;
        }

        .less-dark {
          background-color: #202125;
        }
        h1 {
          font-size: 50px;
          line-height: 1;
          color: #fff;
          padding: 2% 3%;
        }
        b {
          font-weight: 900;
        }
        header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          justify-content: space-evenly;
          align-items: center;
          transition: 0.6s;
          padding: 40px 100px;
          z-index: 10000;
          font-size: 17px;
          display: flex;
        }

        .sticky {
          padding: 20px 100px;
          background-color: #1c1d21;
        }

        .head-logo {
        width: 7%;
        transition: 0.6s;
        cursor: pointer;
        }
        .head-mobile-toggle{
          display:none;
        }

        .head-list {
        
        display: flex;
        align-items: center;
        }

        header ul li {
        
        list-style: none;
        padding: 0 5px;
        
        }

        header ul li a {
        margin: 0 15px;
        text-decoration: none;
        color: #fff;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        }
        .sticky ul li a,
        .sticky .head-logo {
        color: #fff;
        }

        /* Extra small devices (phones, 600px and down) */

        @media only screen and (max-width: 600px) {
          header {
            position: fixed;
            justify-content: space-between; 
            align-items: flex-start;
            transition: 0.6s;
            padding: 0;
            z-index: 10000;
            font-size: 17px;
            display: flex;
            height: 12vh;
          }
  
          .head-list {
            position: relative;
            display: flex;
            height: 100%;
            width: 80vw;
            align-items: normal;
            flex-direction: column;
            background: hsl(0 0% 0% / 0.6);
            backdrop-filter: blur(1rem);
            padding: min(20vh, 10rem) 2em 100vh;
            transform: translateX(100%);
            transition: transform 350ms ease-in;
          }

          .head-list[data-visible="true"] {
            transform: translateX(0%);
            transition: transform 350ms ease-out;
          }

          .head-logo {
            width: 15%;
            margin: 2.5vh;
          }

          header ul li {
            position: relative;
            list-style: none;
            padding: 0px 20px;
            margin: 7% 0;
          }

          header ul li a {
            margin: 0;
            font-size: 24px;
          }

          .head-mobile-toggle {
            display: block;
            position: absolute;
            top: 3.5vh;
            right: 5vw;
            width: 11vw;
            aspect-ratio: 1;
            z-index: 9999;
            border: none;
            background: transparent;
            padding: 0% 0%;
            font-size: 36px;
            color: #fff;
            transition: 400ms ease-out;
          }

          .head-mobile-toggle[aria-expanded="true"] {
            font-size: 44px;
            top: 3vh;
            transition: 400ms ease-out;
          }

          .sticky {
            padding: 0;
            background-color: #1c1d21;
          }

          .sticky ul {
            height:100%;
          }

        }
        


  </style>
  <header>
    <img class="head-logo" src="../Images/KOPA.png" alt="logo" onclick="location.href='../index.html'"/>
    <button class="head-mobile-toggle" type="button" aria-controls="primary-nav" aria-expanded="false" ><i class="fa-solid fa-bars"></i></button>
      <ul id="primary-nav" class="head-list" data-visible="false" >
        <li><a href="../index.html">Home</a></li>
        <li><a href="../html/AboutUs.html">About Us</a></li>
        <li><a href="../html/News.html">News</a></li>
        <li><a href="../html/Schedule.html">Schedule</a></li>
        <li><a href="../html/Gallery.php">Gallery</a></li>
        <li><a href="../html/ContactUs.html">Contact Us</a></li>
      </ul>
    </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "closed" });

    shadowRoot.appendChild(headerTemplate.content);

    // Header Scroll Sticky

    window.addEventListener("scroll", function () {
      var header = shadowRoot.querySelector("header");
      header.classList.toggle("sticky", window.scrollY > 0);
    });

    // Header Mobile Toggle Button
    const headList = shadowRoot.querySelector(".head-list");
    const toggleButton = shadowRoot.querySelector(".head-mobile-toggle");
    toggleButton.addEventListener("click", () => {
      const visibility = headList.getAttribute("data-visible");
      if (visibility === "false") {
        headList.setAttribute("data-visible", true);
        toggleButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        toggleButton.setAttribute("aria-expanded", true);
      } else if (visibility === "true") {
        headList.setAttribute("data-visible", false);
        toggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
        toggleButton.setAttribute("aria-expanded", false);
      }
    });

    //Close nav on scrolling
    (function () {
      var previousScroll = 0;

      window.addEventListener("scroll", function (e) {
        var currentScroll = window.scrollY;
        var isDown = currentScroll > previousScroll;

        if (isDown && headList.getAttribute("data-visible") === "true") {
          // scrolling down
          headList.setAttribute("data-visible", false);
          toggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
          toggleButton.setAttribute("aria-expanded", false);
        } else if (
          !isDown &&
          headList.getAttribute("data-visible") === "true"
        ) {
          // scrolling up
          headList.setAttribute("data-visible", false);
          toggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
          toggleButton.setAttribute("aria-expanded", false);
        }

        // always update position
        previousScroll = currentScroll;
      });
    })();
  }
}

customElements.define("header-component", Header);
