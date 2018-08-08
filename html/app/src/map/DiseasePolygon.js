/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class DiseasePolygon {
   // The data structure that stores the data for one
   // Overlay on the map
    
    constructor(bounds, intensity) {
        this.bounds = bounds;
        this.intensity = intensity;
    }
    
    addIntensity() {
        this.intensity += 1;
    }
}


