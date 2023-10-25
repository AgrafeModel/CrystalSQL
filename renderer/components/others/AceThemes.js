import ace from 'ace-builds';
import 'ace-builds/src-noconflict/theme-monokai'; // Importez un thème existant comme base

// Créez un thème personnalisé
export const purpleDarkTheme = ace.acequire('ace/theme/textmate'); // Utilisez un thème existant comme base
purpleDarkTheme.cssText += `
  .ace_gutter {
    background: #282a36; /* Couleur de fond sombre pour la barre latérale des numéros de ligne */
    color: #8A2BE2; /* Couleur violette pour les numéros de ligne */
  }
  .ace_keyword {
    color: #BD93F9; /* Couleur violette pour les mots-clés */
  }
  .ace_string {
    color: #50FA7B; /* Couleur verte pour les chaînes */
  }
  /* Personnalisez d'autres éléments de syntaxe selon vos besoins */
`;

// Définissez le thème personnalisé
ace.define('ace/theme/purple-dark', ['require', 'exports', 'module', 'ace/lib/dom'], function (require, exports, module) {
  exports.isDark = true; // Thème sombre
  exports.cssClass = 'ace-purple-dark';
  exports.cssText = purpleDarkTheme.cssText;
  var dom = require('../lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
});
