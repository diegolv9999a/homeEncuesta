$(document).ready(function () {

    cargar();

    $("#btnGuardar").click(function () {
        
        $pregunta0    = $("#pre0").val();
        $pregunta1    = $("#pre1").val();
        $pregunta2    = $("#pre2").val();
        $pregunta3    = $("#pre3").val();
        $pregunta4    = $("#pre4").val();
        $pregunta5    = $("#pre5").val();

       
        console.log(escribir($pregunta0,$pregunta1,$pregunta2,$pregunta3,$pregunta4,$pregunta5)+"es");
        limpiarCampos();
    });

    $("#btnMostrar").click(function () {

        cargar();

    });

});

function escribir(punto0,punto1,punto2,punto3,punto4,punto5) {
    $tabla = "registros";
    // A post entry.
    var postData = {
        pregunta0: punto0,
        pregunta1: punto1,
        pregunta2: punto2,
        pregunta3: punto3,
        pregunta4: punto4,
        pregunta5: punto5
       
    };
    
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child($tabla).push().key;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/' + $tabla + '/' + newPostKey] = postData;
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
}




function cargar() {

    $tabla = "registros";
    return firebase.database().ref($tabla).once('value').then(function (snapshot) {
        $data = snapshot.val();
        snapshot.forEach(logValue);

    });

    function logValue(info) {
        $fila = "";
        $pregunta0   = info.val().pregunta0;
        $pregunta1   = info.val().pregunta1;
        $pregunta2   = info.val().pregunta2;
        $pregunta3   = info.val().pregunta3;
        $pregunta4   = info.val().pregunta4;
        $pregunta5   = info.val().pregunta5;
        
        $fila   += "<tr>";
        $fila   += "<td>"+$pregunta0+"</td>";
        $fila   += "<td>"+$pregunta1+"</td>";
        $fila   += "<td>"+$pregunta2+"</td>";
        $fila   += "<td>"+$pregunta3+"</td>";
        $fila   += "<td>"+$pregunta4+"</td>";
        $fila   += "<td>"+$pregunta5+"</td>";    
        $fila   += "</tr>";
        $("#mitabla").append($fila);
        //console.log(info.val().dispositivo + " " + info.val().token);
    }
}

function limpiarCampos()
{
    document.getElementById("formulario").reset();
}

