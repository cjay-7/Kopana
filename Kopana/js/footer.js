const footerTemplate = document.createElement("template");

footerTemplate.innerHTML = `
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
        .footer-container {
            padding: 0% 5%;
            text-align: left;
            display: flex;
            justify-content: space-evenly;
          }
          .footer-set-1 {
            width: 25%;
          }
          .footer-set-2 {
            width: 20%;
          }
          .footer-set-3 {
            width: 30%;
          }
          .footer-logo-container {
            width: 25%;
          }
          
          .footer-container a,
          .footer-container p {
            font-size: 12px;
            color: #8b8b8b;
            text-decoration: none;
          }
          
          .footer-container li {
            padding: 10px;
          }
          .footer-container td {
            padding: 0 2%;
            vertical-align: top;
          }
          .footer-logo {
            display: block;
            cursor: pointer;
            margin: 10px auto 0;
            width: 110px;
          }
          .footer-logo-container h3{
            color: #8b8b8b;
            font-size: 13px;
            font-weight: 500;
            position: relative;
            top: 15%;
            text-align: center;
          }
          .footer-set-2 h3{
            margin: 10px;
          }
          .footer-set-3 h3 {
            margin-bottom:10px;
          }
          .footer-set-3 span:hover{
            text-decoration: underline;
          }
          .footer-list {
            list-style: none;
          }
          
          .footer-link-container {
            margin-top: 0;
          }
          
          .footer-link-left {
            border-right: 1px solid #8b8b8b;
            padding-right: 5px;
          }
          .footer-head {
            color: #fff;
          }
          footer i {
            color: #fafafa;
            padding: 0 10px;
          }        
          /* Extra small devices (phones, 600px and down) */
          @media only screen and (max-width: 600px) {
            // .footer-mobile-flexbox{
            //   diplay: flex
            // } 
            .footer-container {
              justify-content: space-between;
              padding: 4% 3%;
            }
            .footer-set-1,
            .footer-set-2 {
              display: none;
            }
            .footer-set-3 {
              width: 60%;
            }
            
            .footer-logo-container{
              width:45%;
            }
            .footer-logo {
              margin: 0 auto;
              display: block;
            }
          }

          
  </style>

  <footer>
  <div class="footer-container">
    <div class="footer-logo-container">
      <img class="footer-logo" src="../Images/KOPA.webp"></img>
      <h3>Made with <span class="fa-solid fa-heart"></span> by Jay
      </h3>
    </div>
      <!-- <div class=footer-mobile-flexbox> -->
            <div class="footer-set-1 footer-link-container">
            <ul class="footer-list">
              <li>
                <h3 class="footer-head">ABOUT</h3>
                <a class="footer-link-left" href="#">Profile</a>
                <a href="#">Founder</a>
              </li>
              <li>
                <h3 class="footer-head">PROGRAMS</h3>
                <a class="footer-link-left" href="#">Retreats</a>
                <a class="footer-link-left" href="#">Workshops</a>
                <a href="#">Corporate Training</a>
              </li>
              <li>
                <h3 class="footer-head">MEDIA & GALLERY</h3>
                <a class="footer-link-left" href="#">Press & Media</a>
                <a class="footer-link-left" href="#">Photo Gallery</a>
                <a href="#">Videos</a>
              </li>
            </ul>
            </div>
            <!-- </div> -->
          
          <!--  <div class=footer-mobile-flexbox> -->
            <div class="footer-set-2 footer-link-container">
              <h3 class="footer-head">TESTIMONIAL</h3>
              
              <h3 class="footer-head">BLOG</h3>
              
              <h3 class="footer-head">CONTACT</h3>
            </div>
            <div class="footer-set-3 footer-link-container">
              <ul class="footer-list">
                <li>
                  <h3 class="footer-head">CONTACT</h3>
              
                  <a href="tel:+91 70457 08936">Gary D’Souza: <span>+91 70457 08936</span></a>
                  <br/>
                  <a href="tel:+91 90290 48479">Baptist Fernandes: <span>+91 90290 48479</span></a>
                  <br/>
                  <a href="mailto:kopanafootball@gmail.com" target="_blank">Email: <span>kopanafootball@gmail.com</span></a>
                </li>
                <li>
                  <p>VP Road, LIC Colony, Suresh Colony,
                  Vile Parle West
                  Mumbai 400056</p>
                </li>
                <li>
                  <i class="fa-brands fa-facebook"></i>
                  <i class="fa-brands fa-instagram"></i>
                  <i class="fa-brands fa-linkedin"></i>
                  <i class="fa-brands fa-youtube"></i>
                </li>
              </ul>
            </div>
          <!-- </div> -->
  </div>
  </footer>
`;

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "closed" });

    shadowRoot.appendChild(footerTemplate.content);
  }
}

customElements.define("footer-component", Footer);
