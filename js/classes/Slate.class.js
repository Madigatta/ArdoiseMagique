// **********************************************************************************
// ********************************* Classe Slate ***********************************
// **********************************************************************************

class Slate {
  constructor(pen) {
    this.canvas = document.getElementById("slate");
    // Récupération du contexte du canvas
    this.ctx = this.canvas.getContext("2d");
    // Au début on ne sait pas où se trouve la souris -> currentLocation
    this.currentLocation = null;
    // Au début on ne dessine pas ->  isDrawing
    this.isDrawing = false;
    // Stockage de l'objet crayon ->  pen
    this.pen = pen;
    // Installation des gestionnaires d'évènements sur l'ardoise. (mouvements de la souris)
    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvas.addEventListener("mouseleave", this.onMouseLeave.bind(this));
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
  }

  // Méthode de nettoyage de l'ardoise
  clear() {
    // Effacement de tout le contenu de l'ardoise.
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Méthode de récupération des coordonnées X,Y de la souris relative à l'ardoise
  getMouseLocation(e) {
    // console.log('getMouseLocation', e)
    // Récupération des coordonnées de l'ardoise.
    const rectangle = this.canvas.getBoundingClientRect();

    // Création d'un objet contenant les coordonnées X,Y de la souris relative à l'ardoise.
    const location = {
      x: e.clientX - rectangle.left,
      y: e.clientY - rectangle.top,
    };

    // on retourne cet objet
    return location;
  }

  // Gestionnaire d'évènement d'appui sur un bouton de la souris.
  onMouseDown(e) {
    // console.log('onMouseDown',e)
    // On peut dessiner sur l'ardoise.
    this.isDrawing = true;
    // Enregistrement de la position actuelle de la souris.
    this.currentLocation = this.getMouseLocation(e);
  }

  // Gestionnaire d'évènement de sortie de l'ardoise par la souris.
  onMouseLeave() {
    // On ne peut plus dessiner sur l'ardoise.
    this.isDrawing = false;
  }

  // Gestionnaire d'évènement de déplacement de la souris sur l'ardoise.
  onMouseMove(e) {
    // Récupération de la position actuelle de la souris.
    const location = this.getMouseLocation(e);
    // Est-ce qu'on peut dessiner sur l'ardoise ?
    if (this.isDrawing) {
      // Préparation de l'ardoise à l'exécution d'un dessin. -> configure
      this.pen.configure(this.ctx);
      // Début du dessin.
      this.ctx.beginPath();
      // Dessine un trait entre les précédentes coordonnées de la souris et les nouvelles.
      this.ctx.moveTo(this.currentLocation.x, this.currentLocation.y);
      this.ctx.lineTo(location.x, location.y);
      console.log("moveTO : ", this.currentLocation.x, this.currentLocation.y);
      console.log("LINE TO : ", location.x, location.y);

      // Fin du dessin.
      this.ctx.closePath();
      // Applique les changements dans le canvas.
      this.ctx.stroke();
      // Enregistrement de la nouvelle position de la souris.
      this.currentLocation = location;
    }
  }

  // Gestionnaire d'évènement de relachement d'un bouton de la souris.
  onMouseUp() {
    // On ne peut plus dessiner sur l'ardoise.
    this.isDrawing = false;
  }
}
