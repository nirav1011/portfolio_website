# Project photos

Drop your image files in this folder, then reference them from `../data.js`.

The filenames already referenced in `data.js` are:

| File | Project | What it should show |
|---|---|---|
| `fc-board.jpg`      | Flight controller | The assembled board, top-down, good light |
| `fc-layout.jpg`     | Flight controller | Altium layout screenshot, routed |
| `fc-schematic.jpg`  | Flight controller | Power tree section of the schematic |
| `fc-quad.jpg`       | Flight controller | The quad with your board installed |
| `baja-car.jpg`      | Baja SAE | The car during testing |
| `baja-daq.jpg`      | Baja SAE | DAQ enclosure and wiring |
| `baja-dash.jpg`     | Baja SAE | Driver dashboard PCB |
| `fuelcell-pcb.jpg`  | Fuel cell | The safety PCB |
| `fuelcell-stack.jpg`| Fuel cell | Assembled PEM stack |
| `kart-build.jpg`    | Go-kart | Finished kart |
| `kart-cad.jpg`      | Go-kart | SolidWorks assembly |
| `kart-cohort.jpg`   | Go-kart | Student cohort build day |

Use those exact names and everything appears automatically. To use different
names, or to add/remove photos, edit the `images` array for that project in
`data.js`.

**Tips**
- Landscape 4:3 or 3:2 crops look best in the grid.
- Resize to about 1600px on the long edge before committing. Phone photos are
  4–8 MB each; 1600px JPEGs are ~300 KB and load far faster.
- `.jpg` for photos, `.png` for screenshots of schematics and layouts.
- Any image listed in `data.js` but missing here renders as a labelled
  placeholder frame, so the site never looks broken mid-collection.
