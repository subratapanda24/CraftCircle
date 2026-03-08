const seatStore = JSON.parse(localStorage.getItem('cc_seats') || '{}');
let selectedSeat = null;
let TOTAL_SEATS = 16;

const workshopImages = {
    "Abstract Acrylic Pour": "Images/arc.jpg",
    "Watercolor Florals": "Images/water.jpg",
    "Galaxy Resin Art": "Images/resin.jpg",
    "Wheel Throwing": "Images/wheel.jpg",
    "Hand-Built Ceramics": "Images/ceramics.jpg",
    "Glaze & Fire": "Images/glaze.jpg",
    "Botanical Soy Candles": "Images/soy.jpg",
    "Pillar Candle Sculpting": "Images/candle.jpg",
    "Granny Square": "Images/granny.jpg",
    "Amigurumi Toy Making": "Images/toy.jpg"
};

const workshopCapacity = {
    "Abstract Acrylic Pour": 8,
    "Watercolor Florals": 14,
    "Galaxy Resin Art": 6,
    "Wheel Throwing": 3,
    "Hand-Built Ceramics": 12,
    "Glaze & Fire": 9,
    "Botanical Soy Candles": 10,
    "Pillar Candle Sculpting": 10,
    "Granny Square": 10,
    "Amigurumi Toy Making": 12
};

const calendarEvents = {
    "2026-03-05": ["Watercolor Florals"],
    "2026-03-07": ["Granny Square"],
    "2026-03-10": ["Hand-Built Ceramics", "Botanical Soy Candles"],
    "2026-03-12": [],
    "2026-03-14": ["Abstract Acrylic Pour"],
    "2026-03-17": ["Wheel Throwing", "Pillar Candle Sculpting"],
    "2026-03-19": ["Galaxy Resin Art"],
    "2026-03-21": ["Amigurumi Toy Making"],
    "2026-03-24": ["Glaze & Fire", "Watercolor Florals"],
    "2026-03-28": ["Abstract Acrylic Pour", "Botanical Soy Candles"]
};

const workshopCategories = {
    "Abstract Acrylic Pour": "painting",
    "Watercolor Florals": "painting",
    "Galaxy Resin Art": "painting",
    "Wheel Throwing": "pottery",
    "Hand-Built Ceramics": "pottery",
    "Glaze & Fire": "pottery",
    "Botanical Soy Candles": "candle",
    "Pillar Candle Sculpting": "candle",
    "Granny Square": "crochet",
    "Amigurumi Toy Making": "crochet"
};

function isDateBlocked(dateStr) {
    const allDates = Object.keys(calendarEvents);
    return allDates.includes(dateStr) && calendarEvents[dateStr].length === 0;
}

function validateDateInput(input) {
    input.addEventListener('change', function () {
        if (isDateBlocked(this.value)) this.value = '';
    });
    input.addEventListener('input', function () {
        if (isDateBlocked(this.value)) this.value = '';
    });
}

function getKey() {
    const w = document.getElementById('workshopSelect').value;
    const d = document.getElementById('sessionDate').value;
    const t = document.getElementById('sessionTime').value;
    if (!w || !d || !t) return null;
    return w.split('|')[0] + '__' + d + '__' + t;
}

function getBooked(k) {
    return seatStore[k] || [];
}

