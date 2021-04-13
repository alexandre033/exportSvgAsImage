# ExportSvgAsImage

It's a React package that allow user to export any kind of svg as jpeg or png file.

## Installation

Use the package manager npm/yarn to install exportSvgAsImage.

```bash
npm install exportSvgAsImage
```

## Usage

```jasvascript
import React, { useRef } from 'react';
import ExportAsImage as exportSvgAsImage from "exportSvgAsImage"

function MyApp(){
  const svgRef = useRef();
  
  return(
  <>
   <svg viewBox="0 0 300 100" ref={svgRef}>
      <rect.../>
    </svg>
  
    <ExportAsImage 
      svgRef={svgRef}
      type='image/jpeg'
      compression={1}
      scale={1.5}
      fileName="file_name"
    />
  </>
  )
 
}

```
you need to declare a ref by using the Hook useRef() from React.

## Props
```
| Props  | Required | Usage |
| ------------- | ------------- |
| svgRef  | YES | A reference to the svg using useRef  |
| type  | NO | two types => "image/png" or "image/jpeg"  |
| scale  | NO | the scale you want, define to 1  |
| compression  | NO | jpeg compression define to 1, value from 0 to 1  |
| fileName  | YES | The exported file name  |
| svgTitle  | NO | The Title of your svg  |
| backgroundColor  | NO | For jpeg file you can define a backgroundColor, base set to null = "transparent"  |
| buttonTitle  | NO | The label of the button, base set to "Export"  |
| classes  | NO | Classe name that allow you to re-design the button  |
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


