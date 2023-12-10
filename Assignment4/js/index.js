// constants to get html elements
const studentCreds = document.getElementById("studentCreds");
const search = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const tableBody = document.getElementById("tableBody");
const tableHeading = document.getElementById("tableHeading");

let labelsAdded = false;

// connect to api
async function getDataFromApi(){
	// display student creds on button click
	studentCreds.textContent = "Evan Hinde 200529232";
	let searchData = search.value;
    const url = 'https://free-nba.p.rapidapi.com/players?per_page=20&search=' + searchData;
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': '2dbae2a3b9msha68b7eceea9f4f1p196da6jsn4e94ac675e6a',
		    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
	    console.log(result);
		displayData(result.data);
    } catch (error) {
	    console.error(error);
    }
}


// display data
function displayData(playerData) {
    console.log(playerData);

	// loop through player array
	for (let i = 0; i < playerData.length; i++) {
		console.log(playerData[i]);

		// create table data elements
		let tableRow = document.createElement("tr");
		let nameData = document.createElement("td");
		let positionData = document.createElement("td");
		let heightData = document.createElement("td");
		let teamData = document.createElement("td");

		// make button
		let teamDetailsButton = document.createElement("button");
		teamDetailsButton.textContent = "View";

		// add data to elements
		nameData.textContent = `${playerData[i].first_name} ${playerData[i].last_name}`;
		positionData.textContent = playerData[i].position;
		if (playerData[i].height_feet == null) {
			heightData.textContent = "";
		} else {
			heightData.textContent = `${playerData[i].height_feet}'${playerData[i].height_inches}`;
		}
		teamData.textContent = playerData[i].team.full_name;

		// append to the tr and tr to body
		tableRow.appendChild(nameData);
		tableRow.appendChild(positionData);
		tableRow.appendChild(heightData);
		tableRow.appendChild(teamData);

		tableRow.appendChild(teamDetailsButton);

		// display team details when button is clicked
		function displayTeamDetails() {
			if (!labelsAdded) {
				let conferenceLabel = document.createElement("th");
				let divisionLabel = document.createElement("th");
				conferenceLabel.textContent = "Conference";
				divisionLabel.textContent = "Division";
		
				tableHeading.appendChild(conferenceLabel);
				tableHeading.appendChild(divisionLabel);

				labelsAdded = true;
			}

			let conferenceData = document.createElement("td");
			let divisionData = document.createElement("td");
			conferenceData.textContent = playerData[i].team.conference;
			divisionData.textContent = playerData[i].team.division;
			tableRow.appendChild(conferenceData);
			tableRow.appendChild(divisionData);
		}
	
		teamDetailsButton.addEventListener('click', displayTeamDetails);

		tableBody.appendChild(tableRow);
	}
}

// event listener to call fetch function
searchButton.addEventListener('click', getDataFromApi);
