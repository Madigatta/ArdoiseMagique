// **********************************************************************************
// ********************************* Classe Program *********************************
// **********************************************************************************

// Dans notre constructor, nous aurons besoin de 3 attributs instanciés
// - de notre class ColorPalette
// - appel de la méthode Pen
// - appel de la méthode Slate en lui transmettant un argument bien spécifique

// Méthode :

// - onClickColorPicker
// ->  Gestionnaire d'évènement de clic sur l'outil de pipette.

// - onClickPenColor
// ->  Gestionnaire d'évènement de clic pour sélectionner une couleur de crayon prédéfinie.
// -> Récupérer la <div> qui a déclenché l'évènement.
// -> Récupérer l'attribut HTML5 data-color.
// -> Modifier la couleur du crayon.

// - onClickPenSize
// -> // Gestionnaire d'évènement de clic pour changer la taille du crayon.
// -> Récupérer le <button> qui a déclenché l'évènement.
// -> Récupérer l'attribut HTML5 data-size.
// -> Modifier l'épaisseur du crayon.

// - onPickColor
// -> Gestionnaire d'évènement de changement de la couleur du crayon.
// -> Récupérer de la couleur sur laquelle l'utilisateur a cliqué.
// -> Récupérer la couleur du crayon
// -> Changer la couleur du crayon.

// - start
// -> Méthode appelée au démarrage de l'application.
// -> Installer des gestionnaires d'évènements des outils.
// -> Installer des gestionnaires d'évènements de configuration du crayon.
// -> Créer un évènement spécifique à l'application (lié à notre palette de dégradé).

class Program {
  constructor() {
    // de notre class ColorPalette
    this.colorPalette = new ColorPalette();
    // appel de la méthode Pen
    this.pen = new Pen();
    // appel de la méthode Slate en lui transmettant un argument bien spécifique
    this.canvas = new Slate(this.pen);
  }

  onClickColorPicker() {
    // un fadeIn
    $("#color-palette").fadeIn("slow");
  }

  onClickPenColor(e) {
    console.log(e);
    // -> Récupérer la <div> qui a déclenché l'évènement.
    const div = e.currentTarget;
    // -> Récupérer l'attribut HTML5 data-color.
    const penColor = $(div).data("color");
    // -> Modifier la couleur du crayon.
    this.pen.setColor(penColor);
  }

  onClickPenSize(e) {
    console.log(e);
    // -> Récupérer le <button> qui a déclenché l'évènement.
    const button = e.currentTarget;
    // -> Récupérer l'attribut HTML5 data-size.
    const penSize = $(button).data("size");
    // -> Modifier l'épaisseur du crayon.
    this.pen.setSize(penSize);
  }

  onPickColor() {
    // -> Récupérer de la couleur sur laquelle l'utilisateur a cliqué.
    const color = this.colorPalette.getPickedColor();

    // -> Changer la couleur du crayon.
    this.pen.setColorAsRgb(color.red, color.green, color.blue);

    $("#color-palette").fadeOut("slow");
  }

  start() {
    // Installer des gestionnaires d'évènements des outils.
    // $('#tool-clear-canvas').on("click", this.canvas.clear.bind(this.canvas));
    $("#tool-color-picker").on("click", this.onClickColorPicker.bind(this));

    // Installer des gestionnaires d'évènements de configuration du crayon.

    $(".pen-color").on("click", (e) => this.onClickPenColor(e)); // arrow function ES6

    $(".pen-color").on("click", this.onClickPenColor.bind(this)); // deprecated bind

    $(".pen-size").on("click", this.onClickPenSize.bind(this));

    // Créer un évènement spécifique à l'application (lié à notre palette de dégradé).
    // $("#color-palette").on('click', e => this.onPickColor(e));

    // jQuery
    $(document).on("magical-slate:pick-color", (e) => this.onPickColor(e));

    // natif
    document.addEventListener("magical-slate:pick-color", (e) =>
      this.onPickColor(e)
    );
  }
}
