import axios from 'axios';

const handlesubmit = async (text, setResponse) => {
    const apikey = "YOUR-API-KEY"
  const userId = localStorage.getItem('userId') || 'guest123'; 
  const prompt = `
  Sen bir kişisel gelişim ve duygu koçu yapay zekâsısın. Kullanıcının yazdığı günlük metni analiz ederek ona aşağıdaki üç başlıkta cevap ver:
  
  1. 🎯 **Ruh Hali Analizi** (En fazla 80 token): Duygusal durumunu kısa ve öz bir şekilde değerlendir.
  2. 🧭 **Tavsiye** (En fazla 100 token): Bu ruh haline uygun, uygulanabilir bir tavsiye ver.
  3. 🚀 **Motivasyon Cümlesi** (En fazla 30 token): İlham verici ve kısa bir cümleyle kapanışı yap.
  
  İşte kullanıcının günlüğü:
  "${text}"
  `;
  

  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: text }
        ],
        max_tokens: 200,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apikey}`,
        },
      }
    );

    const choices = res?.data?.choices;
    if (!choices || choices.length === 0 || !choices[0].message) {
      console.error("Beklenen veri yapısı alınamadı:", res.data);
      return;
    }

    const responseText = choices[0].message.content.trim();
    const [moodAnalysis, advice, motivation] = responseText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const finalMotivation = motivation || "Motivasyon yok, ancak unutma, her zaman ileriye adım atmak en önemli adımdır!";


    await axios.post('http://localhost:7701/api/save', {
      userId,
      text,
      response: responseText,
      moodAnalysis,
      advice,
      motivation: finalMotivation,
    });

 
    setResponse({
      moodAnalysis,
      advice,
      motivation: finalMotivation,
    });

  } catch (error) {
    console.error('API çağrısı başarısız:', error);
  }
};

export default handlesubmit;
