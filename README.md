# Description
- Tinkering with puppeteer for screenshots and gpu.js for GPU-powered image processing

## Steps to Run
- `git clone https://github.com/snoseeds/headless.git`
- `cd headless`
- Rename `.env.sample` by running `mv .env.sample .env`
- `npm install`
- Download and install [Google Chrome Canary](https://www.google.com/chrome/canary/).
- Replace `executablePath` environment variable's value in `.env` with the installation path of `Google Chrome Canary` in your Operating System
- `npm run start:server`
- In another terminal, run `./run-steps.sh`

## Expected Outcomes
- Three screenshots will be created under screenshots folder, and their names are descriptive of what each screenshot is for
- Visiting `http://127.0.0.1:6600/recolor/` shows the recolored hero image by `recolor/gpu.editor.js` script