import { dropFromQueue, isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types"
import { getAdjacent } from "./bfs";

export const dijkstra = (grid: GridType, startTile: TileType, endTile: TileType) => {

    const traversedTiles = []; 
    const base = grid[startTile.row][startTile.col]
    base.distance = 0
    base.isTraversed = true;
    const untraversedTiles = [base]

    while(untraversedTiles.length) {
        untraversedTiles.sort((a, b) => a.distance-b.distance); 
        const currentTile = untraversedTiles.shift(); 
        if(currentTile) {
            if(currentTile.isWall)continue; 
            if(currentTile.distance === Infinity) break; 
            currentTile.isTraversed = true; 
            traversedTiles.push(currentTile); 

            if(isEqual(currentTile, endTile)) break; 
            const neighbors = getAdjacent(grid, currentTile); 

            for(let i = 0; i<neighbors.length; i++) {
                if(currentTile.distance + 1 < neighbors[i].distance) {
                    dropFromQueue(neighbors[i], untraversedTiles); 
                    neighbors[i].distance = currentTile.distance+1
                    neighbors[i].parent = currentTile
                    untraversedTiles.push(neighbors[i]); 
                }
            }

        }
    }

    const path = []
    let current = grid[endTile.row][endTile.col]
    while(current !== null) {
        current.isPath = true; 
        path.unshift(current); 
        current = current.parent!
    }

    return {traversedTiles, path}; 
}