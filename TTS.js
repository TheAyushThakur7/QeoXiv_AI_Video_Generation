document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('tts-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const text = document.getElementById('text-input').value;

        if (!text.trim()) {
            alert("Please enter some text.");
            return;
        }

        try {
            // Adjust the URL to match your backend API route
            const response = await fetch('https://tts-backend-pghr.onrender.com/generate-tts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }), // Ensure the text is sent in the request body
            });

            if (!response.ok) {
                throw new Error("Failed to convert text to speech. Try again later.");
            }

            // Assuming the backend responds with a file or audio URL
            const data = await response.blob(); // Change to 'blob' if you are receiving an audio file
            const audioUrl = URL.createObjectURL(data);

            const audioOutput = document.getElementById('audio-output');
            audioOutput.src = audioUrl;
            audioOutput.load();
            audioOutput.play();
        } catch (error) {
            console.error(error);
            alert("An error occurred: " + error.message);
        }
    });
});
