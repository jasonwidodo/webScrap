const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateAIContent() {
    const genAI = new GoogleGenerativeAI("AIzaSyDySMtsRD5ufJD_8JbDGGrM40QaoDh-XcM");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "please open ebay website";

    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

generateAIContent();