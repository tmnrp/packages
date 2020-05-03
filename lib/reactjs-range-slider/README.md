# @tmnrp/reactjs-range-slider

@tmnrp/reactjs-range-slider is a lightweight markup to display input range and legend to display its current value.

# Features

  - Render input range slider with configurable legend, initial, min, max, step value
  - Display legend has configurable position.
  - UTC provides 100% coverage on functional as well dom level using Jest and React testing library.
  
  
### Examples  [link](https://tmnrp.github.io/reactjs-range-slider-live/)
```sh
https://tmnrp.github.io/reactjs-range-slider-live/
```

### Installation [link](https://www.npmjs.com/package/@tmnrp/reactjs-range-slider)


```sh
$ npm i @tmnrp/reactjs-range-slider
```

### Properties

@tmnrp/reactjs-range-slider is currently extended with the following properties.

| Properties | type | Description |
| ------ | ------ | ------ |
| value | integer | Initial value for the slider to render from. |
| min | integer | Minimum value limit for slider |
| max | integer | Maximum value limit for slider. Min value overrides if max is less than min. |
| step | integer | Increments/Decrements every drag by the step count provided. |
| sliderThumbShape | string | ```square, circle``` available for thumb shape. |
| legend | boolean | Provide ```true``` to display the legend |
| legendLabel | string | Legend prefix for current value. |
| legendPosition | string | ```top, right, bottom, left``` to set the position |
| legendAlignment | string | ```start, end``` to set the alignment of legend label |


### Implementation

```
import RangeSlider from "@tmnrp/reactjs-range-slider";
```

```
<RangeSlider
   value={50}
   min={0}
   max={100}
   step={1}
   sliderThumbShape="square"
   legend={true}
   legendLabel="Range: "
   legendPosition="top"
   legendAlignment="end"
/>
```

### Todos

 - More customization on UI/UX
 - Add themes

License
----

MIT
