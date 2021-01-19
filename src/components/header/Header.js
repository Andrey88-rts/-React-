import React from 'react';


export default function Header(props) {
  const { title, subtitle } = props;

  return (
    <header>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </header>
  )
}




// export default class Header extends Component {

//   render() {
//     const { title, subtitle } = this.props;
//     return (
//       <header>
//         <h1>{title}</h1>
//         <h2>{subtitle}</h2>
//       </header>
//     )
//   }
// }