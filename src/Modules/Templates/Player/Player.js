import Gameboard from "../Gameboard/Gameboard";
import _ from "lodash";

class Player {
  constructor(type){
    this.gameboard = new Gameboard();
    this.attackHits = [];
    this.attackMisses = [];
    if (type === "computer"){
      this.attack = this.computerAttack;
    } else if (type === 'human') {
      this.attack = this.humanAttack;
    }
  }

  humanAttack(){
    return 
  }

  computerAttack(){
    let attack = Player.randomAttackGenerator()  
    while (_.some(this.attackHits.concat(this.attackMisses), v => _.isEqual(attack, v))){
      attack = Player.randomAttackGenerator();
    }
    return attack
  }

  static randomAttackGenerator(){
    return {"x":_.random(1,10,false),"y":_.random(1,10,false)}
  }
}

export default Player;