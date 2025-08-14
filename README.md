# Simple Timeline Visualization Project

## Getting Started

1. **Install dependencies**  
   Open a terminal in the project directory and run:
   ```
   npm install
   ```

2. **Start the development server**  
   ```
   npm start
   ```

3. **View in browser**  
   The app will automatically open at [http://localhost:1234](http://localhost:1234).

## Project Structure

- `src/` — Source code for the timeline component and related files.
- `src/timelineItems.js` — Sample data rendered on the timeline.
- `src/components/Timeline/index.jsx` — Both components, timeline and timelineitem.

## Notes

- Make sure you have [Node.js](https://nodejs.org/) installed.
- The timeline will render sample items provided in

## Personal thoughts

To create this components I try to remember some of the components that I already work on, for the instructions defined, I understand that I need to do something like a GANTT Charts (I work with SCRUM and I use a lot of this charts).

### The components
The components was made with simple query data and structure, but it can be a huge number of items in the timeline, so I need to do a component that has a good performance (which is my main skill).

### The styles
Despite the lot of new styles frameworks like Tailwind, styled components, SASS etc, everything in the end is a CSS file, so why do not use it in a simple project like this? I use CSS modules because its simple CSS files.

### Hands on
I like do create components from scratch and think what I can make the component logic without any libraries help. So I do not use moment/dayjs to format date because I think it will make the build bigger than it needs.

### What I thought about the project
Working on this kind of graphical component was a very challenge for me and I'd love to write it. We always wondering what library will solve our problems when in the end, it's not that hard to make your own component.

### Filtering perfomance solved

When you have a large number of items in ReactJS, you can do the things in the default mode, because it will renders a lot of items every time, even if you use react.memo, react.useMemo, react.useCallback, those things does not solves the problem that reacts will use a lot of memory to render the parent component (which the list is in).

So if the timeline has a lot of items, the filtering will not be too much affected, but if you go to DevTools and see the memory usage, you will notice a strange use of memory.

There is a trick to do that (it's secret &#129323;), but I would need more time to add this behavior. Maybe later.

### Next steps

- Add deleting icons and confirmation
- Improve zooming to better fluid component
- Edit date on dragging cards
- Add item creation when user selects a date on timeline (context menu maybe?)
- Add animation on drag scrolling
- Filter improvement to not spend memory on large number of items
- Build a library with Rollup and publish to NPM
- Improve styles and customization
- Add more events (onSelect, onChangeDate etc)
- Adding tests with Jest to calculated: 
   - headers rendering
   - elements disposition
   - minwidth based on elements
   - zoomin/zoomout
- Add screen tests with Cypress