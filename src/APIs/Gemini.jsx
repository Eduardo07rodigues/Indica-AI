import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function recomendarFilmes(filmesGostados, genero) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
O usuário escolheu o gênero ${genero}.

Ele gostou destes filmes:
${filmesGostados.join("\n")}

Recomende exatamente 3 filmes semelhantes.

Responda APENAS em JSON assim:

{
  "filmes": ["Filme 1", "Filme 2", "Filme 3"]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Erro Gemini:", error);
    return null;
  }
}
