const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    fetch(url).then((res) => {
        //Error al no encontrar id del pokemon buscado
        if (res.status != "200") {
            console.log(res);
			pokeError();
        }
        else {
            return res.json(); //Peticion exitosa
        }
    }).then((data) => {
        if (data) {
            //console.log(data);

			//Función Datos pokemon
			pokeInfo(data);

			//Función estadísticas pokemon
			showStats(data.stats);

			//Función movimientos pokemon
			showMoves(data.moves);
        }
    });
}

// Función para mostrar información de datos pokemon
const pokeInfo = data => {

	// Imagen pokémon
	let pokeImage = document.getElementById('pokemonImg');
	pokeImage.src = data.sprites.other['official-artwork'].front_default;

	// ID pokémon
	let ID = data.id;
	document.getElementById("pokemonID").innerHTML = "N.° " + ID;

	// Nombre pokémon
	let name = data.species.name;
	document.getElementById("pokemonName").innerHTML = name;

	// Tipo pokémon
	let type = data.types.map((typ) => typ.type.name);
	document.getElementById("pokemonType").innerHTML = "";
	type.forEach((item) => {
		// Buscar los tipos para agregar en un <li> con su clase
		if (item.includes("normal")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-normal">${item}</li>`;
		} else if (item.includes("fire")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-fuego">${item}</li>`;
		} else if (item.includes("water")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-agua">${item}</li>`;
		} else if (item.includes("grass")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-planta">${item}</li>`;
		} else if (item.includes("flying")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-volador">${item}</li>`;
		} else if (item.includes("fighting")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-lucha">${item}</li>`;
		} else if (item.includes("poison")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-veneno">${item}</li>`;
		} else if (item.includes("electric")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-electrico">${item}</li>`;
		} else if (item.includes("ground")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-tierra">${item}</li>`;
		} else if (item.includes("rock")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-roca">${item}</li>`;
		} else if (item.includes("psychic")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-psiquico">${item}</li>`;
		} else if (item.includes("ice")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-hielo">${item}</li>`;
		} else if (item.includes("bug")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-bicho">${item}</li>`;
		} else if (item.includes("ghost")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-fantasma">${item}</li>`;
		} else if (item.includes("steel")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-acero">${item}</li>`;
		} else if (item.includes("dragon")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-dragon">${item}</li>`;
		} else if (item.includes("dark")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-siniestro">${item}</li>`;
		} else if (item.includes("fairy")) {
			document.getElementById("pokemonType").innerHTML += `<li class="tipo-hada">${item}</li>`;
		} else {
			document.getElementById("pokemonType").innerHTML += `<li>${item}</li>`;
		}
	});
};

//Funcion mostrar estadísticas pokémon
const showStats = stats => {
	// Estadisticas del pokémon
	let hp = stats[0].base_stat;
	let attack = stats[1].base_stat;
	let defense = stats[2].base_stat;
	let specialattack = stats[3].base_stat;
	let specialdefense = stats[4].base_stat;
	let speed = stats[5].base_stat;
	// Elementos a incorporar los <li>
	document.getElementById("pokeStats").innerHTML = "";
	const lista = document.getElementById("pokeStats");
	// Creamos los <li>
	const li_hp = document.createElement("li");
	const li_attack = document.createElement("li");
	const li_defense = document.createElement("li");
	const li_specialattack = document.createElement("li");
	const li_specialdefense = document.createElement("li");
	const li_speed = document.createElement("li");
	// Agregamos el contenido al <li>
	li_hp.innerHTML = "<b>HP:</b>" + " " + hp;
	li_attack.innerHTML = "<b>Defense:</b>" + " " + attack;
	li_defense.innerHTML = "<b>Defense:</b>" + " " + defense;
	li_specialattack.innerHTML = "<b>Special Attack:</b>" + " " + specialattack;
	li_specialdefense.innerHTML = "<b>Special Defense:</b>" + " " + specialdefense;
	li_speed.innerHTML = "<b>Speed:</b>" + " " + speed;
	// Incorporamos al <ul>
	lista.appendChild(li_hp);
	lista.appendChild(li_attack);
	lista.appendChild(li_defense);
	lista.appendChild(li_specialattack);
	lista.appendChild(li_specialdefense);
	lista.appendChild(li_speed);
};

//Función monstrar movimientos pokémon
const showMoves = moves => {
	// Movimientos del pokemon
	let mov = moves.map((typ) => typ.move.name);
	document.getElementById("pokeMoves").innerHTML = "";
	// Colocar cada movimiento en un <li>
	mov.forEach(function (el) {
		document.getElementById("pokeMoves").innerHTML += "<li>" + el + "</li>";
	});
}

// Función Error
const pokeError = () => {
	document.getElementById("pokemonImg").src = "https://i.pinimg.com/564x/00/2d/57/002d5714c44f88a16c1f0bdfa97ca05e.jpg" //Pysduck
    document.getElementById("pokemonID").innerHTML = "Error:"; //ID not found
    document.getElementById("pokemonName").innerHTML = "Not Found"; //Name not Found
    document.getElementById("pokemonType").innerHTML = `<li class="tipo-error"> ? </li>`; //Type not found
	document.getElementById("pokeStats").innerHTML = `<li> Not Data </li>`; //Type not found
	
}

//Función Enter para buscar pokemon
document.addEventListener("keydown", function(){
	var x=event.keyCode || event.which;
	if(x==13)
	{
	fetchPokemon()
	}
	});


//Ocultar al iniciar la capa de habilidades
document.getElementById("stadisctics_box").style.display = "none";

//Funcion Mostrar Estadisticas
const Mostrar = () =>
{
	document.getElementById("stadisctics_box").style.display = "Block";
	Close2();
}

//Función Ocultar Estadiscticas
const Close = () =>
{
	document.getElementById("stadisctics_box").style.display = "none";
}

/*--------------------------------------------------------------------*/

//Ocultar al iniciar la capa de movimientos
document.getElementById("moves_box").style.display = "none";

//Funcion Mostrar Movimientos
const Mostrar2 = () =>
{
	document.getElementById("moves_box").style.display = "Block";
	Close();
}

//Función Ocultar Movimientos
const Close2 = () =>
{
	document.getElementById("moves_box").style.display = "none";
}

 
