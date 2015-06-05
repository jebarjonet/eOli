module.exports.color = {
    validator: function(val){
        return val.match(/^([0-9a-f]{3}){1,2}$/i);
    },
    msg: 'Ceci n\'est pas une couleur hexadécimale valide.'
};

module.exports.couple = {
    validator: function(val){
        return val.length >= 2;
    },
    msg: 'Il faut sélectionner au moins deux éléments.'
};