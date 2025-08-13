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
   The app will automatically open at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/` — Source code for the timeline component and related files.
- `src/timelineItems.js` — Sample data rendered on the timeline.
- `src/components/Timeline/index.jsx` — Both components, timeline and timelineitem.

## Notes

- Make sure you have [Node.js](https://nodejs.org/) installed.
- The timeline will render sample items provided in

## Personal process

To create this components I try to remember some of the components that I already work on, for the instructions defined, I understand that I need to do something like a GANTT Charts (I work with SCRUM and I use a lot of this charts).

### The components
The components was made with simple query data and structure, but it can be a huge number of items in the timeline, so I need to do a component that has a good performance (which is my main skill).

### The styles
Despite the lot of new styles frameworks like Tailwind, styled components, SASS etc, everything in the end is a CSS file, so why do not use it in a simple project like this? I use CSS module because its simple CSS files.