# Project photos

One image per project, referenced from `../data.js`. All of them were pulled
from the portfolio PDF.

| File | Used for |
|---|---|
| `headshot.jpg`          | Hero photo |
| `flight-controller.jpg` | Flight controller: 3D render of the PCB |
| `baja-car.jpg`          | Baja telemetry: the car competing in Arizona |
| `go-kart.jpg`           | Go-kart: driving the kart |
| `fuel-cell.jpg`         | Fuel cell: SolidWorks model of the stack |
| `carbon-capture.jpg`    | Carbon capture: the electrolyzer running |

To swap one out, replace the file with the same name, or change `image.src`
for that project in `data.js`.

**Tips**
- Every card shows its image in the same frame, so the edges get cropped. If
  the subject ends up off-center, set `image.position` in `data.js`
  (for example `"50% 30%"` shows more of the top).
- Resize to about 1400px on the long edge. Phone photos are 4–8 MB each; a
  1400px JPEG is around 200 KB.
