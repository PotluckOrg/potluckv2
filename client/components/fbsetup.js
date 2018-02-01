// Our database's name in firebase is 'potluck-91e71'
// After we test this to make sure it's getting our data, we can move
// the database queries into our Redux store / thunks

import React, { Component } from 'react';
// import { me } from './store';
import database from '../../fbconfig';

export default function FbSetup () {
  return (
    // this is querying the root '/' of our database, the outermost node/object ('potluck-91e71')
    database.ref('/').once('value', snap => {
      console.log("Our entire Potluck database: ")
      console.log(snap.val());
    })
  )
}

// 'snap' is like the 'result' of our axios call
// export function FbSetup () {
//   return dispatch => {
//     dispatch(getInviteRequestedAction());
//     return database.ref('/').once('value', snap => {
//       const invite = snap.val();
//       dispatch(getInviteFulfilledAction(invite))
//     })
//     .catch((error) => {
//       console.log(error);
//       dispatch(getInvideRejectedAction());
//     })
//   }
// }
