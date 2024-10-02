import React from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);
  return <div onClick={setCounter(counter + 1)}>App{counter}</div>;
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
