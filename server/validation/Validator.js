module.exports.color = {
    validator: function(val){
        return val.match(/^([0-9a-f]{3}){1,2}$/i);
    },
    msg: "Ceci n'est pas une couleur hexadécimale valide."
};