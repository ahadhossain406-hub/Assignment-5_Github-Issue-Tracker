function setActive(type) {

    const allBtn = document.getElementById("allBtn")
    const openBtn = document.getElementById("openBtn")
    const closedBtn = document.getElementById("closedBtn")

    allBtn.className = "px-4 py-2 bg-gray-200 rounded text-gray-500 cursor-pointer"
    openBtn.className = "px-4 py-2 bg-gray-200 rounded text-gray-500 cursor-pointer"
    closedBtn.className = "px-4 py-2 bg-gray-200 rounded text-gray-500 cursor-pointer"

    if (type === "all") {
        allBtn.className = "px-4 py-2 bg-purple-500 rounded text-white cursor-pointer"
    }

    if (type === "open") {
        openBtn.className = "px-4 py-2 bg-purple-500 rounded text-white cursor-pointer"
    }

    if (type === "closed") {
        closedBtn.className = "px-4 py-2 bg-purple-500 rounded text-white cursor-pointer"
    }

}


const api = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

let allIssues = []

async function loadIssues() {

    const res = await fetch(api)
    const data = await res.json()

    allIssues = data.data

    document.getElementById("issueCount").innerText = allIssues.length

    displayIssues(allIssues)

}


function displayIssues(issues) {

    const container = document.getElementById("issuesContainer")

    container.innerHTML = ""

    issues.forEach(issue => {

        const card = document.createElement("div")

        let borderColor =
            issue.status === "open"
                ? "border-green-500"
                : "border-purple-500"

        card.className =
            `bg-white border-t-4 ${borderColor} rounded-lg shadow p-4 cursor-pointer`

        let statusIcon = issue.status === "open"
            ? '<img src="assets/Open-Status.png" class="w-6 h-6">'
            : '<img src="assets/ClosedStatus.png" class="w-6 h-6">';

        card.innerHTML = `

<div class="flex justify-between items-center mb-2">

${statusIcon}

<span class="text-xs px-3 py-1 rounded-full
${issue.priority === "high"
                ? "bg-red-100 text-red-500"
                : issue.priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-200 text-gray-500"}">

${issue.priority.toUpperCase()}

</span>

</div>

<h2 class="font-semibold text-gray-800">
${issue.title}
</h2>

<p class="text-sm text-gray-500 mt-2">
${issue.description}
</p>

<div class="flex gap-2 mt-3">

<span class="text-xs px-2 py-1 bg-red-100 text-red-500 rounded-full">
BUG
</span>

<span class="text-xs px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full">
HELP WANTED
</span>

</div>

<div class="border-t mt-4 pt-2 text-xs text-gray-500">

<p>#${issue.id} by ${issue.author}</p>

<p>${issue.createdAt}</p>

</div>

`

        card.onclick = function () {
            openModal(issue)
        }

        container.appendChild(card)

    })

}

function filterIssues(status) {

    const filtered = allIssues.filter(issue => issue.status === status)

    displayIssues(filtered)

    document.getElementById("issueCount").innerText = filtered.length

}


async function searchIssue() {

    const text = document.getElementById("searchInput").value

    const res = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
    )

    const data = await res.json()

    displayIssues(data.data)

    document.getElementById("issueCount").innerText = data.data.length

}

function openModal(issue) {

    document.getElementById("issueModal").classList.remove("hidden")

    document.getElementById("modalTitle").innerText = issue.title
    document.getElementById("modalDescription").innerText = issue.description

    document.getElementById("modalAuthor").innerText ="Opened by " + issue.author + " • " + issue.createdAt

    document.getElementById("modalCategory").innerText = issue.author

    document.getElementById("modalPriority").innerHTML =
        `<span class="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
${issue.priority.toUpperCase()}
</span>`

    const modalTags = document.getElementById("modalTags")

    modalTags.innerHTML = `
<span class="text-xs px-2 py-1 bg-red-100 text-red-500 rounded-full">
BUG
</span>

<span class="text-xs px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full">
HELP WANTED
</span>
`
}

function closeModal() {

    document.getElementById("issueModal").classList.add("hidden");

}

loadIssues()
