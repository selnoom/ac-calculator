class Part {
    constructor(id, type, slot, weight, enLoad, imageUrl, features) {
      this.id = id; // Name of the part
      this.type = type // Type of part
      this.slot = slot; // Where the part is slotted
      this.weight = weight; // Weight of the part
      this.enLoad = enLoad; // Energy consumption of the part
      this.imageUrl = imageUrl; // URL to the image representing the part
      this.features = features; // An object containing additional, unique features of the part
    }
  }
  
  export default Part;