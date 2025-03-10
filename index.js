function triggerPresentation() {
    // Poem text
    const presentationText = `<p>Quantitative Methods Presentation - March 10th - Arjun Ghumman - Proposing an Information theory-based alternative to cross-validation in selecting a tuning parameter.</p>`;

    // Function to insert text into divs
    function insertTextIntoDivs() {
        // Get all .text divs
        const textDivs = document.querySelectorAll(".text");

        // Insert presentation text into all .text divs
        textDivs.forEach((div) => {
            div.innerHTML = presentationText;
        });
    }

    // Adjust content size function
    function adjustContentSize() {
        const contentDiv = document.querySelector(".content");
        if (!contentDiv) return; // Ensure the content div exists

        const viewportWidth = window.innerWidth;
        const baseWidth = 1000;
        const scaleFactor = viewportWidth < baseWidth ? (viewportWidth / baseWidth) * 0.8 : 1;
        contentDiv.style.transform = `scale(${scaleFactor})`;
    }

    // Execute functions
    insertTextIntoDivs();
    adjustContentSize();
}

// Attach event listener to the play div
document.addEventListener("DOMContentLoaded", () => {
    const playDiv = document.querySelector(".start");
    if (playDiv) {
        playDiv.addEventListener("click",() => {
            gsap.set(".container", { display: "flex" });
            gsap.set(".start", { display: "none" });
            triggerPresentation();
        });
    }
});

// Adjust content size on window resize
window.addEventListener("resize", () => {
    const contentDiv = document.querySelector(".content");
    if (contentDiv) {
        triggerPresentation();
    }
});


let closer = document.querySelector(".close");

closer.addEventListener("click", () => {

    let tl1 = gsap.timeline();
    tl1.to(".container", {
        duration: 3.5,
        opacity: 0,
        yPercent: 100,
        ease: "power4.in",
        onComplete: () => {
            document.querySelector(".container").style.display = "none";
        }
    }).set(".close", { opacity: 0,
        onComplete: () => {
            document.querySelector(".close").style.display = "none";
        }

    }).set(".presentation", { display: "block" }).from(".presentation", {
        duration: 1.5,
        opacity: 1,
        yPercent: -100,
        ease: "power4.in"
    });
});

// Select all slides and navigation buttons
const slides = document.querySelectorAll(".slide");
const nextButton = document.querySelector(".next-btn");
const prevButton = document.querySelector(".prev-btn");

let currentSlideIndex = 0;

// Function to transition slides
function changeSlide(next = true) {
    let currentSlide = slides[currentSlideIndex];
    let nextSlideIndex = next ? currentSlideIndex + 1 : currentSlideIndex - 1;

    if (nextSlideIndex >= 0 && nextSlideIndex < slides.length) {
        let nextSlide = slides[nextSlideIndex];

        let tl = gsap.timeline();

        // Animate current slide out
        tl.to(currentSlide, {
            x: next ? 100 : -100,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => currentSlide.classList.remove("active")
        });

        // Animate next slide in with bounce and scale effect
        tl.fromTo(nextSlide, 
            { x: next ? -100 : 100, opacity: 0, scale: 1.1 }, 
            { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.6)" }
        );

        nextSlide.classList.add("active");
        currentSlideIndex = nextSlideIndex;
    }
}

// Event Listeners
nextButton.addEventListener("click", () => changeSlide(true));
prevButton.addEventListener("click", () => changeSlide(false));

function get_all_elements(element) {
    let all_elements = document.querySelectorAll(element);
    let all_elements_array = Array.from(all_elements);
    return all_elements_array;
}


// slides.forEach((slide) => {
//     let children = Array.from(slide.children);

//     // Initially hide all but the first child
//     children.forEach((child, i) => {
//         if (i !== 0) {
//             child.style.display = "none";
//         }
//     });

//     // Add click event to each child
//     children.forEach((child, i) => {
//         child.addEventListener("click", function () {
//             if (i < children.length - 1) { // Ensure there's a next element
//                 let nextElement = children[i + 1];

//                 nextElement.style.display = "block"; // Make it visible before animation

//                 // Animate the appearance of the next element
//                 gsap.fromTo(nextElement, { opacity: 0 }, { opacity: 1, duration: 0.5 });
//             }
//         });
//     });
// });