function renderSeats() {
    const key = getKey();
    const map = document.getElementById('seatMap');
    const si = document.getElementById('seatsInfo');

    if (!key) {
        map.innerHTML = '<p style="grid-column:1/-1;font-size:.75rem;color:var(--muted);padding:.35rem">Choose workshop, date & time first.</p>';
        si.style.display = 'none';
        return;
    }

    const w = document.getElementById('workshopSelect').value;
    const workshopName = w.split('|')[0];
    TOTAL_SEATS = workshopCapacity[workshopName] || 16;
    const bk = getBooked(key);

    map.innerHTML = '';

    for (let i = 1; i <= TOTAL_SEATS; i++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'seat-btn';
        b.textContent = 'S' + i;
        b.style.opacity = '0';
        b.style.transform = 'scale(.75)';

        setTimeout(() => {
            b.style.transition = 'opacity .2s, transform .2s, background .1s';
            b.style.opacity = '1';
            b.style.transform = 'scale(1)';
        }, i * 30);

        if (bk.includes(i)) {
            b.classList.add('booked');
            b.disabled = true;
        } else if (selectedSeat === i) {
            b.classList.add('selected');
        } else {
            b.onclick = () => selectSeat(i);
        }
        map.appendChild(b);
    }

    si.style.display = 'flex';
    const remaining = TOTAL_SEATS - bk.length;
    document.getElementById('seatsLeft').textContent = remaining + '/' + TOTAL_SEATS;
    document.getElementById('seatsLeft').style.color = remaining <= 3 ? '#e65100' : 'var(--accent-dark)';
}

function selectSeat(n) {
    selectedSeat = n;
    document.getElementById('summarySeat').textContent = 'Seat ' + n;
    renderSeats();
}

