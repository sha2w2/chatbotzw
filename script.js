// Global variable to store knowledge base (7 Intro to JS.pdf, Slide 8)
let knowledgeBase = {};
let generalResponses = {};

// Load the JSON data when the window loads (Event: onload)
window.onload = function() {
    fetch('chatbotdata.json')
        .then(response => response.json())
        .then(data => {
            knowledgeBase = data.faq_categories;
            generalResponses = data.general_responses;
            console.log("Chatbot data loaded successfully");
        })
        .catch(error => console.error('Error loading data:', error));
};

// Function to show/hide the chat window (Custom Function: Slide 23)
function toggleChat() {
    var chatContainer = document.getElementById("chatbot");
    // Logic: If/Else statement (Slide 15)
    if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
        chatContainer.style.display = "flex";
    } else {
        chatContainer.style.display = "none";
    }
}

// Handle "Enter" key in input box (Events: Slide 54)
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Function to process the user message
function sendMessage() {
    var inputField = document.getElementById("user-input");
    var userText = inputField.value.trim();

    if (userText === "") return;

    // Add User Message to DOM
    addMessageToChat(userText, 'user-message');
    inputField.value = ""; // Clear input

    // Simulate thinking delay
    setTimeout(function() {
        var botResponse = getBotResponse(userText);
        addMessageToChat(botResponse, 'bot-message');
    }, 500);
}

// Logic to find answer in JSON data (The LLM Simulation)
function getBotResponse(input) {
    input = input.toLowerCase();
    
    // Iterate through all categories in the JSON (Loops: Slide 17)
    for (const category in knowledgeBase) {
        const topics = knowledgeBase[category];
        
        // Iterate through each topic within a category
        for (const key in topics) {
            const item = topics[key];
            // Check if any keyword matches the user input
            const isMatch = item.keywords.some(keyword => input.includes(keyword));
            
            if (isMatch) {
                return item.answer;
            }
        }
    }

    // Return the required fallback message if no match found
    // A more advanced LLM would dynamically suggest relevant questions,
    // but for our rule-based bot, we pick a fixed one as per instructions.
    return generalResponses.unknown;
}

// Helper function to manipulate DOM (Document Object Model)
function addMessageToChat(text, className) {
    var chatMessages = document.getElementById("chatMessages");
    var messageDiv = document.createElement("div");
    messageDiv.className = className;
    messageDiv.innerHTML = "<p>" + text + "</p>";
    chatMessages.appendChild(messageDiv);
    
    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}