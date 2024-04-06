# My_Profile Built with Three JS

I created a profile website for myself using Three JS.  The theme of the website is space and exploration and I tried my best to make it interactive.  Bascially when you enter the website, there is a little cute robot "non-coincidentally" named "Kawabot" that follows your cursor.  When you scroll through the content, you will see random object floating in space from small stuff like old school computers to an entire space station and even Jupiter! How cool is that!

Although the animation and environment is not as dynamic as I would like it, it was a great challenge for me.  In this file, I outlined the **objective** of this project and documented my **learning journey** and **concepts**.  Please take a look and I would really appreciate it if you can leave any feedback.

## Objective

Build a profile website with 3D objects that have customized animation when the user scroll through the content.  Objects are placed in a 3D environment (x, y, z) axes and their orientations are adjusted as the user scroll through the website.

## Journal

### Foreword

I justed learned a bit of JavaScript, wrote some basic website with customized styling with BootStrap, and thoght it was time to build something cool that I can show off to some of my friends.  I thought what I wanted to build would be those cool 3D portfolios that almost look like video games some amazing front-end developers had.  

I didn't realize I was realize I was over-ambitious until I realize how many components this would involve.  From all the theories of 3D object rendering and animations to just installing the packages and framework, there was so much new information that I definately realized I should have waited a bit longer til I am more fluent in JS.  But nevertheless, I pushed on.  

### Step 1: Initialization

I used Three.js for building objects, setting camera, and rendering the environment.  I decided to use plain vanilla JS because I had no idea what React, Angular, and all those stuff were.  

I used Vite to initialize project and handle dependencies.

```
npm init vite
```

I got `package.json` from it which I learned it used to install dependencies. Here is where I installed 3JS and ran my project.

```
npm install three
npm run dev
```

Then I created relevant folders to better organize my directory. In `index.html` I created a `<canvas>` element within the body element.  I learned that essentially all the fancy 3JS stuff are basically in the background which will be overlaid content in other html elements.

I rememeber to import my style sheet into `main.js`.

### Theories: scene, camera, renderer, and objects

There are 3 key JS objects in graphic designs: 1. scene, 2. camera, 3. renderer.

It was really confusing for me to understand but the best analogy I thought of is:
- Scene is like a little box here you store stuff (objects)
- Camera is a little peep hole that looks into our mysterious box.  You need to specify the perspectives and where the camera starts off seeing.
- Renderer is like an artist that takes what he sees in the scene and camera and sketches their perspective onto a canvas for us to see.  We have to tell the artist the size and definition we want to see the sketch.  We also specify the page (aka DOM) wwe want them to sketch in.

3D objects in 3JS are basically a shape (geometry) that has some material (texture) glued (mesh) onto it.  Whenever an object is created, we add it to the scene and set its position on the x, y, and z axis.  X is left and right, Y is up and down, and Z is forward and backward.

Objects also needs light to illuminate them.  For simplicity, I just created an ambient light to light up the entire environment.  Again you have to add it to the scene.  Every thing you create have to be added to the scene.

### Animations, using functions to generate objects

The first object I created is Jupiter.  I found adjusting its size and position really difficult because I have no idea what Z-axis value I should set it as.  I also thought having it positioned in space and not moving is very unrealistic so I wanted to make it spin.

From the Fireship I learned that animation in Three.js is basically changes applied to properties of the object overtime. Translating that into website terms, this basically means **changing properties of the object and rendering** it as webpage updates in frames.

For a function to animate objects, we need it to call upon itself whenever webpage updates.  Within this function,  I implemented the changes I want, which included making objects rotate, hover, etc., and then rendering the scene and the camera using renderer.

I also learned to generate objects at random positions in the background using a custom function.  the `addStar()` function does this by first creating the star object a small white circle. Then specified the coordinates using a random number generator.  These numbers will then used to `star.position.set(x,y,z)` and adding it to the scene.

To generate lots of stars in random places in the background, I learned to create an array with the number of stars I want and call addStar() for each value.

Honestly, I felt quite confident after executing the `addStar()` function because it felt like using knowledge from coding practices (i.e. generate an array with x number of random numbers) and applying it into something I can actually see.

### Helper objects

It was really useful later to use `OrbitControls`, `GridHelper()` to navigate through the 3D space and place objects.  But further I addressed the challenge of not knowing where to place things by logging the x, y, and z position onto the console so I know roughly which area of my canvas am I looking at. 

### HTML Text and CSS

At this point I was haviing so much fun creating random funky objects that I forgot I am suppose to create my portfolio.  I copied the CSS style from the tutorial and filled in the content into the HTML blocks.  Then I wanted to be a bit creative and decided to add Bootstrap styling create content cards, paginations, blah blah blah.

