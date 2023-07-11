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

Here is a link to the completed works:
https://atop-remembering.web.app

## santan-chain 
In "santan-chain," an interactive sandbox project loosely based on one of Qianqian's creative coding examples, I added randomized colors and opacities to mimic the "santan" flowers from my childhood backyard. Petals are created when a touch event starts and continue until it is released. The stems are randomized shades of green, connecting every petal to a constant vertice in the center. Leaves are dynamically created during moments of stillness.

These screenshots showcase works shared by family and friends in the Philippines and Vancouver:

![interactive sandbox drawing i. by juno](https://github.com/katporks/creative-coding/blob/main/readme-photos/juno-1.jpg?raw=true)
![interactive sandbox drawing ii. by juno](https://github.com/katporks/creative-coding/blob/main/readme-photos/juno-2.jpg?raw=true)
![interactive sandbox drawing by cousin/former neighbor in the philippines - roxanne](https://github.com/katporks/creative-coding/blob/main/readme-photos/roxanne-time-capsule.jpg?raw=true)
![interactive sandbox drawing by tita jo](https://github.com/katporks/creative-coding/blob/main/readme-photos/roxanne-time-capsule.jpg?raw=true)

## land-grab-for-free
"land-grab-for-free" was developed using WEBGL, providing an interactive 3D rendering experience for an expressive poem. I designed the building cubes on graph paper, assigning translation values. Each building has a constant width, varying length across the z-index, and random height within a range.

Color values were extracted from personal photos of a family building that was lost. Each building is assigned a random color from the extracted palette, with varying alpha/opacity values.

Initially, I attempted to render photos on a transparent plane, but this made layering the poem verses challenging. To address this, I attached the text and background photos to a div positioned behind the canvas. For the grand finale of the interactive poem, I used family photos as textures applied to the surface of each cube.

As the number of photos increased, the interactive elements became slower. To mitigate this, I implemented an asynchronous mutex lock with chained renderings, effectively resolving the issue:

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

To explore different renderings, I created separate branches within the repository. The poetry for print branch was dedicated to creating an art print with part i. and part ii. of the poems. The version/display-on-monitor branch featured a version without text for accessibility in art galleries. The feat/land-grab-for-free branch contains the initial deployment version on Firebase.

![version of land-grab-for-free with part i. poem](https://github.com/katporks/creative-coding/blob/main/readme-photos/IMG_7773.PNG?raw=true)
![version of land-grab-for-free with part ii. poem](https://github.com/katporks/creative-coding/blob/main/readme-photos/IMG_7702.PNG?raw=true)
![a photo with renderings of 3D cubes with randomized shades of cerulean blue](https://github.com/katporks/creative-coding/blob/main/readme-photos/IMG_7703.PNG?raw=true)
![3D buildings with photos rendered on surface](https://github.com/katporks/creative-coding/blob/main/readme-photos/IMG_7705.PNG?raw=true)
![a couple gazing on land-grab-for-free monitor display in Arrietta Art Gallery, New Westminster](https://github.com/katporks/creative-coding/blob/main/readme-photos/IMG_7722.jpeg?raw=true)

