import app from "./app";

// get port number from the .env file
const PORT: string | 3000 = process.env.PORT || 3000;

// imported app listens for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
