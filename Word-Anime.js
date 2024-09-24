document.addEventListener("DOMContentLoaded", function() {
    // Wrap every letter in a span
    var textWrapper = document.querySelector('.word-anime');
    if (textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({loop: true})
          .add({
            targets: '.word-anime .letter',
            scale: [4,1],
            opacity: [0,99],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 800,
            delay: (el, i) => 70*i
          }).add({
            targets: '.word-anime',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
          });
    }
});