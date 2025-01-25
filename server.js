// Toggle Hamburger Menu
function toggleMenu() {
    const menu = document.getElementById('menu');
    console.log("Menu toggled");

    if (menu.style.display === '' || menu.style.display === 'none') {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
}

// Show Prompt
let currentStep = 'boardName'; // Track which step we're in
let boardData = {}; // Temporary object to store board data

function showPrompt(step) {
    currentStep = step;
    const overlay = document.getElementById('overlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalInput = document.getElementById('modalInput');
    const boardDropdown = document.getElementById('boardDropdown');

    if (step === 'boardName') {
        modalTitle.textContent = 'Add Board Name';
        modalInput.placeholder = 'Enter Board Name';
        boardDropdown.style.display = 'block';  // Show dropdown
        modalInput.style.display = 'block';    // Show input field
        modalInput.value = '';  // Clear input field
        boardDropdown.value = '';  // Clear dropdown
    } else if (step === 'serialNumber') {
        modalTitle.textContent = 'Add Serial Number';
        modalInput.placeholder = 'Enter Serial Number';
        modalInput.value = '';  // Clear serial number input when moving to this step
    }

    overlay.style.display = 'flex';
}

// Handle when a dropdown option is selected
function handleDropdownChange() {
    const boardDropdown = document.getElementById('boardDropdown');
    const modalInput = document.getElementById('modalInput');

    if (boardDropdown.value) {
        modalInput.value = boardDropdown.value;  // Update input field with dropdown selection
    }
}

// Handle the input or selection from the dropdown
function handlePrompt() {
    const modalInput = document.getElementById('modalInput').value;
    const boardDropdown = document.getElementById('boardDropdown');
    const overlay = document.getElementById('overlay');

    if (currentStep === 'boardName') {
        if (boardDropdown.value) {
            boardData.name = boardDropdown.value; // Use dropdown value
        } else if (modalInput.trim()) {
            boardData.name = modalInput; // Use typed input value
        } else {
            alert("Please enter or select a board name!");
            return;
        }
        showPrompt('serialNumber'); // Proceed to the next step
    } else if (currentStep === 'serialNumber') {
        if (!modalInput.trim()) {
            alert("Serial number cannot be empty!");
            return;
        }

        boardData.serialNumber = modalInput.trim();
        console.log('Board Data:', boardData); // Log the final board data
        overlay.style.display = 'none'; // Close the modal

        // Display the board name and serial number below the header
        document.getElementById('boardName').textContent = `Board Name: ${boardData.name}`;
        document.getElementById('serialNumber').textContent = `Serial Number: ${boardData.serialNumber}`;

        // Enable "Edit Serial Number" link after adding the board
        enableEditSerialNumber();

        alert(`Board Added:\nName: ${boardData.name}\nSerial: ${boardData.serialNumber}`);

        // Now load the web interface
        loadWebInterface();
    }
}

// Function to enable the "Edit Serial Number" link after board is added
function enableEditSerialNumber() {
    const editSerialNumberLink = document.getElementById('editSerialNumberLink');
    editSerialNumberLink.style.pointerEvents = 'auto';  // Enable the link
    editSerialNumberLink.style.color = 'blue';  // Change link color to indicate it's active
    editSerialNumberLink.style.opacity = '1';  // Ensure the opacity is restored to full visibility

    // Attach the click event handler to open the modal for editing serial number
    editSerialNumberLink.addEventListener('click', function() {
        editSerialNumber();  // Open the modal to edit the serial number
    });
}

// Function to edit the serial number (open the modal again)
function editSerialNumber() {
    const overlay = document.getElementById('overlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalInput = document.getElementById('modalInput');

    // Update the modal title and input field to edit serial number
    modalTitle.textContent = 'Edit Serial Number';
    modalInput.placeholder = 'Enter New Serial Number';
    modalInput.value = boardData.serialNumber;  // Set current serial number in input field

    // Show the modal again
    overlay.style.display = 'flex';

    // Focus on the input to make editing easier
    modalInput.focus();
}

// Function to handle the modal submit logic for editing serial number
function handleEditSerialNumber() {
    const modalInput = document.getElementById('modalInput').value;
    const overlay = document.getElementById('overlay');

    // Update the board data with the new serial number
    boardData.serialNumber = modalInput;
    console.log('Updated Board Data:', boardData);

    // Close the modal and update the display
    overlay.style.display = 'none';
    document.getElementById('serialNumber').textContent = `Serial Number: ${boardData.serialNumber}`;
    alert(`Serial Number Updated: ${boardData.serialNumber}`);
}

// Function to reset the page to its initial state
function resetPage() {
    // Reset board data
    boardData = { name: '', serialNumber: '' };

    // Clear board information display
    document.getElementById('boardName').textContent = '';
    document.getElementById('serialNumber').textContent = '';

    // Reset the dropdown menu
    const boardDropdown = document.getElementById('boardDropdown');
    boardDropdown.value = ''; // Clear selection

    // Clear modal input
    document.getElementById('modalInput').value = '';

    // Reset the overlay and modal
    document.getElementById('overlay').style.display = 'none';

    // Disable "Edit Serial Number" link
    const editSerialNumberLink = document.getElementById('editSerialNumberLink');
    editSerialNumberLink.style.pointerEvents = 'none';
    editSerialNumberLink.style.opacity = 0.5;
    editSerialNumberLink.style.color = 'grey';

    // Clear web interface container
    const webInterfaceContainer = document.getElementById('webInterfaceContainer');
    webInterfaceContainer.innerHTML = '';

    // Optionally reset other sections, such as CV display
    const cvDisplay = document.getElementById('cvDisplay');
    cvDisplay.style.display = 'none';
    document.getElementById('cvContent').textContent = '';

    // Log a message or show an alert for confirmation
    console.log('Application has been reset to the initial state.');
    alert('Application has been reset!');
}


// Function to update the footer with current date and time
function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();
    
    // Format the date and time
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    
    // Display the date and time in the footer
    dateTimeElement.textContent = `Current Date: ${date} | Current Time: ${time}`;
}

// Ensure that the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded');
    setInterval(updateDateTime, 1000); // Update every second
});
