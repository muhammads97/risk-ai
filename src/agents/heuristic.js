let visited = {};
let max_depth = 0;

export function g(state, prevState) {
  let army = 0;
  let prevArmy = 0;

  Object.keys(state.territories).forEach((k) => {
    if ((state.territories[k].agent = state.agent)) {
      army += state.territories[k].army;
    }
  });
  Object.keys(prevState.territories).forEach((k) => {
    if ((prevState.territories[k].agent = prevState.agent)) {
      prevArmy += prevState.territories[k].army;
    }
  });
  return prevArmy - army;
}

export function h(state) {
  let terr_owned = 0;
  let terr_left = 0;
  let armyOwned = 0;
  let enimy_army = 0;
  let protectedTerr = 0;
  let longestAttackAvailable = 0;
  let unreachableEnimy = 0;
  let id = state.agent;
  let potential_attacks = {};
  Object.keys(state.territories).forEach((k) => {
    if (state.territories[k].agent == id) {
      terr_owned++;
      armyOwned += state.territories[k].army;
      let p = true;
      state.territories[k].adj.forEach((a) => {
        if (state.territories[a].agent != id) {
          p = false;
          if (state.territories[k].army > 1) potential_attacks[a] = 1;
        }
      });
      if (p) protectedTerr++;
    } else {
      terr_left++;
      enimy_army += state.territories[k].army;
      let p = true;
      state.territories[k].adj.forEach((a) => {
        if (state.territories[a].agent == id) {
          p = false;
        }
      });
      if (p) unreachableEnimy++;
    }
  });
  Object.keys(potential_attacks).forEach((k) => {
    visited = {};
    dfs(state, k, 0);
  });
  if (terr_owned + armyOwned + protectedTerr + longestAttackAvailable == 0) {
    return 10000000000;
  }
  if (terr_left + enimy_army + unreachableEnimy == 0) {
    return 0;
  }
  longestAttackAvailable = max_depth;
  let total_terr = terr_left + terr_owned;
  let total_army = enimy_army + armyOwned;
  longestAttackAvailable /= terr_left;
  protectedTerr /= terr_owned;
  unreachableEnimy /= terr_left;
  terr_owned /= total_terr;
  terr_left /= total_terr;
  armyOwned /= total_army;
  enimy_army /= total_army;

  //weights
  terr_owned *= 100;
  terr_left *= 100;
  enimy_army *= 1;
  armyOwned *= 1;
  protectedTerr *= 10;
  unreachableEnimy *= 10;
  longestAttackAvailable *= 5;

  return (
    (terr_left + enimy_army + unreachableEnimy) /
    (terr_owned + armyOwned + protectedTerr + longestAttackAvailable)
  );
}

function dfs(state, enimy, d) {
  visited[enimy] = 1;
  if (d + 1 > max_depth) max_depth = d + 1;
  state.territories[enimy].adj.forEach((a) => {
    if (state.territories[a].agent !== state.agent && visited[a] != 1) {
      dfs(state, a, d + 1);
    }
  });
}

// x
// o o o o
// x x x
// x   x
// x   x
//     x

// number of territories after attack 8 --
// number of territories left to acquire 2 ++
// army lost in the attack ++
// number of protected territories after attack --
// longest enimy path --
// number of unreachable enimy territories ++

//  tleft * high weight       armyloss + protectedEnimy
// ---------------------  +  -----------------------------
//       tattack                protected + longestPath

// tleft / total terr
// tattack  / total terr
// armyloss / attacker total army
// protected enimy / total enimy
// my protected / my total
// longest path/ total enimy

// function to create gamestate as an object :
// {agent id, territories: {name:{army, adj:[name], agent}}}
// function to deep clone object

// for each terr that can attack: 2
//    for each terr that can be attacked: 5 (10)
//

// g:
// cumulative army loss
//

// free army = 9
// assign 9 into one terr
// level:
//
