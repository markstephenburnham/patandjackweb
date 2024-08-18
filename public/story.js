const featureArray = [
	'Binoculars',
	'A Telescope',
	'A Mysterious Map',
	'A Mysterious Drawing',
	'A Beaver',
	'A 10 Point Buck',
	'A Snapping Turtle',
	'An Old Tractor',
	'A Fishing Trip',
	'A Row Boat',
	'A Full Moon',
	'An Old Oak Tree',
	'A Cavernous Barn',
	'The North Star',
	'A Campfire',
	'An Old Bicycle',
	'A Colorful Kite',
	'A Kettle of Vultures',
	'A BBQ Pit',
	'A Puppy',
	'A Noisy Rooster',
	'Poison Ivy',
	'Fireworks',
	'A Big Percheron Horse',
	'An Enormous Bull',
	'A Curious Catbird',
	'Singing Song Birds',
	'Bats!',
	'A Sleepy Bear',
	'A Big Fish',
	'A Large Apple Tree',
	'A Vegetable Patch',
	'A Great Wind',
	'A Unexpected Thunder Storm',
	'A Fierce Snow Storm',
	'A Cliff',
	'A Mysterious Cave',
	'A Waterfall',
	'A Wide and Peaceful River',
	'A Deep, Dark Lake',
	'A Mysterious Path',
	'A Covered Bridge',
	'A Mysterious Dirt Road',
	'A Model Airplane',
	'Skipping Stones',
	'Winter',
	'A Groundhog',
	'A Solar Eclipse',
	'An Echoing Canyon',
	'A Discovery of Fossilized Prints',
	'An Old Map',
	'A Sunken Rowboat',
	'A Hidden Treasure Chest',
	'An Ancient Oak with a Rope Swing',
	'A Secret Fishing Hole',
	'An Abandoned Cabin',
	'A Fox',
	'A Hawk Circling Overhead',
	'A Rusted Key Found in the Forest',
	'A Field of Wildflowers',
	'A Lightning Bug Show at Dusk',
	'A Lost Puppy',
	'A Fast-Flowing Creek',
	'A Hidden Valley',
	'A Stack of Old, Mysterious Letters',
	'An Old Bridge with Carvings',
	'A Moonlit Night Hike',
	'A Sudden Hailstorm',
];

var story = '';
// shuffle the elements above to present randomly
function shuffle(array) {
	let currentIndex = array.length, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
	return array;
}

$(document).ready(function () {
	// Shuffle features and select a subset
	const shuffledFeatures = shuffle(featureArray);
	const featuresGroup = shuffledFeatures.slice(0, 6);

	// Start table structure
	let tableHTML = '<table><tbody><tr>';

	// Loop through the features
	featuresGroup.forEach((feature, index) => {
		// Append the radio button and label inside a table cell
		tableHTML += `
<td>
	<input type="radio" id="${feature}" name="feature" value="${feature}">
	<label for="${feature}">${feature}</label>
</td>
`;

		// After every third item, close the row and start a new one
		if ((index + 1) % 3 === 0 && index !== featuresGroup.length - 1) {
			tableHTML += '</tr><tr>';
		}
	});

	// Close the last row and the table
	tableHTML += '</tr></tbody></table>';

	// Insert the table into the radio-group div
	$('.radio-group').html(tableHTML);

	// Show create button when a feature is selected
	$('input[name="feature"]').change(function () {
		$('#create-button').show();
	});

	// Handle story generation
	$('#create-button').click(function () {
		const selectedFeature = $('input[name="feature"]:checked').val();
		if (selectedFeature) {
			$('#loader').show();
			$('#title').text('');
			$('#story').text('');
			$('#create-button').hide();

			// to avoid CORS issues, AJAX submits locally and is handled in app.js
			const url = '/connector';

			const data = {
				feature: selectedFeature,
				//max_tokens: 100, // Adjust the max tokens if needed
			};

			$.ajax({
				url: url,
				type: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				data: JSON.stringify(data),
				success: function (response) {
					try {
						const responseJSON = JSON.parse(response);

						if (responseJSON && responseJSON.hasOwnProperty('story')) {
							$('#title').html(responseJSON.title);
							story = responseJSON.story;
					
							// Replace \n\n with paragraph tags
							story = story.replace(/\n\n/g, "</p><p>");

							story = `<p>${story}</p>`;

							$('#story').html(story);


						} else {
							console.warn('Property "story" does not exist in the response object.');
						}
					} catch (error) {
						console.error('Failed to parse JSON response:', error);
					}

					$('#loader').hide();

				},
				error: function (xhr, status, error) {
					console.error('Error:', error);
				}
			});
		}
	});
});