const menu = document.querySelector("#menu");
const sideBar = document.querySelector(".sideBar");
const apiKey = "AIzaSyAVseJskFR7byOh2xOTwiTuVni8S4PO_9o";
let search_input = "";

menu.addEventListener("click", e => {
	sideBar.classList.toggle("show-sideBar");
});

window.addEventListener("click", e => {
	let a = document.querySelector(".search-live-data");

	a.style.display = "none";
});

async function fetchApi() {
	let request = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&videoType=any&part=snippet&maxResults=25&q=)`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",

			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	let response = await request.json();
	// console.log(response);
	return response;
}

async function videos() {
	let data = await fetchApi();
	// console.log(data);
	data.items.forEach(data => {
		let video_container = document.querySelector(".videos_container");
		let newData = document.createElement("div");
		newData.setAttribute("class", "video");
		let full_data = `
		<div class="video_thumbnail">
			<iframe
				id="video-data"
				width="560"
				height="315"
				src="https://www.youtube.com/embed/${data.id.videoId}"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
		</div>
		<div div class="video_details">
			<div class="author">
				<img src="${data.snippet.thumbnails.medium.url}" alt="" />
			</div>
			<div class="title">
			<h1>${data.snippet.title}</h1>
				<a href="">${data.snippet.channelTitle}</a>
				<span>10m views</span>
			</div>
		</div>
`;

		newData.innerHTML = full_data;
		video_container.append(newData);
	});
}
videos();

// document.addEventListener("click", function () {
// 	let a = document.querySelector("#search_hidden");
// 	a.style.display = "none";
// });
function showSearch() {
	let a = document.querySelector("#search_hidden");
	a.classList.toggle("show_search_list");
}

async function search() {
	let video_container = document.querySelector(".videos_container");
	video_container.innerHTML = "";
	let search = document.querySelector("#search_data");
	search_input = search.value;
	console.log(search.value);
	let request = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=25&q=${search_input})`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",

			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	let response = await request.json();
	// console.log(response);

	response.items.forEach(data => {
		let newData = document.createElement("div");
		newData.setAttribute("class", "video");
		let full_data = `
		<div class="video_thumbnail">
			<iframe
				id="video-data"
				width="560"
				height="315"
				src="https://www.youtube.com/embed/${data.id.videoId}"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
		</div>
		<div div class="video_details">
			<div class="author">
				<img src="${data.snippet.thumbnails.medium.url}" alt="" />
			</div>
			<div class="title">
			<h1>${data.snippet.title}</h1>
				<a href="">${data.snippet.channelTitle}</a>
				<span>10m views</span>
			</div>
		</div>
`;

		newData.innerHTML = full_data;
		video_container.append(newData);
	});
}
// let searchData = document.querySelector("#search_data");
// searchData.addEventListener("keypress", relatedContent());
async function relatedContent() {
	let get = document.querySelector("#search_hidden");
	console.log("Display changed to block");
	get.style.display = "block";

	document.querySelector("#search_hidden").innerHTML = "";
	let search = document.querySelector("#search_data");
	search_input = search.value;

	let request = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=25&q=${search_input})`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",

			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	let response = await request.json();
	// console.log(response);
	for (let a = 1; a <= 10; a++) {
		console.log("keypressed");
		let titleData = response.items[a].snippet.title;

		let newData = document.createElement("div");
		newData.setAttribute("class", "search-load-data");
		newData.setAttribute("onclick", "relatedData(this)");
		newData.innerText = titleData;
		let d = document.createElement("p");
		d.setAttribute("class", "dataForSearch");
		d.innerText = response.items[a].id.videoId;
		newData.append(d);
		let setData = document.querySelector("#search_hidden");

		setData.append(newData);
	}
}
async function relatedData(input) {
	let video_container = document.querySelector(".videos_container");
	video_container.innerHTML = "";
	search_input = input.innerText;

	let request = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=25&q=${search_input})`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",

			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	let response = await request.json();
	// console.log(response);

	response.items.forEach(data => {
		let newData = document.createElement("div");
		newData.setAttribute("class", "video");
		let full_data = `
		<div class="video_thumbnail">
			<iframe
				id="video-data"
				width="560"
				height="315"
				src="https://www.youtube.com/embed/${data.id.videoId}"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
		</div>
		<div div class="video_details">
			<div class="author">
				<img src="${data.snippet.thumbnails.medium.url}" alt="" />
			</div>
			<div class="title">
			<h1>${data.snippet.title}</h1>
				<a href="">${data.snippet.channelTitle}</a>
				<span>10m views</span>
			</div>
		</div>
`;

		newData.innerHTML = full_data;
		video_container.append(newData);
	});
	showSearch();
}
function removeSearch() {
	let a = document.querySelector("#search_hidden");
	a.classList.remove("show_search_list");
}

async function bodyUpperContent(e) {
	let video_container = document.querySelector(".videos_container");
	video_container.innerHTML = "";
	let search = document.querySelector("#search_data");
	search_input = e.innerText;
	console.log(search.value);
	let request = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=25&q=${search_input})`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",

			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	let response = await request.json();
	// console.log(response);

	response.items.forEach(data => {
		let newData = document.createElement("div");
		newData.setAttribute("class", "video");
		let full_data = `
		<div class="video_thumbnail">
			<iframe
				id="video-data"
				width="560"
				height="315"
				src="https://www.youtube.com/embed/${data.id.videoId}"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
		</div>
		<div div class="video_details">
			<div class="author">
				<img src="${data.snippet.thumbnails.medium.url}" alt="" />
			</div>
			<div class="title">
			<h1>${data.snippet.title}</h1>
				<a href="">${data.snippet.channelTitle}</a>
				<span>10m views</span>
			</div>
		</div>
`;

		newData.innerHTML = full_data;
		video_container.append(newData);
	});
}