function updateSummary() {
    const w = document.getElementById('workshopSelect').value;
    const d = document.getElementById('sessionDate').value;
    const t = document.getElementById('sessionTime').value;

    if (w) {
        const p = w.split('|');
        document.getElementById('summaryLabel').textContent = p[2].charAt(0).toUpperCase() + p[2].slice(1);
        document.getElementById('summaryTitle').textContent = p[0];
        document.getElementById('summaryMeta').textContent = 'All materials included';
        document.getElementById('summaryPrice').textContent = '₹' + parseInt(p[1]).toLocaleString();
        document.getElementById('summaryTotal').textContent = '₹' + (parseInt(p[1]) + 100).toLocaleString();
        if (workshopImages[p[0]]) document.getElementById('summaryImgEl').src = workshopImages[p[0]];
    }

    if (d) {
        const dt = new Date(d);
        document.getElementById('summaryDate').textContent = dt.toLocaleDateString('en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
    }

    if (t) document.getElementById('summaryTime').textContent = t;

    const key = getKey();
    if (key) {
        const workshopName = w.split('|')[0];
        const capacity = workshopCapacity[workshopName] || 16;
        const bk = getBooked(key);
        const remaining = capacity - bk.length;
        document.getElementById('summarySeatsLeft').textContent = remaining + ' / ' + capacity;
    } else {
        document.getElementById('summarySeatsLeft').textContent = '—';
    }
}

function onWorkshopChange() {
    selectedSeat = null;
    document.getElementById('summarySeat').textContent = '—';
    filterDatesByWorkshop();
    updateSummary();
    renderSeats();
}

function filterDatesByWorkshop() {
    const workshopSelect = document.getElementById('workshopSelect');
    const selectedWorkshop = workshopSelect.value;
    const dateInput = document.getElementById('sessionDate');

    if (!selectedWorkshop) {
        dateInput.removeAttribute('disabled');
        return;
    }

    const workshopName = selectedWorkshop.split('|')[0];
    const availableDates = [];
    for (const date in calendarEvents) {
        if (calendarEvents[date].includes(workshopName)) {
            availableDates.push(date);
        }
    }

    if (availableDates.length > 0) {
        dateInput.removeAttribute('disabled');
        if (!dateInput.value || !availableDates.includes(dateInput.value)) {
            dateInput.value = availableDates[0];
            onDateChange();
        }
    } else {
        dateInput.disabled = true;
        const err = document.getElementById('formError');
        err.textContent = 'This workshop has no available dates. Please choose another workshop.';
        err.style.display = 'block';
    }
}

function filterWorkshopsByDate() {
    const dateInput = document.getElementById('sessionDate').value;
    const workshopSelect = document.getElementById('workshopSelect');
    const options = workshopSelect.querySelectorAll('option');
    let availableWorkshops = null;

    if (dateInput && calendarEvents[dateInput] !== undefined) {
        availableWorkshops = calendarEvents[dateInput];
    }

    options.forEach(option => {
        if (option.value === '') {
            option.style.display = 'block';
            return;
        }
        const workshopName = option.value.split('|')[0];
        if (availableWorkshops === null) {
            option.style.display = 'block';
        } else if (availableWorkshops.length === 0) {
            option.style.display = 'none';
        } else {
            option.style.display = availableWorkshops.includes(workshopName) ? 'block' : 'none';
        }
    });

    if (workshopSelect.value) {
        const selectedOption = workshopSelect.options[workshopSelect.selectedIndex];
        if (selectedOption.style.display === 'none') {
            workshopSelect.value = '';
            document.getElementById('summarySeat').textContent = '—';
        }
    }
}

function onDateChange() {
    selectedSeat = null;
    document.getElementById('summarySeat').textContent = '—';
    filterWorkshopsByDate();
    const dateInput = document.getElementById('sessionDate').value;

    if (dateInput && isDateBlocked(dateInput)) {
        document.getElementById('sessionDate').value = '';
    } else {
        document.getElementById('formError').style.display = 'none';
        document.getElementById('workshopSelect').disabled = false;
    }
    updateSummary();
    renderSeats();
}

function onTimeChange() {
    selectedSeat = null;
    document.getElementById('summarySeat').textContent = '—';
    updateSummary();
    renderSeats();
}

function handleBooking(e) {
    e.preventDefault();
    const err = document.getElementById('formError');
    err.style.display = 'none';

    const f = document.getElementById('firstName').value.trim();
    const em = document.getElementById('email').value.trim();
    const w = document.getElementById('workshopSelect').value;
    const d = document.getElementById('sessionDate').value;
    const t = document.getElementById('sessionTime').value;

    if (!f || !em || !w || !d || !t) {
        err.textContent = 'Please fill all required fields.';
        err.style.display = 'block';
        return;
    }

    if (!selectedSeat) {
        err.textContent = 'Please select a seat.';
        err.style.display = 'block';
        return;
    }

    const key = getKey();
    if (!seatStore[key]) seatStore[key] = [];
    seatStore[key].push(selectedSeat);
    localStorage.setItem('cc_seats', JSON.stringify(seatStore));

    const id = 'CC-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    const workshopName = w.split('|')[0];
    const category = workshopCategories[workshopName] || 'painting';

    document.getElementById('bookingIdDisplay').textContent = id;
    document.getElementById('materialsLink').href = `materials.html?craft=${category}`;
    document.getElementById('bookingConfirm').style.display = 'block';
}

// Init
const dateEl = document.getElementById('sessionDate');
dateEl.min = new Date().toISOString().split('T')[0];
validateDateInput(dateEl);

function loadURLParams() {
    const params = new URLSearchParams(window.location.search);
    const urlDate = params.get('date');
    const urlWorkshop = params.get('workshop');
    const urlTime = params.get('time');

    if (urlDate) {
        document.getElementById('sessionDate').value = urlDate;
        filterWorkshopsByDate();
    }

    if (urlWorkshop) {
        const select = document.getElementById('workshopSelect');
        let workshopName = urlWorkshop;
        workshopName = workshopName.replace(/Crochet Granny Squares/i, 'Granny Square');
        workshopName = workshopName.replace(/Macramé Wall Hanging/i, 'Granny Square');
        for (let option of select.options) {
            if (option.value.startsWith(workshopName + '|')) {
                select.value = option.value;
                break;
            }
        }
    }

    if (urlTime) {
        document.getElementById('sessionTime').value = urlTime;
    }

    if (urlDate || urlWorkshop || urlTime) {
        updateSummary();
        renderSeats();
    }
}

loadURLParams();