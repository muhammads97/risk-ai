let visited = {};
let depth = {};
let max_depth = 0;
export default function distanceToGoal(territories, attacker, defender) {
  let attAgent = attacker.agent;
  let defAgent = defender.agent;
  let attArmy = attacker.army;
  let defArmy = defender.army;
  let willAcquire = attArmy > defArmy;
  let number_of_terr_before_attack = attAgent.getTerritoryCount();
  let number_of_terr_after_attack = willAcquire
    ? number_of_terr_before_attack + 1
    : number_of_terr_before_attack;
  let armyLoss = willAcquire ? attArmy - defArmy : attArmy - 1;
  let number_of_terr_left_to_acquire =
    attArmy > defArmy
      ? defAgent.getTerritoryCount() - 1
      : defAgent.getTerritoryCount();

  //number of territories unreachable to enimy
  let number_of_unreachable = 0;
  attAgent.currentTerritories.keys().forEach((k) => {
    if (attAgent.currentTerritories[k].getAdjEnemy().length == 0) {
      number_of_unreachable++;
    }
  });
  if (willAcquire) {
    let number_of_unreachable_after_attack = 0;
    attAgent.currentTerritories.keys().forEach((k) => {
      let adjEnemy = attAgent.currentTerritories[k].getAdjEnemy();
      if (adjEnemy.length == 0) {
        number_of_unreachable_after_attack++;
      } else {
        if (adjEnemy.length == 1) {
          if (adjEnemy[0].name == defender.name) {
            number_of_unreachable_after_attack++;
          }
        }
      }
    });
    if (defender.getAdjOwned().length == 0) {
      number_of_unreachable_after_attack++;
    }
    if (number_of_unreachable_after_attack > number_of_unreachable) {
      number_of_unreachable = number_of_unreachable_after_attack;
    }
  }

  //longest path
  visited = {};
  depth = {};
  max_depth = 0;
  calculate_longest_path(defender);
}

function calculate_longest_path(defender, parent) {
  visited[defender.name] = 1;
  depth[defender.name] = parent == null ? 1 : depth[parent] + 1;
  if (depth[defender.name] > max_depth) max_depth = depth[defender.name];
  defender.getAdjOwned().forEach((t) => {
    if (visited[t.name] !== 1) {
      calculate_longest_path(t, defender);
    }
  });
}

// x
// 1 o o o
// 1 1 1
// x   5
// x   10
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
// {agent id, territories: {name:{army, adj:[name], agentid}}}
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
