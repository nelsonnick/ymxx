import UserName from '../Component/UserName.js';
import React from 'react';

function Top() {
  return (
    <div>
      <UserName name="wts" />
    </div>
  );
}
export default Top;

// export default class Top extends React.Component {
//   render() {
//     return (
//       <div id="top">
//         <UserName />
//       </div>
//     );
//   }
// }
