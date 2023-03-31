// const gallery_imageTemplate = document.createElement("template");

// gallery_imageTemplate.innerHTML = `
// <div class="grid-item item animate-box" data-animate-effect="fadeIn">
// <a
//   href=""
//   class="image-popup"
//   title="Name of photo or title here"
// >
//   <div class="img-wrap">
//     <img src="" alt="" class="img-responsive" />
//   </div>
//   <div class="text-wrap">
//     <div class="text-inner popup">
//       <div>
//         <h2></h2>
//       </div>
//     </div>
//   </div>
// </a>
// </div>
// `;

// class galleryImage extends HTMLElement {
//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     const shadowRoot = this.attachShadow({ mode: "closed" });

//     shadowRoot.appendChild(gallery_imageTemplate.content);

//     const galleryItem = shadowRoot.querySelector(".image-popup");

//     const galleryImg = shadowRoot.querySelector(".img-responsive");

//     for (i = 1; i <= 100; i++) {
//       image_href = "../../Images/Gallery/img_" + i + ".webp";
//       galleryItem.setAttribute("href", image_href);
//       galleryImg.setAttribute("href", image_href);
//     }
//   }
// }

// customElements.define("gallery-image-component", galleryImage);
