export default class Territory {
    constructor(name){
        this.name = name;
        this.player = null;
        this.army = 0;
        this.adj = [];
    }

    setPlayer(player){
        this.player = player;
    }
    getPlayer(){
        return this.player;
    }

    addArmy(army){
        this.army += army;
    }
    removeArmy(army){
        this.army -= army;
        if(this.army <= 0) return true; // player lost this territory
        return false; //player still owns this territory
    }
    getArmy(){
        return this.army;
    }

    addAdjTerritory(territory){
        this.adj.push(territory);
        if(!territory.isAdj(this.name)){
            territory.addAdjTerritory(this);
        }
    }
    removeAdjTerritory(name){
        let index = -1;
        this.adj.forEach((t, i) => {
            if(t.name == name){
                index = i;
                return;
            }
        });
        this.adj.splice(index, 1);
    }
    getAdj(){
        return this.adj; 
    }
    
    getName(){
        return this.name;
    }

    isAdj(name){
        return this.adj.find((t)=>t.name == name) != null;
    }

    getAdjTerritory(name){
        return this.adj.find((t)=>t.name == name);
    }

    manoeuvreToAdjTerritory(army, name){
        if(army >= this.army) return false;
        if(!this.isAdj(name)) return false;
        let t = this.getAdjTerritory(name);
        if(t.player != this.player) return false;
        t.addArmy(army);
        this.removeArmy(army);

    }

    findPathToTerritory(name){
        //there is a path between 2 territories if all the territories in the path are owned by the same player
    }

    manoeuvreToRemoteTerritory(name){
        //find path, move army to the territory
    }
    
}