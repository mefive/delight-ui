# delight-ui

A branch of lightweight ui component for React.

Aim to save time when facing the similar scenario.

This is an underdeveloped project, for personal use at this time. Will be released on NPM when it's ready to.

See the [usage](http://mefive.github.io/delight-ui/).

IE9+

You can run the test by following below steps

``` 
git clone git@github.com:mefive/delight-ui.git
```

``` 
cd delight-ui
```

``` 
npm install
```

``` 
npm start
```

The test can only run in Chrome, with `http://localhost:9000/` , or other browser which support Websocket.

Or you can build a static version with

``` 
npm run build
```

The static file will be generated in `./build` folder. Just run `index.html` in modern browsers.



## Components dev plan

#### Scrollable (done)

* Get rid of the default scroll bar, it can be customized.

#### Trigger (done)

* Control the visibility of popup element, by using configurable actions.

#### Draggable (75%) need to reconsider the offset of the range

* Make elememt draggable in a range.

#### Tooltip (done)

* Can be placed on top, bottom, top left ...

#### Slider (done)

#### Select (done)

* Slide up or down automatically, depend on the poistion of the element.

#### AutoComplete (done)

#### Modal (done)

#### Table

* Column can be dragged to adjust width, be clicked to sort.

#### InfiniteScroll

* Automatically render DOM in the list, by the height of the viewport.
* Fill with padding on the rest space.
* When touch bottom, new fetching action will be triggered.

#### Context Menu
#### Image
* Load source after mount, fetch the best dimension depend on the width of the image container.
