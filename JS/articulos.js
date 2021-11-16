var UrlGetArticulo='http://localhost:80/G5_20/controller/Articulos.php?op=GetArticulos';
var UrlPostArticulos='http://localhost:80/G5_20/controller/Articulos.php?op=InsertArticulos';
var UrlGetUno='http://localhost:80/G5_20/controller/Articulos.php?op=GetUno'; 
var UrlPutArticulos='http://localhost:80/G5_20/controller/Articulos.php?op=UpdateArticulos';
var UrlDeleteArticulos='http://localhost:80/G5_20/controller/Articulos.php?op=DeleteArticulos';



$(document).ready(function(){
    CargarArticulos();
});

function  CargarArticulos(){
    $.ajax({
        url: UrlGetArticulo,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores='';

            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+MiItems[i].ID+ '</td>'+
                '<td>'+MiItems[i].DESCRIPCION + '</td>'+
                '<td>'+MiItems[i].UNIDAD+ '</td>'+
                '<td>'+MiItems[i].COSTO + '</td>'+
                '<td>'+MiItems[i].PRECIO + '</td>'+
                '<td>'+MiItems[i].APLICA_ISV + '</td>'+
                '<td>'+MiItems[i].PORCENTAJE_ISV + '</td>'+
                '<td>'+MiItems[i].ESTADO + '</td>'+
                '<td>'+MiItems[i].ID_SOCIO + '</td>'+
                '<td>'+
                '<button class="btn btn-outline-warning" onclick="CargarArticulo('+MiItems[i].ID +')">Editar</button>'+
                '<button class="btn btn-outline-danger" onclick="EliminarArticulos('+MiItems[i].ID +')">Eliminar</button>'+
                '</td>'+
             '</tr>';
                $('.articulos').html(Valores);
            }
        }

    });
}


function AgregarArticulos(){
    var datosarticulos = {
        DESCRIPCION: $('#DESCRIPCION').val(),
        UNIDAD: $('#UNIDAD').val(),
        COSTO: $('#COSTO').val(),
        PRECIO: $('#PRECIO').val(),
        APLICA_ISV: $('#APLICA_ISV').val(),
        PORCENTAJE_ISV: $('#PORCENTAJE_ISV').val(),
        ESTADO: $('#ESTADO').val(),
        ID_SOCIO: $('#ID_SOCIO').val()
    };

    var datosarticulosjson= JSON.stringify(datosarticulos);

    $.ajax({
        url: UrlPostArticulos,
        type: 'POST',
        data: datosarticulosjson,
        datatype: 'JSON',
        contentType: 'aplication/json',
        success:function(response){
            console.log(response);
        }
    });
    alert("Articulo Agregado");
}

function CargarArticulo(idarticulos){
    var datosarticulo = {
        ID: idarticulos
    };
    var datosarticulojson= JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data:datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
            $('#UNIDAD').val(MiItems[0].UNIDAD);
            $('#COSTO').val(MiItems[0].COSTO);
            $('#PRECIO').val(MiItems[0].PRECIO);
            $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
            $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);

            var btnactualizar = '<input type="submit" ID="btn_actualizar" onclick="ActualizarArticulo(' + MiItems[0].ID+ ')"'+
            'value="Actualizar Articulo" class= "btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        }
        
    });
}

function ActualizarArticulo(idarticulos){
    var datosarticulo = {
        ID:idarticulos,
        DESCRIPCION: $('#DESCRIPCION').val(),
        UNIDAD: $('#UNIDAD').val(),
        COSTO: $('#COSTO').val(),
        PRECIO: $('#PRECIO').val(),
        APLICA_ISV: $('#APLICA_ISV').val(),
        PORCENTAJE_ISV: $('#PORCENTAJE_ISV').val(),
        ESTADO: $('#ESTADO').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
    };
    var datosarticulojson=JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlPutArticulos,
        type: 'PUT',
        data:datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }

    });
    alert("Articulo Actualizado");
}

function EliminarArticulos(idarticulo){
    var datosarticulo = {
        ID: idarticulo
    };
    var datosarticulojson= JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlDeleteArticulos,
        type: 'DELETE',
        data:datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }

    });
    alert("Articulo Eliminado");
}

