import React, { Suspense } from 'react';

const Home = React.lazy(() => import('./routes/home/index.jsx'));
const About = React.lazy(() => import('./routes/about/index.jsx'));
// Last , install react-router-dom
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;

// Class component
// export default class extends React.Component {
//   constructor(props) {
//     super(props); // calling super so React.component has access to it
//     this.state = {
//       count: 0,
//     };
//   }

//   increment() {
//     this.setState({
//       count: this.state.count + 1,
//     });
//   }
//   render() {
//     return (
//       <div>
//         {this.state.count}
//         <button onClick={this.increment.bind(this)}>Click</button>
//         <button
//           onClick={() => {
//             this.setState({
//               count: this.state.count + 1,
//             });
//           }}
//         >
//           Click123
//         </button>
//       </div>
//     );
//   }
// }
