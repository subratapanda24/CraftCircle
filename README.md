# CraftCircle — DIY Workshop Portal 🎨

CraftCircle is a web-based platform designed for discovering and booking creative workshops such as pottery, painting, candle making, and crochet.

The platform allows users to browse available workshops, select sessions, choose seats, and complete bookings through an interactive interface. The application is built as a fully client-side system using browser storage to manage booking data.

---

## Features

- Browse workshop listings by category
- Workshop booking system with session selection
- Interactive seat selection interface
- Calendar view showing upcoming workshop sessions
- Materials and preparation guidelines for each workshop
- Responsive design for desktop and mobile screens
- Form validation using JavaScript
- Booking data stored using browser localStorage

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- CSS Grid and Flexbox
- Google Fonts
- Browser LocalStorage API

---

## Application Structure

CraftCircle is implemented as a multi-page web application.

Pages included in the project:

- **Home Page** — Introduction and featured workshops
- **Workshops Page** — Browse available workshops
- **Booking Page** — Register and select workshop sessions
- **Calendar Page** — View upcoming sessions
- **Materials Page** — Preparation guidelines and materials information

---

## Project Structure

```
CraftCircle/
│
├── index.html
├── workshops.html
├── booking.html
├── calendar.html
├── materials.html
│
├── css/
│   ├── shared.css
│   ├── index.css
│   ├── workshops.css
│   ├── booking.css
│   └── materials.css
│
├── js/
│   ├── main.js
│   ├── workshops.js
│   ├── booking.js
│   ├── calendar.js
│   └── materials.js
│
├── Images/
│
├── documentation/
│   ├── CraftCircle_Report.pdf
│   └── CraftCircle_Presentation.pptx
│
├── .gitignore
│
└── README.md
```
---

## How to Run ▶️

1. Clone or download the repository.
2. Open the project folder.
3. Open `index.html` in your web browser.

No server or backend setup is required.

---

## System Workflow

1. User visits the **Home Page**.
2. User browses available workshops.
3. User selects a workshop and opens the **Booking Page**.
4. User enters personal details and selects a session.
5. User chooses an available seat.
6. Booking data is stored using **localStorage**.
7. A booking confirmation message is displayed.

---

## Learning Outcomes 📚

This project demonstrates:

- Responsive web design principles
- Interactive web interfaces using JavaScript
- Client-side data storage with localStorage
- Form validation and user input handling
- Structuring a multi-page web application

---

## Future Improvements

Possible enhancements include:

- Backend database integration
- User authentication system
- Online payment integration
- Admin dashboard for managing workshops
- Real-time seat availability updates

---

## Author

Subrata Panda  
B.Tech Computer Science  
School of Future Tech  
ITM Skills University