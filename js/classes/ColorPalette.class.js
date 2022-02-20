// **********************************************************************************
// ********************************* Classe ColorPalette ****************************
// **********************************************************************************

class ColorPalette {
  constructor() {
    // Récupération du <canvas>
    this.canvas = document.getElementById("color-palette");
    // Récupération du contexte du canvas
    this.ctx = this.canvas.getContext("2d");
    // création de notre objet pour les couleurs : pickedColor
    this.pickedColor = {
      red: 0,
      green: 0,
      blue: 0,
    };
    // Installation des gestionnaires d'évènements de la palette de couleurs.
    this.canvas.addEventListener("click", this.onClick.bind(this));

    // instanciation du custom event pour le natif
    // this.myEvent = new Event("magical-slate:pick-color");

    // Appeler la méthode pour "construire" la palette de couleurs.
    this.build();
  }

  // Méthode de construction graphique de la palette de couleurs
  // DOC -> https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
  build() {
    // 1 - déclarer une variable gradient et l'initialiser avec la bonne méthode pour créer un contexte de dégradé
    let gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);

    // 2 - utiliser la bonne méthode permettant de créer le Dégradé rouge -> vert -> bleu horizontal. (RGB)
    gradient.addColorStop(0, "rgb(255,   0,   0)");
    gradient.addColorStop(0.15, "rgb(255,   0, 255)");
    gradient.addColorStop(0.32, "rgb(0,     0, 255)");
    gradient.addColorStop(0.49, "rgb(0,   255, 255)");
    gradient.addColorStop(0.66, "rgb(0,   255,   0)");
    gradient.addColorStop(0.83, "rgb(255, 255,   0)");
    gradient.addColorStop(1, "rgb(255,   0,   0)");

    // 3 - initialiser attribut fillStyle
    this.ctx.fillStyle = gradient;

    // 4 - remplir le canvas
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Dégradé blanc opaque -> transparent -> noir opaque vertical.
    // on reprend notre intruction de l'étape 1 mais on lui spécifie la heigth plutot que la width cette fois
    gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    // répéter les étapes 2 - 3 - 4 en adaptant les couleurs (RGBA)
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
    gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
    gradient.addColorStop(1, "rgba(0,     0,   0, 1)");

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Méthode de récupération de la couleur sur laquelle l'utilisateur a cliqué
  getPickedColor() {
    return this.pickedColor;
  }

  // Gestionnaire d'évènement de clic sur un pixel de couleur de la palette
  onClick(e) {
    // Récupération des coordonnées de la souris au moment du clic.
    const rectangle = this.canvas.getBoundingClientRect();

    const x = e.clientX - rectangle.left;
    const y = e.clientY - rectangle.top;
    /*
     * Création d'un tableau contenant les valeurs RGBA du pixel sur
     * lequel l'utilisateur a cliqué.
     */
    //!fonctionnalité du canvas !
    const palette = this.ctx.getImageData(x, y, 1, 1);
    console.log(palette);
    // Enregistrement des valeurs RGB.
    this.pickedColor.red = palette.data[0];
    this.pickedColor.green = palette.data[1];
    this.pickedColor.blue = palette.data[2];

    /*
     * Déclenchement de l'évènement de l'application,
     * annonçant que l'utilisateur a sélectionné une nouvelle couleur.
     */
    //jQuery
    $.event.trigger("magical-slate:pick-color");

    // natif
    // document.dispatchEvent(this.myEvent);
  }
}
