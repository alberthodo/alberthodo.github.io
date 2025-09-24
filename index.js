// // // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // gsap.registerPlugin(ScrollTrigger);

// // // Function to apply initial blur effect to the "projects" section
// // function initialBlur() {
// //   const projectsSection = document.querySelector(".projects");
// //   const aboutSection = document.querySelector("#about");

// //   // Apply CSS filter property to blur the "projects" section
// //   gsap.set(projectsSection, {
// //     filter: "blur(10px)", // Blur effect with 10px radius
// //   });

// //   // Animate away the blur effect when user scrolls
// //   ScrollTrigger.create({
// //     trigger: projectsSection,
// //     start: "top center", // Start animation when the top of the "projects" section reaches the center of the viewport
// //     onEnter: () => {
// //       gsap.to(projectsSection, {
// //         filter: "none", // Remove the blur effect
// //         duration: 1, // Duration of the animation
// //         ease: "power4.inOut", // Easing function
// //       });
// //       // Scroll to the projects section when the blur goes away
// //       window.scrollTo({
// //         top: projectsSection.offsetTop,
// //         behavior: "smooth", // Smooth scrolling behavior
// //       });
// //     },
// //   });

// //   // Animate opacity of the "about" section on scroll
// //   gsap.to(aboutSection, {
// //     opacity: 0, // Animate opacity from 1 to 0
// //     scrollTrigger: {
// //       trigger: aboutSection,
// //       start: "top top", // Start the animation when the top of the "about" section reaches the top of the viewport
// //       //end: "bottom bottom", // End the animation when the bottom of the "about" section reaches the bottom of the viewport
// //       scrub: true, // Smoothly transition the opacity as the user scrolls
// //       ease: "power4.inOut",
// //     },
// //   });
// // }

// // // Call the initialBlur function when the document is loaded
// // document.addEventListener("DOMContentLoaded", initialBlur);
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // Function to apply initial blur effect to the "projects" section
// function initialBlur() {
//   const projectsSection = document.querySelector(".projects");
//   const aboutSection = document.querySelector("#about");

//   // Apply CSS filter property to blur the "projects" section
//   gsap.set(projectsSection, {
//     filter: "blur(10px)", // Blur effect with 10px radius
//   });

//   // Animate away the blur effect when user scrolls down
//   ScrollTrigger.create({
//     trigger: projectsSection,
//     start: "top center", // Start animation when the top of the "projects" section reaches the center of the viewport
//     onEnter: () => {
//       gsap.to(projectsSection, {
//         filter: "none", // Remove the blur effect
//         duration: 1, // Duration of the animation
//         ease: "power4.inOut", // Easing function
//       });
//       // Scroll to the projects section when the blur goes away
//       window.scrollTo({
//         top: projectsSection.offsetTop,
//         behavior: "smooth", // Smooth scrolling behavior
//       });
//     },
//   });

//   // Animate opacity of the "about" section on scroll down
//   ScrollTrigger.create({
//     trigger: aboutSection,
//     start: "top top", // Start the animation when the top of the "about" section reaches the top of the viewport
//     end: "bottom top", // End the animation when the bottom of the "about" section reaches the top of the viewport
//     scrub: true, // Smoothly transition the opacity as the user scrolls
//     ease: "power4.inOut",
//     onUpdate: (self) => {
//       if (self.direction === -1) {
//         // Check if scrolling direction is up
//         // Reapply the initial blur effect when scrolling back up
//         gsap.to(projectsSection, {
//           filter: "blur(10px)", // Reapply the blur effect
//           duration: 1, // Duration of the animation
//           ease: "power4.inOut", // Easing function
//         });
//       }
//     },
//   });

//   // Animate opacity of the "about" section on scroll down
//   gsap.to(aboutSection, {
//     opacity: 0, // Animate opacity from 1 to 0
//     scrollTrigger: {
//       trigger: aboutSection,
//       start: "top top", // Start the animation when the top of the "about" section reaches the top of the viewport
//       end: "bottom top", // End the animation when the bottom of the "about" section reaches the top of the viewport
//       scrub: true, // Smoothly transition the opacity as the user scrolls
//       ease: "power4.inOut",
//     },
//   });
// }

// // Call the initialBlur function when the document is loaded
// document.addEventListener("DOMContentLoaded", initialBlur);
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Function to apply initial blur effect to the "projects" section
function initialBlur() {
  const projectsSection = document.querySelector(".projects");
  const aboutSection = document.querySelector("#about");

  // Apply CSS filter property to blur the "projects" section
  gsap.set(projectsSection, {
    filter: "blur(10px)", // Blur effect with 10px radius
  });

  // Animate away the blur effect when user scrolls down
  ScrollTrigger.create({
    trigger: projectsSection,
    start: "top center", // Start animation when the top of the "projects" section reaches the center of the viewport
    onEnter: () => {
      gsap.to(projectsSection, {
        filter: "none", // Remove the blur effect
        duration: 1, // Duration of the animation
        ease: "power4.inOut", // Easing function
      });
      // Scroll to the projects section when the blur goes away
      window.scrollTo({
        top: projectsSection.offsetTop,
        behavior: "smooth", // Smooth scrolling behavior
      });
    },
  });

  // Animate opacity of the "about" section on scroll down
  ScrollTrigger.create({
    trigger: aboutSection,
    start: "top top", // Start the animation when the top of the "about" section reaches the top of the viewport
    end: "bottom top", // End the animation when the bottom of the "about" section reaches the top of the viewport
    scrub: true, // Smoothly transition the opacity as the user scrolls
    ease: "power4.inOut",
    onUpdate: (self) => {
      if (self.direction === -1) {
        // Check if scrolling direction is up
        // Reapply the initial blur effect when scrolling back up
        gsap.to(projectsSection, {
          filter: "blur(10px)", // Reapply the blur effect
          duration: 1, // Duration of the animation
          ease: "power4.inOut", // Easing function
        });
      }
    },
  });

  // Animate opacity of the "about" section when the site opens or reloads
  gsap.fromTo(
    aboutSection,
    { opacity: 0 }, // Initial state: opacity set to 0
    { opacity: 1, duration: 1.5, ease: "power4.inOut" } // Final state: opacity animated to 1
  );
}

// Call the initialBlur function when the document is loaded
document.addEventListener("DOMContentLoaded", initialBlur);
