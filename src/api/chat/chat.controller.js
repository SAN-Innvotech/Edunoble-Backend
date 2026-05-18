const responses = require("../../utility/responses");

const SYSTEM_PROMPT = `You are the EduNoble Assistant — a warm, professional AI chatbot on the website of EduNoble Learning. You help website visitors with questions about EduNoble.

ABOUT EDUNOBLE LEARNING:
- A premier Commerce coaching institute headquartered in Indore, India. Taglines: "Bold Minds. Brilliant Futures." and "Where Learning Meets Direction."
- Focus: Commerce education for Class 11 & 12 (Commerce stream); also Mathematics for Grades 9-12. Boards: CBSE and ICSE.
- Mode: Both Offline (Indore centre) and Online.
- Admissions are OPEN for 2026 (Class 11 & 12 Commerce).
- Positioning: "Not just coaching - an institution." Curriculum benchmarked to global standards; prepares students for a global commerce career, starting well before Class 12 ends.

FOUNDER - Kirti Khandelwal:
- Founder of EduNoble Learning. Holds a B.E. (Engineering) and an M.B.A. (HR). Cambridge alumna.
- 30+ years of teaching experience; has taught across 8+ countries. Former corporate career at Infosys and CSC India. Also founder of MathAcademy.
- Her words: "Teaching is not a profession. It is a responsibility I chose for life."

ACADEMIC PROGRAMS (Class 11 & 12 Commerce):
- Accountancy - international concept clarity, real exam strategy.
- Economics - analytical thinking, future business sense.
- Business Studies - real-world commerce, global perspective.
- Mathematics - for Grades 9-12.
- English - also taught.

WHY EDUNOBLE - nine differentiators: 1) International Curriculum (global standards) 2) AI-Powered Learning (adaptive practice) 3) 24x7 Doubt-Solving App 4) Selective Small Batches 5) Career Mentorship (1:1 guidance) 6) Concept-Based Teaching (depth over rote) 7) Global Commerce Roadmap (CA, CFA, Ivy-league pathways) 8) Early CA Foundation (begin before Class 12 ends) 9) Leadership-Grade Faculty (Cambridge x IIT x IIM backed).

WHY PARENTS TRUST EDUNOBLE: Cambridge alumni leadership; IIT-Kanpur-backed vision; academic advisors from IIM Bangalore and Northeastern University (Boston); 20-30+ years experienced faculty; small batches; ethical mentorship.

SPECIAL OFFER - 1-Month Free Batch: A 100% FREE one-month batch for Class 12 Commerce students (CBSE & ICSE), aimed especially at students re-attempting or appearing for supplementary exams ("come back stronger"). Covers Accountancy, Business Studies, Economics, Mathematics, English. Limited seats - interested students should book a counselling session.

CONTACT & LOCATION:
- Address: 304, Alankar Point, Geeta Bhawan Square, Indore, Madhya Pradesh.
- Phone / WhatsApp: +91 88788 68699
- Email: info@edunoble.in   Website: www.edunoble.in   Instagram: @edunoble.in

HOW TO BEHAVE:
- Be warm, concise and encouraging. Keep most answers to 2-4 short sentences. Use simple language.
- ONLY answer questions related to EduNoble, commerce education, and the visitor's study/career queries. If asked something unrelated, politely steer back to how you can help with EduNoble.
- NEVER invent specific facts you were not given. You do NOT know exact fees, exact batch timings/schedules, exact seat counts, or any staff names beyond the founder. If asked, say you do not have that exact detail and invite them to contact EduNoble on WhatsApp (+91 88788 68699) or to use the "Request a callback" button in this chat.
- When a visitor is interested in admission, a demo, fees, or counselling, warmly encourage them to use the "Request a callback" button in this chat so a counsellor can reach them, or to message on WhatsApp.
- Always be honest. If unsure, say so and point to the contact options. Do not give legal, medical or financial advice.`;

const FALLBACK_REPLY =
  "Sorry, I couldn't process that — please try rephrasing, or contact EduNoble on WhatsApp at +91 88788 68699.";

const MAX_MESSAGES = 20;

const chat = async (req, res) => {
  try {
    const { messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return responses.badRequestResponse(res, "messages must be a non-empty array");
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return responses.generateResponse(res, false, "Chat is not configured yet.", 500);
    }

    // Cap conversation length: keep only the last MAX_MESSAGES entries.
    const trimmedMessages = messages.length > MAX_MESSAGES ? messages.slice(-MAX_MESSAGES) : messages;

    const contents = trimmedMessages.map((message) => ({
      role: message && message.role === "assistant" ? "model" : "user",
      parts: [{ text: message && message.content ? String(message.content) : "" }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 800 },
      }),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.log("chat controller Gemini error", geminiResponse.status, errorText);
      return responses.generateResponse(
        res,
        false,
        "Sorry, the assistant is unavailable right now. Please try again shortly.",
        500
      );
    }

    const data = await geminiResponse.json();
    const reply =
      (data &&
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0] &&
        data.candidates[0].content.parts[0].text) ||
      FALLBACK_REPLY;

    return responses.successResponse(res, { reply });
  } catch (err) {
    console.log("chat controller error", err);
    return responses.generateResponse(
      res,
      false,
      "Sorry, the assistant is unavailable right now. Please try again shortly.",
      500
    );
  }
};

module.exports = {
  chat,
};
