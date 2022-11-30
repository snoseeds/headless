function loadImage(src, { hidden = true } = {}) {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.crossOrigin = 'Anonymous'; // To avoid tainted canvas
    image.src = src;
    image.hidden = hidden;
    image.onload = () => resolve(image);
    document.body.appendChild(image);
  });
}

// using host address to prevent CORS error such that
// index.html and the image are served from the same origin - http://127.0.0.1:6600/ 
// TODO: Load domain name from env variable: https://codingsans.com/blog/configure-frontend-projects-with-dotenv
loadImage('http://127.0.0.1:6600/screenshots/launchbrightly-hero-with-video.jpg')
  .then(img => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width;
    canvas.height = img.height;
    // canvas.style = 'max-width: 66vw; max-height: 66vh;'
    document.body.appendChild(canvas)

    const gpu = new GPU({
      canvas
    });

    const kernel = gpu.createKernel(function (image, width, height) {
      const pixel = image[this.thread.y][this.thread.x];
      let red = 0;
      let green = 0;
      let blue = 0;

      if (this.thread.x < width * 0.66 && this.thread.y < height * 0.66) {
        red = pixel[0];
      }
      if (this.thread.x < width * 0.66 && this.thread.y >= height * 0.33) {
        green = pixel[1];
      }
      if (this.thread.x >= width * 0.33) {
        blue = pixel[2];
      } 

      this.color(red, green, blue, pixel[3]);
    }, {
      graphical: true,
      output: [img.width, img.height]
    });

    kernel(img, img.width, img.height);
  })
