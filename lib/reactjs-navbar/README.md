# @tmnrp/reactjs-navbar

@tmnrp/reactjs-navbar is a lightweight markup rendering responsive configurable navigationbar.

# Features

- Renders responsive navigationbar.
- Dynamic menu items.
- Configurable media query breakpoint to manage the menu length.
- Functional Light/Dark mode indicator.

### Examples [link](https://tmnrp.github.io/packages/)

```sh
https://tmnrp.github.io/packages/
```

### Installation [link](https://www.npmjs.com/package/@tmnrp/reactjs-navbar)

```sh
$ npm i @tmnrp/reactjs-navbar
```

### Properties

npm i @tmnrp/reactjs-navbar is currently extended with the following properties.

| Properties          | type             | Description                                                   |
| ------------------- | ---------------- | ------------------------------------------------------------- |
| pageDetails         | Array of Objects | Provide string to key text, that needs to be displayed        |
| isLight             | boolean          | Provide false to turn on dark mode                            |
| breakpoint          | integer          | Provide min with value to activate the breakpoint             |
| height              | integer          | Provide height for navbar and the menu items                  |
| bgColor             | HEX/Color        | Provide Hex value or color shade for background color         |
| fontColor           | HEX/Color        | Provide Hex value or color shade for font color               |
| primaryColor        | HEX/Color        | Provide Hex value or color shade for primary color            |
| themeCallback       | function         | Provide callback function to receive the change of theme mode |
| onPageClickCallback | function         | Provide callback function to receive current page (menu item) |

### Implementation

```
import Navbar from "@tmnrp/reactjs-navbar";
```

```
const history = useHistory();
const pageDetails = [{text: "Home"},{text: "About"},{text: "Contact"}];
<Navbar
    pageDetails={pageDetails}
    isLight={true}
    breakpoint={742}
    height="70px"
    bgColor="#374046"
    fontColor="white"
    primaryColor="#F34236"
    themeCallback={(isLight) => {console.log("Is it light mode", isLight)}}
    onPageClickCallback={(e, page) => {
        history.push(`/packages/${page}`);
    }}
/>
```

### Todos

- More customization on UI/UX
- Add themes
- Add UTC

## License

MIT
