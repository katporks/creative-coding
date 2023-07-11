# creative-coding
I attended a Coding for Artists workshop from the Los Angeles County Museum of Art (LACMA) led by Qianqian Ye which inspired me through works of other queer/poc artists using the library p5.js. The following works began as prototypes on the p5.js sandbox. 

For device responsiveness, I added `<meta name="viewport" content="width=device-width, initial-scale=1.0">` within the html head tags and the following for css:
```
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

canvas {
  display: block;
  height: 100%;
}
```


## santan-chain 
"santan-chain" is an interactive sandbox loosely based on one of the first creative coding examples by Qianqian. I added a randomized the range of colors to reflect that of the "santan" flowers in my childhood back yard. I added an `isTouching` state to have the petals be created when the touch event starts until it is let go. The leaves or stems within the randomized shades of green that I remember is created while there are no touch events adding nodes of leaves in moments of pause.

These are screenshots of works sent to me by family and friends in the Philippines and in Vancouver:

![interactive sandbox drawing i. by juno](https://github.com/katporks/creative-coding/blob/main/readme-photos/juno-1.jpg?raw=true)
![interactive sandbox drawing ii. by juno](https://github.com/katporks/creative-coding/blob/main/readme-photos/juno-2.jpg?raw=true)
![interactive sandbox drawing by cousin/former neighbor in the philippines - roxanne](https://github.com/katporks/creative-coding/blob/main/readme-photos/roxanne-time-capsule.jpg?raw=true)
![interactive sandbox drawing by tita jo](https://github.com/katporks/creative-coding/blob/main/readme-photos/roxanne-time-capsule.jpg?raw=true)

## land-grab-for-free
"land-grab-for-free" was made possible with WEBGL. As an interactive poem with 3D rendering, this was a challenging and rewarding work. I drafted the cubes on graph paper with values for translations. The constant value is the width of each building with the length across the z-index and height as random values within a range. 

The color values were extrapolated from personal photos of our stolen family building. Each building is a random color from the extrapolated palette with varying alpha/opacity  values. 

My initial prototype had photos rendered across a transparent plane. This made layering the poem verses difficult therefore I attached the text and background photos to a div behind the canvas. For the finale of the interactive poem, I rendered family photos from the building as textures across the surface of each cube. 

A challenge was that as the number of photos increased the more laggy the interactive elements became. One touch on a mobile phone would register as multiple skipping forward the slides. I created the following asynchronous mutex lock with chained renderings which solved the issue.

```
const waitBeforeRender = (ms) => new Promise((res) => setTimeout(res, ms));

const nextSlide = async () => {
  if (!slideLock) {
    slideLock = true;
    await waitBeforeRender(100)
      .then(renderBuildings())
      .then(renderText());
    slideLock = false;
  }
};
```

I made different branches in this repo for unique renderings. The `poetry for print` branch was to be able to create an art print with part i. and part ii. of the poems. `version/display-on-monitor` was a branch where I created a feature without text to display for accessibility in the art gallery. `feat/land-grab-for-free` is for the initial version for deployment on firebase.

![version of land-grab-for-free with part i. poem](https://github.com/katporks/creative-coding/blob/main/readme-photos/IMG_7773.PNG?raw=true)
![version of land-grab-for-free with part ii. poem](https://github.com/katporks/creative-coding/blob/main/readme-photos/IMG_7702.PNG?raw=true)
![a photo with renderings of 3D cubes with randomized shades of cerulean blue](https://github.com/katporks/creative-coding/blob/main/readme-photos/IMG_7703.PNG?raw=true)
![3D buildings with photos rendered on surface](https://github.com/katporks/creative-coding/blob/main/readme-photos/IMG_7705.PNG?raw=true)

