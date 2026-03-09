const api = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

let allIssues = []

// Load Issues

async function loadIssues() {

    const res = await fetch(api)
    const data = await res.json()

    allIssues = data.data

    document.getElementById("issueCount").innerText = allIssues.length

    displayIssues(allIssues)

}

// Display Issues

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

// Search

async function searchIssue() {

    const text = document.getElementById("searchInput").value

    const res = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
    )

    const data = await res.json()

    displayIssues(data.data)

    document.getElementById("issueCount").innerText = data.data.length

}

// Open Modal

function openModal(issue) {

    document.getElementById("issueModal").classList.remove("hidden")

    document.getElementById("modalTitle").innerText = issue.title

    document.getElementById("modalDescription").innerText = issue.description

    document.getElementById("modalAuthor").innerText = "Author: " + issue.author

    document.getElementById("modalCategory").innerText = "Category: " + issue.category

    document.getElementById("modalPriority").innerText = "Priority: " + issue.priority

}

// Close Modal

function closeModal() {

    document.getElementById("issueModal").classList.add("hidden")

}

// Initial Load

loadIssues()