Turns out it didn't work the way I wanted since the styling conflicted.  I spent so much time (almost half a day) figuring out how the grid system worked in the original CSS style sheet and completed got rid of the Bootstrap class system I previously implemented.  I really did not enjoy this and I think my code for this part is still so messy with bits of Bootstrap but also my own styling and grid system.  I don't want to go too much into it because both me and ChatGPT were using 200% of our brainpower (and memory respectively).

Even looking back, I barely understood what is going on but it does look somewhat pretty like the way I wanted so I don't complain.

### Scrolling function

What as really cool abut that tutorial was that the website they had had objects moving as they were scrolling.  It really gives you the effect of like going through a wormhole in space.  I really wanted the space effect and surprisingly, this didn't take too long for me to understand.

To move the camera position, I learned that we have to update its x and z position (to get the zooming back effect) based on the scroll position on the browser.  We can capture this with `document.body.getBoundingClientRect().top;` which fetches the ditance to the top of the webpage.

For Jupiter, I changed its rotation along the three axis but incrementing small decimals to t.  It really was a lot straight forward than I thought.

### Hands-off from now on: adding custom objects

At this point, I thought since I understood basic concepts, the opportunities were endless.  I wanted to add custom 3D models I found online which are stored as **gtlf files**.  I always get nervous implementing new stuff becaues whenever they don't work I don't know where look to find the problem.

I learned the process of adding custom models as:
1. Instantiate a `GTFLLoader()` and an empty JS object to later store our 3D model
2. Call the loader, and pass in the gltf file path, function that takes gltf as input as well as 2 ther functions to log loading progress and error to the console if detected any.
3. In the gltf function, modify the empty JS object as `gltf.scene`, add it into the scene, set the size, position, and other properties (**I learned to add the position into the function instead of outside of it because often times the loader take much longer to execute then the lines below it, so when I called the object to change its position, I get an error because the object has not been loaded yet**)

One problem I encountered was that I can't customize animation for my 3D models within animation without causing an error.  I added an `if(object)` statement in front of update I want to do just so that we would only execute the line of code when the object is loaded.

I honestly was so satisfied when I figured this out because then I started looking for open-source 3D models and I imported everything from retro computers, to space stations and space ships.

### 'Idle' Animation for Spaceship

### Kawabot

I found this really cute Kawaii Cat robot that I "uncoincidentally" named Kawabot.  I thought to myself wouldn't it be super cool if I make it follow where my mouse is and it will be like a companion in space.  

I knew I can track mouse movement with `.addEventLisener()`.  If I do detect a movement, I would get the cursor position which would then be used to update te position of Kawabot.  I thought I should also add some multipliers to delay the movement of Kawabot so it does't just teleport to my mouse.

After a google searches and asking chat-gpt for error checks, I finally developed a quick module that would achieve this.  But then a big problem just came into my head.

My environment is in 3D and the camera itself is constantly updating as we scroll.  How would I change the different axes, especially the Z-axis to make sure it still follows us.  I tried different ways but all I got was Kawabot being swallowed up by the dark and loneliness of space...

Then a day later, an idea came in my head.  What if I have 2 canvases.  One is the original background, and the other is just a transparent background with Kawabot rendered in where it moves freely in only the X and Y axes without having to worry about being swallowed up.  Turns out you can do that, but you just need to specify in your CSS stylesheet which one can overlay over the other.

So I created a seperate JS file for Kawabot movement `robo.js`, created another canvas container in `index.html` and set its Z-Index to be higher than the background canvas.  And then at last... finally... Kawabot is safe and free from the darkness of the universe!

Thank you for following along! If you find this interesting, join me on my journey to become a great front-end developer.

## Resources:

Tutorial: https://www.youtube.com/watch?v=Q7AOvWpIVHU&t=100s

Three.js doc: https://threejs.org/

#### Models

Kawabot: https://sketchfab.com/3d-models/kawaii-cute-flying-robot-e8e85bce90644fa486ac21e033c71d92

Space station: https://sketchfab.com/3d-models/space-station-91ac3e82d49c455cbb6e2d219e1e017a

Space ship: https://sketchfab.com/3d-models/spaceship-cb1-4a8fddf9fadf4d2998925ca4b6d4b93b

Saturn: https://sketchfab.com/3d-models/saturn-planet-9ab1eb3bb97f4e4a9305c0aae2d280a6

Computer: https://sketchfab.com/3d-models/retro-computer-f844c0357d284fd8baa1435e9ff31bb2

Planet Textures: https://www.solarsystemscope.com/textures/



