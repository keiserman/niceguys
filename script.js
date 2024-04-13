document.addEventListener("DOMContentLoaded", function () {
  initVideos();
  initAnimations();
});

function initAnimations() {
  gsap.from(".video-wrapper", { scale: 0, duration: 0.3 });
}

function initVideos() {
  const videoWrappers = document.querySelectorAll(".video-wrapper");

  if (window.innerWidth < 768) {
    videoWrappers.forEach((videoWrapper) => {
      const video = videoWrapper.querySelector("video");
      if (!video) return;
      video.muted = true;

      // Set up autoplay
      let playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {
          let observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.intersectionRatio !== 1 && !video.paused) {
                  video.pause();
                } else if (video.paused) {
                  video.play();
                }
              });
            },
            { threshold: 0.2 }
          );
          observer.observe(video);
        });
      }
    });
  } else {
    videoWrappers.forEach((videoWrapper) => {
      const video = videoWrapper.querySelector("video");
      if (!video) return;
      video.muted = true;

      // Set up hover play/pause
      video.addEventListener("mouseenter", () => {
        video.play();
      });
      video.addEventListener("mouseout", () => {
        video.pause();
      });
    });
  }
}
