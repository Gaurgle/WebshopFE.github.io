// document.addEventListener('DOMContentLoaded', function() {
//     const darkModeToggle = document.getElementById('darkModeToggle');
//
//     // On page load, check if dark mode was previously enabled
//     if (localStorage.getItem('darkMode') === 'true') {
//         document.body.classList.add('dark-mode');
//     }
//
//     if (darkModeToggle) {
//         darkModeToggle.addEventListener('click', function() {
//             document.body.classList.toggle('dark-mode');
//             // Save the state in localStorage
//             if (document.body.classList.contains('dark-mode')) {
//                 localStorage.setItem('darkMode', 'true');
//             } else {
//                 localStorage.setItem('darkMode', 'false');
//             }
//         });
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark-mode');
            if (document.documentElement.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'true');
            } else {
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
});