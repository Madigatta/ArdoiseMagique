// **********************************************************************************
// ********************************* Classe Pen ****************************
// **********************************************************************************

class Pen {
  constructor() {
    // définir des valeurs par défaut pour la color et la size
    this.color = "black";
    this.size = 1;
  }

  // SETTER

  configure(slateCanvasContext) {
    // Méthode de préparation de l'ardoise à l'exécution d'un dessin avec le crayon
    // Mise à jour des propriétés de dessin de l'ardoise. (color et size)
    slateCanvasContext.strokeStyle = this.color;
    slateCanvasContext.lineWidth = this.size;
  }

  // Méthode de configuration de la couleur du crayon (valeur HTML hexadécimale ou nom de couleur CSS prédéfini)
  setColor(color) {
    this.color = color;
  }

  // Méthode de configuration de la couleur du crayon avec les trois composantes RGB
  setColorAsRgb(red, green, blue) {
    // Stockage de la couleur au format RGB (comme la fonction CSS)
    this.color = `rgb(${red},${green},${blue})`;
  }

  // Méthode de configuration de l'épaisseur du crayon.
  setSize(size) {
    this.size = size;
  }
}
