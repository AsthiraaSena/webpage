const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const langBtn = document.getElementById("langBtn");

let lang = "en";

menuBtn.onclick = () => {
  menu.classList.toggle("hidden");
};

const content = {
 home:{
  en:{
    title:"Welcome",
    body:"Asthiraa Astrology provides guidance for life, health, education and profession.",
    guru:[
      "✔ Traditional & Scientific Astrology",
      "✔ Medical Astrology Specialist",
      "✔ KP & Classical Astrology Methods",
      "✔ Teaching with Practical Examples",
      "✔ Years of Experience in Astrology"
    ]
  },
  ta:{
    title:"குருவே துணை",
    body:"வாழ்க்கை, மருத்துவம், கல்வி மற்றும் தொழிலுக்கான ஜோதிட வழிகாட்டல்.",
    guru:[
      "✔ பாரம்பரிய மற்றும் அறிவியல் ஜோதிடம்",
      "✔ மருத்துவ ஜோதிட நிபுணர்",
      "✔ கே.பி & பாரம்பரிய ஜோதிட முறைகள்",
      "✔ நடைமுறை எடுத்துக்காட்டுகளுடன் கற்பித்தல்",
      "✔ பல ஆண்டுகளான ஜோதிட அனுபவம்"
    ]
  }
},

  about:{
    en:{
      title:"About Us",
      body:"Asthiraa Astrology follows traditional astrology combined with experience and research."
    },
    ta:{
      title:"எங்களை பற்றி",
      body:"அனுபவம் மற்றும் ஆய்வின் அடிப்படையில் பாரம்பரிய ஜோதிட வழிகாட்டலை வழங்குகிறோம்."
    }
  },
  services:{
    en:{
      title:"Our Services",
      body:"Horoscope analysis, medical astrology, education & career guidance."
    },
    ta:{
      title:"எங்கள் சேவைகள்",
      body:"ஜாதக ஆய்வு, மருத்துவ ஜோதிடம், கல்வி மற்றும் தொழில் ஆலோசனை."
    }
  },
  classes:{
    en:{
      title:"Class Details",
      body:"Online and offline astrology classes with practical training."
    },
    ta:{
      title:"வகுப்பு விவரங்கள்",
      body:"ஆன்லைன் மற்றும் நேரடி ஜோதிட வகுப்புகள் நடைமுறை பயிற்சியுடன்."
    }
  },
  contact:{
    en:{
      title:"Contact Us",
      body:"Phone: 9787-92-1438 | Email: info@asthiraaastrology.in"
    },
    ta:{
      title:"தொடர்பு கொள்ள",
      body:"தொலைபேசி: 9787-92-1438 | மின்னஞ்சல்: info@asthiraaastrology.in"
    }
  },
  blogs:{
    en:{
      title:"Blogs & Info",
      body:"Astrology articles, tips and updates will be published here."
    },
    ta:{
      title:"பதிவுகள் & தகவல்",
      body:"ஜோதிட கட்டுரைகள் மற்றும் தகவல்கள் இங்கே வெளியிடப்படும்."
    }
  }
};

/* LANGUAGE TOGGLE */
langBtn.onclick = () => {
  lang = lang === "en" ? "ta" : "en";
  langBtn.innerText = lang === "en" ? "தமிழ்" : "English";

  const page = document.body.dataset.page;

   // Title & body
  document.getElementById("pageTitle").innerText = content[page][lang].title;
  document.getElementById("pageText").innerText = content[page][lang].body;

    // Guru points (only on home page)
  if(page === "home"){
    document.getElementById("g1").innerText = content.home[lang].guru[0];
    document.getElementById("g2").innerText = content.home[lang].guru[1];
    document.getElementById("g3").innerText = content.home[lang].guru[2];
    document.getElementById("g4").innerText = content.home[lang].guru[3];
    document.getElementById("g5").innerText = content.home[lang].guru[4];
  }

};

