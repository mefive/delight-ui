# delight-ui

A branch of lightweight ui component for React.

Aim to save time when facing the similar scenario.

See the [usage](http://mefive.github.io/delight-ui/).

IE9+



Components dev plan

1. Scrollable (done)
   * Get rid of the default scroll bar, it can be customized.
2. Trigger (done)
   * Control the visibility of popup element, by using configurable actions.
3. Draggable (75%) need to reconsider the offset of the range
   * Make elememt draggable in a range.
4. Tooltip (90%) need to add holding on logic
   * Can be placed on top, bottom, top left ...
5. Slider (done)
6. Select (done)
   * Slide up or down automatically, depend on the poistion of the element.
7. AutoComplete (done)
8. Modal (done)
9. Table
   * Column can be dragged to adjust width, be clicked to sort.
10. InfiniteScroll
    * Automatically render DOM in the list, by the height of the viewport.
    * Fill with padding on the rest space.
    * When touch bottom, new fetching action will be triggered.