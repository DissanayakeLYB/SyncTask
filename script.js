// DOM Elements
const applicationForm = document.getElementById('application-form');
const companyNameInput = document.getElementById('company-name');
const jobTitleInput = document.getElementById('job-title');
const statusSelect = document.getElementById('status');
const notesTextarea = document.getElementById('notes');
const applicationsContainer = document.getElementById('applications-container');
const filterStatusSelect = document.getElementById('filter-status');

// Initialize applications array (or load from localStorage)
let applications = JSON.parse(localStorage.getItem('applications')) || [];

// Render applications
function renderApplications(filterStatus = 'all') {
  applicationsContainer.innerHTML = '';

  const filteredApplications = applications.filter((app) => {
    return filterStatus === 'all' || app.status === filterStatus;
  });

  if (filteredApplications.length === 0) {
    applicationsContainer.innerHTML = '<p class="empty-message">No job applications found.</p>';
    return;
  }

  filteredApplications.forEach((app, index) => {
    const applicationCard = document.createElement('div');
    applicationCard.classList.add('application-card');

    applicationCard.innerHTML = `
      <h3>${app.companyName}</h3>
      <p><strong>Job Title:</strong> ${app.jobTitle}</p>
      <p><strong>Status:</strong> <span class="status ${app.status}">${app.status}</span></p>
      <p><strong>Notes:</strong> ${app.notes}</p>
      <button onclick="deleteApplication(${index})">Delete</button>
    `;

    applicationsContainer.appendChild(applicationCard);
  });
}

// Add a new application
applicationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newApplication = {
    companyName: companyNameInput.value.trim(),
    jobTitle: jobTitleInput.value.trim(),
    status: statusSelect.value,
    notes: notesTextarea.value.trim(),
  };

  if (newApplication.companyName && newApplication.jobTitle) {
    applications.push(newApplication);
    localStorage.setItem('applications', JSON.stringify(applications));
    renderApplications();
    applicationForm.reset();
  } else {
    alert('Please fill out the company name and job title.');
  }
});

// Delete an application
function deleteApplication(index) {
  applications.splice(index, 1);
  localStorage.setItem('applications', JSON.stringify(applications));
  renderApplications(filterStatusSelect.value);
}

// Filter applications by status
filterStatusSelect.addEventListener('change', () => {
  renderApplications(filterStatusSelect.value);
});

// Initial render
renderApplications();