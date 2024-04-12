document.addEventListener("DOMContentLoaded", function () {
  playPauseVideo();
});

function initAnimations() {
  gsap.from(".video-wrapper", { scale: 0, duration: 0.3 });
}

function playPauseVideo() {
  let videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    // We can only control playback without insteraction if video is mute
    video.muted = true;
    // Play is a promise so we need to check we have it
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
}

function initVideos() {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.muted = true;
    video.loop = true;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
  });
}
