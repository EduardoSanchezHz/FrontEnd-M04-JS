const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        //Error al no encontrar id del pokemon buscado
        if (res.status != "200") {
            console.log(res);
            pokeImage("https://i.pinimg.com/564x/00/2d/57/002d5714c44f88a16c1f0bdfa97ca05e.jpg") //Psyduck confundido
            document.getElementById("pokemonID").innerHTML = "Error:"; //ID not found
            document.getElementById("pokemonName").innerHTML = "Not Found"; //Name not Found
            document.getElementById("pokemonType").innerHTML = `<li class="tipo-error"> ? </li>`; //Type not found
        }
        else {
            return res.json(); //Peticion exitosa
        }
    }).then((data) => {
        if (data) {
            /*---------------- Información Pokémon -----------------*/
            console.log(data);

            // Ruta imagen pokémon
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            console.log(pokeImg);

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

            //Estadísticas Pokemon
            let hp = data.stats[0].base_stat;
			let attack = data.stats[1].base_stat;
			let defense = data.stats[2].base_stat;
			let specialattack = data.stats[3].base_stat;
			let specialdefense = data.stats[4].base_stat;
			let speed = data.stats[5].base_stat;
            document.getElementById("pokeStats").innerHTML = "";

            
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

			// Movimientos del pokemon
			let moves = data.moves.map((typ) => typ.move.name);
			document.getElementById("pokeMoves").innerHTML = "";
			// Colocar cada movimiento en un <li>
			moves.forEach(function (el) {
			document.getElementById("pokeMoves").innerHTML += "<li>" + el + "</li>";
			});
        }
    });
}

/*-----------Funciones para encontrar datos pokémon ------------*/
// Sprite (foto) pokémon
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokemonImg");
    pokePhoto.src = url;
}

// ID pokémon
const pokeID = (url) => {
    const propID = document.getElementById("pokemonID")
    propID.src = url;
}

// Nombre pokémon
const pokeName = (url) => {
    const propName = document.getElementById("pokemonName")
    propName.src = url;
}
