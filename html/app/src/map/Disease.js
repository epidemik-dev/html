/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Disease {
    // The data structure that stores the information for a 
    // Single disease point
    
   constructor(lat, long) {
    this.lat = parseFloat(lat);
    this.long = parseFloat(long);
  }
  
  get string() {
      return this.toString();
  }
  
  toString() {
      return this.lat.toString() + " " + this.long.toString();
  }
}