import sharp from 'sharp';

const inputPath = "C:\\Users\\gus16\\.gemini\\antigravity\\brain\\45a916e5-2cf8-4cba-a1b1-4fefd1602990\\media__1778705052727.jpg";
const outputPath = "C:\\Users\\gus16\\Desktop\\Antigravity\\Proyectos\\web01\\public\\images\\logo.png";

async function processImage() {
  try {
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const bgR = data[0];
    const bgG = data[1];
    const bgB = data[2];

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Make background transparent
      if (Math.abs(r - bgR) < 40 && Math.abs(g - bgG) < 40 && Math.abs(b - bgB) < 40) {
        data[i + 3] = 0; 
      } 
      // Change dark green to web's green (#38b000 -> rgb(56, 176, 0))
      else if (r < 60 && g < 100 && b < 80 && g > r && g > b) {
        data[i] = 56;
        data[i + 1] = 176;
        data[i + 2] = 0;
      }
      // Change the blue lake to the web's orange (#d35400 -> rgb(211, 84, 0)) or keep it?
      // User said "CAMBIALE LOS COLORES POR LOS QUE SE UTILIZA EN LA WEB EL NARANJA Y EL VERDE"
      // Maybe the blue lake becomes orange? Let's try it. Blue is roughly r<100, g<150, b>100
      else if (b > 100 && b > r && b > g) {
        data[i] = 211;
        data[i + 1] = 84;
        data[i + 2] = 0;
      }
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile(outputPath);

    console.log("Image processed successfully!");
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

processImage();
