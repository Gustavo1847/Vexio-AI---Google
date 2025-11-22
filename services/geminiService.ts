import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDraftMessage = async (prompt: string, tone: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const fullPrompt = `
      Você é um assistente de comunicação profissional para uma plataforma omnichannel (WhatsApp, Instagram, Facebook).
      Crie uma mensagem curta, engajadora e formatada corretamente para o seguinte objetivo: "${prompt}".
      
      Tom de voz: ${tone}.
      
      Se for WhatsApp, use formatação markdown como *negrito* ou _itálico_ se apropriado.
      Se for Instagram, pode usar emojis.
      Retorne apenas o texto da mensagem.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
    });

    return response.text || "Não foi possível gerar a mensagem.";
  } catch (error) {
    console.error("Erro ao gerar mensagem com Gemini:", error);
    return "Erro ao conectar com a IA. Verifique sua chave de API.";
  }
};

export const analyzeSentiment = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analise o sentimento da seguinte mensagem e responda com uma única palavra (Positivo, Negativo, ou Neutro): "${text}"`,
    });
    return response.text?.trim() || "Neutro";
  } catch (error) {
    return "Neutro";
  }
};