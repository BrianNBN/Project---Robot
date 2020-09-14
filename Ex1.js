 
 // 11places and 14roads
 const roads = [
   "Alice's House-Bob's House",  "Alice's House-Cabin",
   "Alice's House-Post Office",  "Bob's House-Town Hall",
   "Daria's House-Ernie's House", "Daria's House-Town Hall",
   "Ernie's House-Grete's House", "Grete's House-Farm",
   "Grete's House-Shop",          "Marketplace-Farm",
   "Marketplace-Post Office",     "Marketplace-Shop",
   "Marketplace-Town Hall",       "Shop-Town Hall" 
 ];

 /*Let’s convert the list of roads to a data structure that, for each place,
  tells us what can be reached from there.*/
 
 /* Given an array of edges, buildGraph creates a map object that, for each node,
stores an array of connected nodes.
It uses the split method to go from the road strings, which have the form
"Start-End" , to two-element arrays containing the start and end as separate strings.*/

 function buildGraph (edges) {
     let graph = Object.create(null);
     function addEdge (from, to) {
         if (graph[from] == null){
             graph[from] = [to];
         } else {
             graph[from].push(to);
         }
     }
     for (let [from,to] of edges.map(r => r.split("-"))){
         addEdge (from, to);
         addEdge (to, from);
     }
     return graph;
 }

 const roadGraph = buildGraph (roads);
//compute a new state for the situation after the move.
 class villageState {
     constructor (place, parcels) {
         this.place = place;
         this.parcels = parcels;
     }
     move (destination) {
         if (!roadGraph[this.place].includes(destination)){
             return this;
         } else {
             let parcels = this.parcels.map(p => {
                 if(p.place != this.place)
                 return p;
                 return {place: destination, address: p.address};
             }).filter (p => p.place != p.address);
             return new villageState (destination, parcels);
         }
     }
 }

 let first = new villageState (
     "post office",
     [{place:"post office", address: "Alice's House"}]
     );
     let next = first.move("Alice's House");


// Simulation

function runRobot (state, robot, memory) {
    for (let turn = 0;; turn++){
        if(state.parcels.length == 0){
            console.log(`Done in ${turn} turn`);
            break;
        }
        let action = robot (state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}