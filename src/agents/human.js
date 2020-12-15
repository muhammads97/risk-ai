export default class HumanAgent {
  attack(gameState) {
    gameState.selectTerritory("attack", (selectedTerritory) => {
      //attacking = selected
      gameState.selectTerritory("victim", (selectedTerritory) => {
        // victim = selected
      });
    });
  }
}
