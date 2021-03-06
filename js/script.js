window.onload = function()
{

        conta    = 0;
        sudoku      = [],
        solve       = [],
        dimension   = 3,
        dificultad  = 1;
        numVacios=document.getElementsByClassName("numero");
        parteID=[];
        arrayId=[];
        arrayRes=[];
        arrayfinal=[];
        y="solve";


    //comparamos el numero ingresado
    select = nom_div("opc_2");
    for (var i = 2; i<= 5; i++)
    {
        arrayRes.length=0;
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
        console.log(opt);

    }
     


    /*
        Función en la cual llega lel valor escrito por el usaurio
        además de la posición del valor digitado en la mattriz...
        Se deberá validar si el número digitado cumple con la condición para estar en esa posición...
        1. Un número no puede repetirse en el mismo cuadrante...
        2. Un número no puede estar en la misma Fila.
        3. Un número no puede estar en la misma columna.
    */
    var validaSudoku = function(valor, id)
    {
        var parteID  = id.split("_");
        parte=[];

        console.log(parteID)
        console.log(valor);
        arrayfinal=[];

        for(var h=0;h<numVacios.length;h++)
        {
            parte.push(numVacios[h].id);           
            arrayfinal.push(eval(nom_div(parte[h]).value));
        }
        console.table(parte);   
    }


    var nuevoSudoku = (function nuevoSudoku()
    {
        var newSudoku = sudokuJS.creaSudoku(dimension, dificultad);
        parteID.length=0;
        pos=""; 
        arrayId.length=0;
        arrayfinal.length=0;
        y="solve";



        sudoku = newSudoku.sudokujs;
        solve = newSudoku.respuesta;
        //Para dibujar el sudoku en html...
            txt     = "<table>",
            nomID   = "";
            eventos = [];
        for(var fila = 0; fila < sudoku.length; fila++)
        {
            txt += "<tr>";
            for(var col = 0; col < sudoku.length; col++)
            {
                txt += "<td>";
                txt += "<table class = 'cuadrante' id = '"+fila+"_"+col+"'>"
                for(var i = 0; i < sudoku.length; i++)
                {
                    txt += "<tr>";
                    for(var c = 0; c < sudoku.length; c++)
                    {
                        nomID = fila + "_" + col + "_" + i + "_" + c;
                        txt += "<td class = 'interno' id = 'td_"+(nomID)+"'>"
                        if(sudoku[fila][col][i][c] !== 0)
                        {
                            txt += sudoku[fila][col][i][c];
                        }
                        else
                        {
                            txt += "<input type = 'text' class = 'numero' id = '"+(nomID)+"' maxlength = '1'>";
                            eventos.push(nomID);
                        }
                        txt += "</td>";
                    }
                    txt += "</tr>";
                }
                txt += "</table>";
            }
            txt += "</tr>";
        }
        txt += "</table>";
        nom_div("escenario").innerHTML = txt;
        valida();
        for(var i = 0; i < eventos.length; i++)
        {
            nom_div(eventos[i]).addEventListener("keyup", function(event)
            {
                if(isNumber(this.value) || this.value === "")
                {
                    validaSudoku(this.value === "" ? 0 : Number(this.value), this.id);
                   for(var m=0;m<numVacios.length;m++)
                    {
                        if(arrayRes[m]==arrayfinal[m])
                        {
                            conta=conta+1;
                            if(conta==numVacios.length)
                            {
                               nom_div("textDiv1").innerHTML = "Felicitaciones!!! lo lograste..";
                                arrayRes.length=0;
                                conta=0;
                                nuevoSudoku();
                            }
                        }
                        else
                        {
                            conta=0;
                            
                        }
                    }
                }
                else
                {
                    this.value = "";
                }
            });
        }
        //Fin de dibujar el sudoku...
        return nuevoSudoku;
    })();

    nom_div("resuelve").addEventListener('click', function(event)
    {
        
        //solucion...
        
        nomID = "";
        for(var fila = 0; fila < solve.length; fila++)
        {
            for(var col = 0; col < solve.length; col++)
            {
                for(var i = 0; i < solve.length; i++)
                {
                    for(var c = 0; c < solve.length; c++)
                    {
                    
                        nomID = fila + "_" + col + "_" + i + "_" + c;
                        if(nom_div(nomID) !== null)
                        {
                            nom_div(nomID).value = solve[fila][col][i][c];
                        }
                    }
                }
            }
        }
    });
  
        
    function valida()
    {
        for(var h=0;h<numVacios.length;h++)
        {
            parteID.push(numVacios[h].id);            
            pos=parteID[h].split("_");
            arrayId.push(pos);

        }
        for(var i=0;i<numVacios.length;i++)
        {
            arrayRes.push(eval(y+"["+arrayId[i][0]+"]["+arrayId[i][1]+"]["+arrayId[i][2]+"]["+arrayId[i][3]+"]"));
        }
    
    }
    

    nom_div("nuevo").addEventListener('click', function(event)
    {
        
        nuevoSudoku();
    });
    for(var combo = 1; combo <= 2; combo++)
    {   
        nom_div("opc_" + combo).addEventListener('change', function(event)
        {
            arrayRes=[];
            var numOpc = Number(this.id.split("_")[1]);
            if(numOpc === 1)
            {
                if(Number(this.value) !== 0)
                {
                    dificultad = Number(this.value);
                }
            }
            else
            {
                if(Number(this.value) !== 0)
                {
                    dimension = Number(this.value);
                }
            }
            nuevoSudoku();
        });
    }
    
    function isNumber(n)
    {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    
};
function nom_div(div)
    {
        return document.getElementById(div);
    }
