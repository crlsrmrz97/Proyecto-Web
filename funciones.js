document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const numbersContainer = document.getElementById("numbers-container");
    const matchdayTables = document.querySelectorAll(".wfb-tabcalc-matchday");

    let currentTableIndex = 0;

    function showTable(index) {
        matchdayTables.forEach((table, i) => {
            if (i === index) {
                table.style.display = "table";
            } else {
                table.style.display = "none";
            }
        });
    }

    function updateButtons() {
        prevButton.style.display = currentTableIndex === 0 ? "none" : "block";
        nextButton.style.display = currentTableIndex === matchdayTables.length - 1 ? "none" : "block";
    }

    function showNumbers1To9() {
        numbersContainer.innerHTML = "";
        for (let i = 1; i <= 9; i++) {
            const numberDiv = document.createElement("div");
            numberDiv.className = "wfb-tabcalc-selector-item";
            numberDiv.textContent = i;

            // Modificar el índice aquí para evitar conflictos
            numberDiv.addEventListener("click", () => {
                currentTableIndex = i - 1;
                showTable(currentTableIndex);
                updateButtons();
            });

            numbersContainer.appendChild(numberDiv);
        }

        // Mostrar la flecha ">" después de los números
        const nextDiv = document.createElement("div");
        nextDiv.className = "nav-arrow";
        nextDiv.textContent = ">";
        nextDiv.addEventListener("click", () => {
            showNumbers10To17();
        });
        numbersContainer.appendChild(nextDiv);
    }

    function showNumbers10To17() {
        numbersContainer.innerHTML = "";
        // Mostrar la flecha "<" antes de los números
        const prevDiv = document.createElement("div");
        prevDiv.className = "nav-arrow";
        prevDiv.textContent = "<";
        prevDiv.addEventListener("click", () => {
            showNumbers1To9();
        });
        numbersContainer.appendChild(prevDiv);

        for (let i = 10; i <= 17; i++) {
            const numberDiv = document.createElement("div");
            numberDiv.className = "wfb-tabcalc-selector-item";
            numberDiv.textContent = i;

            // Modificar el índice aquí para evitar conflictos
            numberDiv.addEventListener("click", () => {
                currentTableIndex = i - 1;
                showTable(currentTableIndex);
                updateButtons();
            });

            numbersContainer.appendChild(numberDiv);
        }
    }

    // Llama a showNumbers10To17 primero para mostrar la flecha ">"
    showNumbers10To17();

    // Luego, llama a showNumbers1To9 para mostrar los números del 1 al 9
    showNumbers1To9();

    prevButton.addEventListener("click", () => {
        if (currentTableIndex > 0) {
            currentTableIndex--;
            showTable(currentTableIndex);
            updateButtons();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentTableIndex < matchdayTables.length - 1) {
            currentTableIndex++;
            showTable(currentTableIndex);
            updateButtons();
        }
    });
});



 // El otro script para la tabla de partidos de fútbol va aquí
 document.addEventListener("DOMContentLoaded", function() {
    const matchdayTables = document.querySelectorAll(".wfb-tabcalc-matchday");
    let currentTableIndex = 0;

    function showTable(index) {
        matchdayTables.forEach((table, i) => {
            if (i === index) {
              table.style.display = "table";
            } else {
              table.style.display = "none";
            }
          });
        }

    function updateButtons() {
        prevButton.style.display = currentTableIndex === 0 ? "none" : "block";
        nextButton.style.display = currentTableIndex === matchdayTables.length - 1 ? "none" : "block";
    }

    // Llama a showNumbers10To17 primero para mostrar la flecha ">"
    showNumbers10To17();

    prevButton.addEventListener("click", () => {
        if (currentTableIndex > 0) {
            currentTableIndex--;
            showTable(currentTableIndex);
            updateButtons();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentTableIndex < matchdayTables.length - 1) {
            currentTableIndex++;
            showTable(currentTableIndex);
            updateButtons();
        }
    });
});

