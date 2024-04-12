document.addEventListener("DOMContentLoaded", function () {
  initVideos();
  initAnimations();
});

function initAnimations() {
  gsap.from(".video-wrapper", { scale: 0, stagger: 0.3, duration: 0.3 });
}

function initVideos() {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.muted = true;
    video.loop = true;
    video.addEventListener("mouseenter", () => {
      video.play();
    });
    video.addEventListener("mouseout", () => {
      video.pause();
    });
  });
}
