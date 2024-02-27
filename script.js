// Select elements
const heroImage = document.querySelector('.hero img');

// Add fade-in animation on load
window.addEventListener('load', () => {
    heroImage.classList.add('fade-in');
});

const month = 5;
const year = 2025;
const daysInMonth = new Date(year, month, 0).getDate();


const dateGrid = document.querySelector('.date-grid');

// find the weekday of the first day of the month
const firstDayOfMonth = new Date(`${year}-${month}-01`).getDay();
// add empty date elements to the date grid
console.log("First day of the month: ", firstDayOfMonth);
for (let i = 0; i < firstDayOfMonth - 1; i++) {
    const emptyDateElement = document.createElement('time');
    dateGrid.appendChild(emptyDateElement);
}

// Loop through each day in the month

for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${year}-${month}-${day.toString().padStart(2, '0')}`; // Create formatted date string

    // Create a time element
    const dateElement = document.createElement('time');
    dateElement.setAttribute('datetime', dateString);
    dateElement.textContent = day;

    // Add id to dateElement if day is 20
    if (day === 20) {
        dateElement.id = 'special-day';
    }

    // Append the element to the date-grid
    dateGrid.appendChild(dateElement);
}