function limpiarTablaPosiciones() {
 // Obtener una referencia a la tabla de posiciones
 const tablaPosiciones = document.getElementById("clasificacion");

 // Obtener todas las filas de la tabla de posiciones
 const filasTabla = tablaPosiciones.querySelectorAll("tr");

 // Iterar a través de las filas (empezar desde 1 para omitir el encabezado)
 for (let i = 1; i < filasTabla.length; i++) {
   const fila = filasTabla[i];
   const celdas = fila.querySelectorAll("td");

   // Iterar a través de las celdas, omitiendo las dos primeras celdas
   for (let j = 2; j < celdas.length; j++) {
     // Establecer en "0" solo si la celda no tiene la clase "intacta"
     if (!celdas[j].classList.contains("intacta") ) {
       celdas[j].textContent = "0";
     }
   }
 }

 // Limpiar los campos de entrada sin establecerlos en "0"
 const inputResultados = document.querySelectorAll("input[type='text']");
 inputResultados.forEach((input) => (input.value = ""));

}




  function agregarPartido() {
    // Obtener una referencia a la tabla de posiciones
    const tablaPosiciones = document.getElementById("clasificacion");
  
    // Obtener todas las filas de resultados de ambas jornadas
    const filasResultados = document.querySelectorAll(".wfb-tabcalc-matchday tbody tr");
  
    // Crear un objeto para almacenar la información de los equipos
    const equipos = {};
  
    // Función para actualizar la información del equipo
function actualizarEquipo(equipo, puntos, golesAFavor, golesEnContra) {
  if (!equipos[equipo]) {
    equipos[equipo] = {
      puntos: 0,
      diferenciaGoles: 0,
      golesAFavor: 0,
      golesEnContra: 0,
      partidosJugados: 0,
      partidosGanados: 0,
      partidosEmpatados: 0,
      partidosPerdidos: 0,
      jornadasSinGanar: 0,
      jornadasSinEmpatar: 0,
      primerPartidoGanado: false, // Nueva propiedad para llevar el registro del primer partido ganado
    };
  }

  equipos[equipo].partidosJugados++;

  if (equipo === "Ecuador") {
    if (golesAFavor > golesEnContra) {
      equipos[equipo].partidosGanados++;
      equipos[equipo].puntos += 3;
    } else if (golesAFavor === golesEnContra) {
      equipos[equipo].partidosEmpatados++;
      equipos[equipo].puntos += 1;
    } else {
      equipos[equipo].partidosPerdidos++;
    }
  } else {
    equipos[equipo].puntos += puntos;
    if (golesAFavor > golesEnContra) {
      equipos[equipo].partidosGanados++;
    } else if (golesAFavor === golesEnContra) {
      equipos[equipo].partidosEmpatados++;
    } else {
      equipos[equipo].partidosPerdidos++;
    }
  }

  equipos[equipo].golesAFavor += golesAFavor;
  equipos[equipo].golesEnContra += golesEnContra;
  equipos[equipo].diferenciaGoles = equipos[equipo].golesAFavor - equipos[equipo].golesEnContra;
}


  
    // Calcular la tabla de posiciones para todas las jornadas
    filasResultados.forEach((fila) => {
      const equipoLocal = fila.querySelector(".wfb-tabcalc-name-home").textContent;
      const equipoVisitante = fila.querySelector(".wfb-tabcalc-name-away").textContent;
      const golesLocal = parseInt(fila.querySelector(".wfb-tabcalc-goals-home input").value, 17);
      const golesVisitante = parseInt(fila.querySelector(".wfb-tabcalc-goals-away input").value, 17);
  
      if (!isNaN(golesLocal) && !isNaN(golesVisitante)) {
        // Actualizar la información de los equipos
        actualizarEquipo(equipoLocal, golesLocal > golesVisitante ? 3 : golesLocal === golesVisitante ? 1 : 0, golesLocal, golesVisitante);
        actualizarEquipo(equipoVisitante, golesVisitante > golesLocal ? 3 : golesLocal === golesVisitante ? 1 : 0, golesVisitante, golesLocal);
      }
    });
  
    // Convertir el objeto de equipos en un array de objetos
    const equiposArray = Object.keys(equipos).map((equipo) => ({
      equipo,
      ...equipos[equipo],
    }));
  
    // Ordenar el array de equipos por puntos y diferencia de goles
    equiposArray.sort((a, b) => {
      if (a.puntos !== b.puntos) {
        return b.puntos - a.puntos;
      } else {
        return b.diferenciaGoles - a.diferenciaGoles;
      }
    });
  
    // Limpiar la tabla de posiciones
    while (tablaPosiciones.rows.length > 1) {
      tablaPosiciones.deleteRow(1);
    }
  
    // Llenar la tabla de posiciones con los nuevos datos
    equiposArray.forEach((equipo, index) => {
      const newRow = tablaPosiciones.insertRow(index + 1);
      newRow.insertCell(0).textContent = index + 1;
      newRow.insertCell(1).textContent = equipo.equipo;
      newRow.insertCell(2).textContent = equipo.partidosJugados;
      newRow.insertCell(3).textContent = equipo.partidosGanados;
      newRow.insertCell(4).textContent = equipo.partidosEmpatados;
      newRow.insertCell(5).textContent = equipo.partidosPerdidos;
      newRow.insertCell(6).textContent = equipo.golesAFavor;
      newRow.insertCell(7).textContent = equipo.golesEnContra;
      newRow.insertCell(8).textContent = equipo.diferenciaGoles; // Nueva columna para partidos ganados
      newRow.insertCell(9).textContent = equipo.puntos; // Nueva columna para partidos ganados

      if (index === 0) {
        newRow.classList.add("primer-lugar"); // Primer lugar
      } else if (index === 1) {
        newRow.classList.add("segundo-lugar"); // Segundo lugar
      } else if (index === 2) {
        newRow.classList.add("tercer-lugar"); // Tercer lugar
      } else if (index === 3) {
        newRow.classList.add("cuarto-lugar"); // Cuarto lugar
      } else if (index === 4) {
        newRow.classList.add("quinto-lugar"); // Quinto lugar
      } else if (index === 5) {
        newRow.classList.add("sexto-lugar"); // Sexto lugar
      } else if (index === 6) {
        newRow.classList.add("septimo-lugar"); // Séptimo lugar
      } else if (index === 7) {
        newRow.classList.add("octavo-lugar"); // Octavo lugar
      } else if (index === 8) {
        newRow.classList.add("noveno-lugar"); // Noveno lugar
      } else if (index === 9) {
        newRow.classList.add("decimo-lugar"); // Sexto lugar
      } else if (index === 10) {
        newRow.classList.add("onceavo-lugar"); // Noveno lugar
      } else if (index === 11) {
        newRow.classList.add("doceavo-lugar"); // Noveno lugar
      } else if (index === 12) {
        newRow.classList.add("treceavo-lugar"); // Noveno lugar
      } else if (index === 13) {
        newRow.classList.add("catorceavo-lugar"); // Noveno lugar
      } else if (index === 14) {
        newRow.classList.add("quinceavo-lugar"); // Noveno lugar
      } else if (index === 15) {
        newRow.classList.add("diecisesavo-lugar"); // Noveno lugar
      } else if (index === 16) {
        newRow.classList.add("diecisieteavo-lugar"); // Noveno lugar
      } else if (index === 17) {
        newRow.classList.add("dieciochoavo-lugar"); // Noveno lugar
    }});
  }
  
