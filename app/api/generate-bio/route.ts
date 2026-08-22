// app/api/generate-bio/route.ts
import { NextResponse } from "next/server";

function cleanBioText(rawText: string): string {
  let cleaned = rawText;

  // Extract text starting from the actual greeting
  const matchGreeting = cleaned.match(/(?:¡?Hola!?|Soy)\s+[\s\S]+/i);
  if (matchGreeting) {
    cleaned = matchGreeting[0];
  }

  // Clean remaining formatting artifacts or labels
  cleaned = cleaned
    .replace(/^[\*\-\#\>\s\d\.]+/gm, "")
    .replace(/(?:S1|S2|S3|Frase 1|Frase 2|Frase 3|Draft|Resultado):/gi, "")
    .replace(/\n+/g, " ")
    .replace(/"/g, "")
    .trim();

  return cleaned;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("❌ GEMINI_API_KEY missing in environment variables.");
      return NextResponse.json(
        { error: "Clave GEMINI_API_KEY no encontrada en .env.local." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { fullName, languages, hobbies } = body;

    const firstName = fullName ? fullName.split(" ")[0] : "Agente Viven";

    const cleanLangs =
      Array.isArray(languages) && languages.length > 0
        ? languages.map((l: string) => l.trim()).join(", ")
        : "varios idiomas";

    const cleanHobbies =
      Array.isArray(hobbies) && hobbies.length > 0
        ? hobbies.map((h: string) => h.trim()).join(", ")
        : "disfrutar de la vida";

    const systemInstructionText = `Eres un redactor experto para la inmobiliaria Viven. Tu única tarea es escribir una biografía breve, cálida, fresca y humana en español para los agentes de la plataforma.

REGLAS OBLIGATORIAS:
1. Devuelve ÚNICAMENTE el texto final de la biografía. Está estrictamente prohibido incluir etiquetas, reflexiones, explicaciones, borradores o guiones.
2. Escribe en primera persona ("¡Hola! Soy...").
3. Une de forma natural la presentación, las aficiones, la ayuda para encontrar su hogar ideal y los idiomas que habla en 2 o 3 frases fluidas.
4. Jamás imprimas texto con corchetes ni palabras de plantilla.

EJEMPLO 1
Entrada:
Nombre: Laura
Idiomas: Español, Inglés, Italiano
Aficiones: Yoga, cocina, senderismo

Salida esperada:
¡Hola! Soy Laura. Cuando no estoy disfrutando del yoga, la cocina o haciendo senderismo, me encanta ayudarte a encontrar tu hogar ideal hablando en español, inglés o italiano.

EJEMPLO 2
Entrada:
Nombre: Carlos
Idiomas: Español, Francés
Aficiones: Fotografía, ciclismo, viajes

Salida esperada:
¡Hola! Soy Carlos. Cuando no estoy capturando fotos en mis viajes o saliendo en bicicleta, me apasiona ayudarte a encontrar tu nuevo hogar en español o francés.`;

    const userPrompt = `Nombre: ${firstName}
Idiomas: ${cleanLangs}
Aficiones: ${cleanHobbies}`;

    // Updated active model identifiers
    const preferredModels = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-2.0-flash-lite",
    ];

    let rawBio = "";
    let isQuotaError = false;

    for (const modelName of preferredModels) {
      const generateUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      const genRes = await fetch(generateUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstructionText }],
          },
          contents: [
            {
              parts: [{ text: userPrompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 400,
          },
        }),
      });

      if (genRes.ok) {
        const genData = await genRes.json();
        rawBio = genData.candidates?.[0]?.content?.parts?.[0]?.text || "";
        if (rawBio) {
          console.log(`✅ Bio generated successfully using ${modelName}`);
          break;
        }
      } else {
        const status = genRes.status;
        const errorText = await genRes.text();
        console.error(`⚠️ Model ${modelName} failed [${status}]:`, errorText);

        if (status === 429) {
          isQuotaError = true;
        }
      }
    }

    if (!rawBio) {
      const errorMessage = isQuotaError
        ? "Has superado el límite de peticiones gratuitas de Gemini. Por favor, espera 45 segundos y vuelve a intentarlo."
        : "No se pudo generar la biografía con los modelos disponibles.";

      return NextResponse.json({ error: errorMessage }, { status: isQuotaError ? 429 : 500 });
    }

    const finalBio = cleanBioText(rawBio);
    return NextResponse.json({ bio: finalBio });
  } catch (err: any) {
    console.error("❌ Error en /api/generate-bio:", err);
    return NextResponse.json(
      { error: "Error al comunicarse con la API de Gemini." },
      { status: 500 }
    );
  }
}