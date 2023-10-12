var isSearchInProgress = false;
var allJobs = [];

function renderJobs() {
    var resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    if (allJobs.length === 0) {
        resultsList.textContent = 'No se encontraron resultados';
    } else {
        allJobs.forEach(function(job) {
            var jobElement = document.createElement('div');
            jobElement.className = 'result-card';

            var titleElement = document.createElement('h2');
            titleElement.textContent = job.title;
            jobElement.appendChild(titleElement);

            var descriptionElement = document.createElement('p');
            descriptionElement.textContent = job.description;
            jobElement.appendChild(descriptionElement);
            
            var info = document.createElement('div');
            info.className = "job-extras"
            jobElement.appendChild(info);

            var dateElement = document.createElement('div');
            dateElement.textContent = job.date;
            info.appendChild(dateElement);

            var modalityElement = document.createElement('div');
            modalityElement.textContent = job.modality;
            info.appendChild(modalityElement);

            var schemeElement = document.createElement('div');
            schemeElement.textContent = job.scheme;
            info.appendChild(schemeElement);

            resultsList.appendChild(jobElement);
        });
    }
}

document.getElementById('search-button').addEventListener('click', function() {
    if (isSearchInProgress) {
        return;
    }

    isSearchInProgress = true;

    var keyword = document.getElementById('keyword-input').value;
    var sortOrder = document.getElementById('sort-order').value;
    var workScheme = document.getElementById('work-scheme').value;
    var jobType = document.getElementById('job-type').value;

    var url = 'http://localhost:4567/jobs/search';
    var params = [];

    if (keyword) params.push('keyword=' + encodeURIComponent(keyword));
    if (sortOrder) params.push('sortOrder=' + encodeURIComponent(sortOrder));
    if (workScheme) params.push('workScheme=' + encodeURIComponent(workScheme));
    if (jobType) params.push('jobType=' + encodeURIComponent(jobType));

    if (params.length > 0) url += '?' + params.join('&');

    fetch(url, { timeout: 120000 })
        .then(function(response) {
            console.log(response)
            if (!response.ok) {
                throw new Error('Error al realizar la búsqueda');
            }
            return response.json();
        })
        .then(function(data) {
            allJobs = data;
            renderJobs();
        })
        .catch(function(error) {
            console.error('Error:', error);
            alert('Error al realizar la búsqueda');
        })
        .finally(function() {
            isSearchInProgress = false;
        });
});
