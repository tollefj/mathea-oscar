// Select elements
const heroImage = document.querySelector('.hero img');

// Add fade-in animation on load
window.addEventListener('load', () => {
    heroImage.classList.add('fade-in');
});

// const month = 5;
// const year = 2025;
// const daysInMonth = new Date(year, month, 0).getDate();


// const dateGrid = document.querySelector('.date-grid');

// // find the weekday of the first day of the month
// const firstDayOfMonth = new Date(`${year}-${month}-01`).getDay();
// // add empty date elements to the date grid
// console.log("First day of the month: ", firstDayOfMonth);
// for (let i = 0; i < firstDayOfMonth - 1; i++) {
//     const emptyDateElement = document.createElement('time');
//     dateGrid.appendChild(emptyDateElement);
// }

// // Loop through each day in the month

// for (let day = 1; day <= daysInMonth; day++) {
//     const dateString = `${year}-${month}-${day.toString().padStart(2, '0')}`; // Create formatted date string

//     // Create a time element
//     const dateElement = document.createElement('time');
//     dateElement.setAttribute('datetime', dateString);
//     dateElement.textContent = day;

//     // Add id to dateElement if day is 20
//     if (day === 20) {
//         dateElement.id = 'special-day';
//     }

//     // Append the element to the date-grid
//     dateGrid.appendChild(dateElement);
// }


// change to only use red, pink and red-ish + white colors
const colors = ["#f3d3b4", "#d2b08e", "#E0C2A5", "#E8D9C2", "#A88E7A", "#684536"]
const SVG_NS = 'http://www.w3.org/2000/svg';
const SVG_XLINK = "http://www.w3.org/1999/xlink";

let heartsRy = []

let hearts = document.querySelector('#hearts');

function useTheHeart(n) {
    let use = document.createElementNS(SVG_NS, 'use');
    use.n = n;
    use.setAttributeNS(SVG_XLINK, 'xlink:href', '#heart');
    use.setAttributeNS(null, 'transform', `scale(${use.n})`);
    use.setAttributeNS(null, 'fill', colors[n % colors.length]);
    use.setAttributeNS(null, 'x', -69);
    use.setAttributeNS(null, 'y', -69);
    use.setAttributeNS(null, 'width', 138);
    use.setAttributeNS(null, 'height', 138);

    heartsRy.push(use)
    hearts.appendChild(use);
}

for (let n = 18; n >= 0; n--) { useTheHeart(n) }

function Frame() {
    window.requestAnimationFrame(Frame);
    for (let i = 0; i < heartsRy.length; i++) {
        if (heartsRy[i].n < 18) {
            heartsRy[i].n += .01
        } else {
            heartsRy[i].n = 0;
            hearts.appendChild(heartsRy[i])
        }
        heartsRy[i].setAttributeNS(null, 'transform', `scale(${heartsRy[i].n})`);
    }
}

if (document.querySelector('#hearts')) {
    Frame()
}

