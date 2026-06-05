import React, { useState, useEffect } from "react";
import regeneratedImage from "./assets/images/regenerated_image_1779980547471.jpg";
import textLogoPng from "./assets/images/regenerated_image_1780341386975.png";
import quemSomosImg1 from "./assets/images/regenerated_image_1780105520084.jpg";
import quemSomosImg2 from "./assets/images/regenerated_image_1780105523833.jpg";
import campeonatoFutebolImg from "./assets/images/regenerated_image_1780107752749.jpg";
import meiaMalucaImg from "./assets/images/regenerated_image_1780105791924.jpg";
import mascaraDormirImg from "./assets/images/regenerated_image_1780413280557.jpg";
import jardinagemImg from "./assets/images/regenerated_image_1780413981963.jpg";
import pulseiraImg from "./assets/images/regenerated_image_1780110566658.jpg";
import cacaTesouroImg from "./assets/images/regenerated_image_1780326086840.jpg";
import festaDasCoresImg from "./assets/images/regenerated_image_1780326090170.jpg";
import massinhaImg from "./assets/images/regenerated_image_1780326615716.jpg";
import aventuraAoArLivreImg from "./assets/images/regenerated_image_1780328158108.jpg";
import tortaNaCaraImg from "./assets/images/regenerated_image_1780334474691.jpg";
import piscinaBolinhasImg from "./assets/images/regenerated_image_1780340767775.jpg";
import galeriaCupcakesImg from "./assets/images/regenerated_image_1780338838925.jpg";
import bucketTieDyeImg from "./assets/images/regenerated_image_1780336502004.png";
import portaRetratoImg from "./assets/images/regenerated_image_1780337776013.png";
import cupcakeImg from "./assets/images/regenerated_image_1780338131925.jpg";
import diaDoDesafioVideo from "./assets/images/dia_do_desafio.mp4";

import mascotLogoPng from "./assets/images/regenerated_image_1780341167335.png";
import { 
  Sparkles, 
  Star, 
  Smile, 
  ShieldCheck, 
  Award, 
  Clock, 
  Heart, 
  Phone, 
  ArrowRight, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  Plus, 
  Instagram, 
  MapPin, 
  Calendar, 
  ThumbsUp,
  HelpCircle,
  PartyPopper,
  CheckCircle2,
  Brush,
  Utensils,
  Lightbulb,
  Scissors,
  AlertTriangle,
  Play,
  Upload,
  Link
} from "lucide-react";

// --- IndexedDB Utils to persist custom gallery videos locally ---
const saveVideoToDB = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("videoDB", 1);
    request.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("videos")) {
        db.createObjectStore("videos");
      }
    };
    request.onsuccess = (e: any) => {
      const db = e.target.result;
      const transaction = db.transaction("videos", "readwrite");
      const store = transaction.objectStore("videos");
      try {
        const putRequest = store.put(file, "gallery_video");
        putRequest.onsuccess = () => {
          resolve(URL.createObjectURL(file));
        };
        putRequest.onerror = () => reject("Error storing file");
      } catch (err) {
        reject(err);
      }
    };
    request.onerror = () => reject("Error opening db");
  });
};

const loadVideoFromDB = (): Promise<File | null> => {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open("videoDB", 1);
      request.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("videos")) {
          db.createObjectStore("videos");
        }
      };
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("videos")) {
          resolve(null);
          return;
        }
        const transaction = db.transaction("videos", "readonly");
        const store = transaction.objectStore("videos");
        const getRequest = store.get("gallery_video");
        getRequest.onsuccess = () => {
          resolve(getRequest.result || null);
        };
        getRequest.onerror = () => resolve(null);
      };
      request.onerror = () => resolve(null);
    } catch (e) {
      resolve(null);
    }
  });
};

const removeVideoFromDB = (): Promise<void> => {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open("videoDB", 1);
      request.onsuccess = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("videos")) {
          resolve();
          return;
        }
        const transaction = db.transaction("videos", "readwrite");
        const store = transaction.objectStore("videos");
        const deleteRequest = store.delete("gallery_video");
        deleteRequest.onsuccess = () => resolve();
        deleteRequest.onerror = () => resolve();
      };
      request.onerror = () => resolve();
    } catch (e) {
      resolve();
    }
  });
};

const getYoutubeId = (url: string) => {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : "";
};

// 2D Flat Minimalist Lion Paw Print trail components
const PawPrintSVG = ({ className = "text-neutral-300" }: { className?: string }) => (
  <svg 
    viewBox="0 0 40 40" 
    className={`${className} fill-current select-none pointer-events-none`} 
    width="100%" 
    height="100%"
  >
    {/* Central Pad - bean shape */}
    <path d="M 20,20 C 13.5,20 11.5,23.5 11.5,28 C 11.5,32.5 15.5,35 20,35 C 24.5,35 28.5,32.5 28.5,28 C 28.5,23.5 26.5,20 20,20 Z" />
    {/* 4 Toes */}
    <circle cx="8" cy="16" r="4" />
    <circle cx="16" cy="9" r="4.5" />
    <circle cx="24" cy="9" r="4.5" />
    <circle cx="32" cy="16" r="4" />
  </svg>
);

const PawPrintTrailDiagonal = ({ className = "" }: { className?: string }) => (
  <div className={`absolute z-0 pointer-events-none select-none ${className}`}>
    <div className="relative w-80 h-[500px]">
      <div className="absolute top-[0%] left-[15%] w-12 h-12 -rotate-[35deg] text-neutral-300/35"><PawPrintSVG /></div>
      <div className="absolute top-[12%] left-[35%] w-12 h-12 -rotate-[15deg] text-neutral-300/30"><PawPrintSVG /></div>
      <div className="absolute top-[25%] left-[22%] w-12 h-12 -rotate-[45deg] text-neutral-300/25"><PawPrintSVG /></div>
      <div className="absolute top-[38%] left-[48%] w-12 h-12 -rotate-[10deg] text-neutral-300/35"><PawPrintSVG /></div>
      <div className="absolute top-[50%] left-[34%] w-12 h-12 -rotate-[25deg] text-neutral-300/30"><PawPrintSVG /></div>
      <div className="absolute top-[62%] left-[60%] w-12 h-12 -rotate-[5deg] text-neutral-300/25"><PawPrintSVG /></div>
      <div className="absolute top-[75%] left-[45%] w-12 h-12 -rotate-[15deg] text-neutral-300/35"><PawPrintSVG /></div>
      <div className="absolute top-[88%] left-[72%] w-12 h-12 -rotate-[5deg] text-neutral-300/30"><PawPrintSVG /></div>
    </div>
  </div>
);

const PawPrintTrailHorizontal = ({ className = "" }: { className?: string }) => (
  <div className={`absolute z-0 pointer-events-none select-none ${className}`}>
    <div className="relative w-[700px] h-28">
      <div className="absolute left-[0%] top-[40%] w-12 h-12 rotate-[70deg] text-neutral-300/35"><PawPrintSVG /></div>
      <div className="absolute left-[12%] top-[20%] w-12 h-12 rotate-[90deg] text-neutral-300/30"><PawPrintSVG /></div>
      <div className="absolute left-[25%] top-[55%] w-12 h-12 rotate-[80deg] text-neutral-300/25"><PawPrintSVG /></div>
      <div className="absolute left-[38%] top-[30%] w-12 h-12 rotate-[105deg] text-neutral-300/35"><PawPrintSVG /></div>
      <div className="absolute left-[50%] top-[60%] w-12 h-12 rotate-[95deg] text-neutral-300/30"><PawPrintSVG /></div>
      <div className="absolute left-[62%] top-[40%] w-12 h-12 rotate-[115deg] text-neutral-300/25"><PawPrintSVG /></div>
      <div className="absolute left-[75%] top-[65%] w-12 h-12 rotate-[90deg] text-neutral-300/35"><PawPrintSVG /></div>
      <div className="absolute left-[88%] top-[45%] w-12 h-12 rotate-[100deg] text-neutral-300/30"><PawPrintSVG /></div>
    </div>
  </div>
);

const PawPrintTrailSinuous = ({ className = "" }: { className?: string }) => (
  <div className={`absolute z-0 pointer-events-none select-none ${className}`}>
    <div className="relative w-48 h-[600px]">
      <div className="absolute top-[4%] left-[10%] w-14 h-14 -rotate-[10deg] text-neutral-300/35"><PawPrintSVG /></div>
      <div className="absolute top-[16%] left-[45%] w-14 h-14 rotate-[20deg] text-neutral-300/30"><PawPrintSVG /></div>
      <div className="absolute top-[28%] left-[15%] w-14 h-14 -rotate-[15deg] text-neutral-300/25"><PawPrintSVG /></div>
      <div className="absolute top-[40%] left-[55%] w-14 h-14 rotate-[10deg] text-neutral-300/35"><PawPrintSVG /></div>
      <div className="absolute top-[52%] left-[20%] w-14 h-14 -rotate-[25deg] text-neutral-300/30"><PawPrintSVG /></div>
      <div className="absolute top-[64%] left-[60%] w-14 h-14 rotate-[5deg] text-neutral-300/25"><PawPrintSVG /></div>
      <div className="absolute top-[76%] left-[25%] w-14 h-14 -rotate-[15deg] text-neutral-300/35"><PawPrintSVG /></div>
      <div className="absolute top-[88%] left-[65%] w-14 h-14 rotate-[15deg] text-neutral-300/30"><PawPrintSVG /></div>
    </div>
  </div>
);

// Types
interface Activity {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  safety: string;
  bestFor: string;
  emoji: string;
}

interface Workshop {
  id: string;
  title: string;
  icon: any;
  description: string;
  color: string;
  image: string;
}

export default function App() {
  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Persistent Custom Video State
  const [customVideoUrl, setCustomVideoUrl] = useState<string>("");
  const [customVideoType, setCustomVideoType] = useState<"direct" | "youtube">("direct");
  const [videoBlobUrl, setVideoBlobUrl] = useState<string>("");
  // Uploader tabs: 'file' or 'link'
  const [uploadTab, setUploadTab] = useState<"file" | "link">("file");
  const [customVideoUrlInput, setCustomVideoUrlInput] = useState<string>("");

  useEffect(() => {
    // Try to load any previously saved video from IndexedDB on startup
    loadVideoFromDB().then((file) => {
      if (file) {
        setVideoBlobUrl(URL.createObjectURL(file));
      }
    });

    // Load any custom link from localStorage
    const savedUrl = localStorage.getItem("alfa_custom_video_url");
    if (savedUrl) {
      setCustomVideoUrl(savedUrl);
      setCustomVideoUrlInput(savedUrl);
      if (savedUrl.includes("youtube.com") || savedUrl.includes("youtu.be")) {
        setCustomVideoType("youtube");
      } else {
        setCustomVideoType("direct");
      }
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        showToast("Processando e salvando vídeo no navegador...");
        const blobUrl = await saveVideoToDB(file);
        setVideoBlobUrl(blobUrl);
        // Clear any stored link so the file takes priority
        setCustomVideoUrl("");
        localStorage.removeItem("alfa_custom_video_url");
        showToast("Vídeo salvo com sucesso!");
        
        // If lightbox is open, sync active URL
        if (activeLightboxImage && activeLightboxImage.type === "video") {
          setActiveLightboxImage({ 
            url: blobUrl, 
            alt: activeLightboxImage.alt, 
            type: "video" 
          });
        }
      } catch (err) {
        showToast("Erro ao salvar o vídeo.");
      }
    }
  };

  const handleSaveLink = () => {
    if (customVideoUrlInput.trim()) {
      const isYoutube = customVideoUrlInput.includes("youtube.com") || customVideoUrlInput.includes("youtu.be");
      setCustomVideoUrl(customVideoUrlInput);
      setCustomVideoType(isYoutube ? "youtube" : "direct");
      localStorage.setItem("alfa_custom_video_url", customVideoUrlInput);
      
      // Clear file blob URL to give link priority
      if (videoBlobUrl) {
        URL.revokeObjectURL(videoBlobUrl);
        setVideoBlobUrl("");
        removeVideoFromDB();
      }
      
      showToast("Link de vídeo salvo!");

      // If lightbox is open, sync active URL
      if (activeLightboxImage && activeLightboxImage.type === "video") {
        setActiveLightboxImage({ 
          url: customVideoUrlInput, 
          alt: activeLightboxImage.alt, 
          type: "video" 
        });
      }
    }
  };

  const handleResetVideo = async () => {
    if (videoBlobUrl) {
      URL.revokeObjectURL(videoBlobUrl);
      setVideoBlobUrl("");
    }
    await removeVideoFromDB();
    setCustomVideoUrl("");
    setCustomVideoUrlInput("");
    localStorage.removeItem("alfa_custom_video_url");
    showToast("Vídeo restaurado!");

    if (activeLightboxImage && activeLightboxImage.type === "video") {
      setActiveLightboxImage({ 
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", 
        alt: activeLightboxImage.alt, 
        type: "video" 
      });
    }
  };

  const currentVideoResolved = videoBlobUrl || customVideoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";
  const currentVideoResolvedType = customVideoUrl && (customVideoUrl.includes("youtube.com") || customVideoUrl.includes("youtu.be")) ? "youtube" : "direct";
  
  // Selected activity for detail modal
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Selected workshop for detail modal
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  
  // Bento gallery lightbox state
  const [activeLightboxImage, setActiveLightboxImage] = useState<{ url: string; alt: string; type?: "image" | "video" } | null>(null);

  // FAQ accordion open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Quote formulation state
  const [parentName, setParentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [city, setCity] = useState("Taubaté");
  const [kidsCount, setKidsCount] = useState("Até 20 crianças");
  const [duration, setDuration] = useState("3 Horas");
  const [ageGroup, setAgeGroup] = useState("6 a 10 anos");
  const [selectedActivities, setSelectedActivities] = useState<string[]>(["Skibum", "Torta na Cara"]);

  // Active section state for scroll spy
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "quem-somos", "atividades", "oficinas", "galeria", "calculadora", "faq"];
      const scrollPosition = window.scrollY + 180; // Offset window scroll

      // Check if scroll is close to top, default to inicio
      if (window.scrollY < 100) {
        setActiveSection("inicio");
        return;
      }

      for (const sectionId of sections) {
        if (sectionId === "inicio") continue;
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Notification for interactive selections
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleActivityInQuote = (title: string) => {
    if (selectedActivities.includes(title)) {
      setSelectedActivities(selectedActivities.filter(item => item !== title));
      showToast(`Removido: ${title}`);
    } else {
      setSelectedActivities([...selectedActivities, title]);
      showToast(`Adicionado: ${title}`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Pre-configured lists
  const activities: Activity[] = [
    {
      id: "skibum",
      title: "Skibum",
      description: "A atividade mais refrescante e divertida com água, lona e muito sabão!",
      detailedDescription: "Uma lona gigante de alta resistência é estendida no gramado, coberta com água corrente e sabão neutro hipoalergênico. As crianças deslizam com segurança sob a supervisão constante de nossos recreadores graduados. Garantia de adrenalina e risadas infinitas!",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFLWKli4OvJK_mb8aRKSyxDbKmiOGz7VrjO7-zYnBzo3LnafN7ZeWaqEqJZa2c26LHXdm4dVTY1hE59brSYjcZgtNxdrkJqNnKUF0fy0DFtgzSt-XsicpZK4v9jzZ45bAqvmnYb3iLycm_G6Yk0iyNmdnO4FzNiaUeBHe6YebbFFw2ebx_p3ziGJlT80i9ABaej2g2VzSYnW514iD2kHRll8G4OGB-yUHIVJ2b00z28zC_tQqNZKgFvEHRuxycUFQOSdotB3zfMZeZ",
      safety: "Uso de sabão neutro infantil que não arde os olhos; supervisor exclusivo nas duas pontas da lona.",
      bestFor: "Dias quentes e ensolarados, chácaras, clubes ou quintal amplo.",
      emoji: "💦"
    },
    {
      id: "torta-na-cara",
      title: "Torta na Cara",
      description: "O clássico jogo de perguntas e respostas que termina em muita risada e chantilly!",
      detailedDescription: "Um quiz super animado e personalizado com perguntas de conhecimentos gerais adaptadas à idade dos participantes. Quem for mais rápido aperta o botão! Quem errar... leva uma deliciosa (e higiênica) tortizada de chantilly leve no rosto!",
      image: regeneratedImage,
      safety: "Chantilly hipoalergênico de base vegetal, toalhas umedecidas exclusivas para limpeza imediata.",
      bestFor: "Crianças de todas as idades que adoram brincadeiras competitivas saudáveis.",
      emoji: "🍰"
    },
    {
      id: "festa-das-cores",
      title: "Festa das Cores",
      description: "Uma explosão mágica de pó colorido biodegradável que encanta pais e filhos!",
      detailedDescription: "Inspirada no festival Holi, distribuímos saquinhos de pó colorido biodegradável e atóxico. Sob um comando musical divertido, as crianças lançam as cores para o alto, criando uma nuvem vibrante que colore camisetas e sorrisos.",
      image: festaDasCoresImg,
      safety: "Pó 100% natural, biodegradável, lavável na máquina e atóxico feito à base de amido de milho.",
      bestFor: "Locais externos e gramados. Cria momentos perfeitos para fotos cinematográficas.",
      emoji: "🎨"
    },
    {
      id: "campeonato-futebol",
      title: "Campeonato de Futebol",
      description: "Um torneio de futebol super organizado, com coletes, medalhas e narração divertida!",
      detailedDescription: "Transformamos o espaço em uma verdadeira arena esportiva. Fornecemos coletes oficiais da Alfa Kids, cones para marcação, cronômetro e apito. Nossos recreadores narram o jogo como locutores profissionais, garantindo uma atmosfera de Copa do Mundo!",
      image: campeonatoFutebolImg,
      safety: "Adaptação das regras para evitar choques bruscos; foco total no espírito de equipe e respeito mútuo.",
      bestFor: "Quadras esportivas, gramados ou condomínios.",
      emoji: "⚽"
    },
    {
      id: "caca-tesouro",
      title: "Caça ao Tesouro",
      description: "Uma aventura imersiva com pistas enigmáticas, desafios físicos e um prêmio final fantasiado!",
      detailedDescription: "Desenvolvemos mapas de pistas personalizados de acordo com o espaço da sua festa. As crianças decifram charadas lúdicas, encontram pistas escondidas e passam por divertidos testes de habilidade para encontrar o grande baú dourado cheio de surpresas!",
      image: cacaTesouroImg,
      safety: "Varredura prévia de todo o local por recreadores para identificação de quinas vivas ou áreas proibidas.",
      bestFor: "Espaços amplos ou internos. Excelente para desenvolver lógica e trabalho em grupo.",
      emoji: "🗺️"
    }
  ];

  const workshops: Workshop[] = [
    { 
      id: "w-pulseiras", 
      title: "Pulseiras de Miçanga", 
      icon: Scissors, 
      description: "Variedade de cores e pingentes para criar memórias estilosas.", 
      color: "bg-orange-50 border-orange-200 text-recreation-orange",
      image: pulseiraImg
    },
    { 
      id: "w-scrapbook", 
      title: "Scrapbook Criativo", 
      icon: Lightbulb, 
      description: "Livro de recortes, adesivos e desenhos para guardar fotos do evento.", 
      color: "bg-blue-50 border-blue-200 text-cosmic-blue",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqJkvKXAJBEHpbsf8nUllDLbObgq9055oBb4USOaS3ph-UfFFGU2BIkz4Vkg1Ag_pinhJVmVskkB5i8mnDb4CZc8oYutq5ZgwP7ESnnMYDOMI0X_MCZ0D7Wf9_usjPWFcVj0RbMjJP9DdwKShfIXf7kZLuGvS9Q9fdv8-pASTNWAKl3xKOuPughrDQcpODFy6Tm4w2WCjqd7mCxn0faYorvGtLsVVgXeElXBp0teKYY7c2FWMfTA_KGFXbQ3GvzkeULqYWr2fmBq7t"
    },
    { 
      id: "w-mascara", 
      title: "Máscara de Dormir", 
      icon: Heart, 
      description: "Personalização com tintas de tecido e apliques fofos.", 
      color: "bg-yellow-50 border-yellow-250 text-amber-700",
      image: mascaraDormirImg
    },
    { 
      id: "w-massinha", 
      title: "Massinha de modelar", 
      icon: Sparkles, 
      description: "As crianças exploram a criatividade com massinhas de modelar caseiras", 
      color: "bg-red-50 border-red-200 text-alert-red",
      image: massinhaImg
    },
    { 
      id: "w-bucket", 
      title: "Meu Primeiro Bucket", 
      icon: Brush, 
      description: "Customização descolada com as cores que eles mais amam.", 
      color: "bg-purple-50 border-purple-200 text-purple-700",
      image: bucketTieDyeImg
    },
    { 
      id: "w-meia", 
      title: "Meia Maluca", 
      icon: Scissors, 
      description: "Decoração 3D de meias com botões, olhos divertidos e pompons.", 
      color: "bg-teal-50 border-teal-200 text-teal-800",
      image: meiaMalucaImg
    },
    { 
      id: "w-retrato", 
      title: "Porta-retrato Personalizado", 
      icon: Award, 
      description: "Eles pintam e decoram para emoldurar a melhor foto do aniversário.", 
      color: "bg-indigo-50 border-indigo-200 text-indigo-700",
      image: portaRetratoImg
    },
    { 
      id: "w-cupcake", 
      title: "Confeitaria de Cupcakes", 
      icon: Utensils, 
      description: "Muita diversão com coberturas de brigadeiro, chantilly e confeitos.", 
      color: "bg-pink-50 border-pink-200 text-pink-600",
      image: cupcakeImg
    },
    { 
      id: "w-jardinagem", 
      title: "Oficina de Jardinagem", 
      icon: Smile, 
      description: "Eles plantam mudas de flores e decoram seus próprios vasinhos de cerâmica.", 
      color: "bg-emerald-50 border-emerald-200 text-emerald-700",
      image: jardinagemImg
    }
  ];

  const galleryImages = [
    {
      url: piscinaBolinhasImg,
      alt: "Recreação Tradicional: Muita energia e diversão na nossa incrível piscina de bolinhas!",
      span: "md:col-span-2 md:row-span-2",
      type: "image"
    },
    {
      url: aventuraAoArLivreImg,
      alt: "Aventura ao ar livre: caça ao tesouro com pistas e mistérios no bosque",
      span: "md:col-span-1 md:row-span-1",
      type: "image"
    },
    {
      url: tortaNaCaraImg,
      alt: "Torta na cara hilária: diversão extrema garantida nas festas familiares",
      span: "md:col-span-1 md:row-span-1",
      type: "image"
    },
    {
      url: galeriaCupcakesImg,
      alt: "Leve sua lembrança criada nas Oficinas Criativas pra Casa!!",
      span: "md:col-span-1 md:row-span-1",
      type: "image"
    },
    {
      url: currentVideoResolved,
      alt: "Dia do Desafio: Atividade de recreação e dança contagiante com a equipe da Alfa Kids!",
      span: "md:col-span-1 md:row-span-1",
      type: "video"
    }
  ];

  const FAQs = [
    {
      q: "E se chover no dia do evento?",
      a: "Nenhum pingo de chuva estraga a comemoração! Temos um cronograma de contingência preparado recreações e dinâmicas que podem ser plenamente executados em garagens, salões de condomínio ou interiores avarandados."
    },
    {
      q: "Como é garantido a segurança no Skibum?",
      a: "No Skibum, além da lona macia, delimitamos áreas de desaceleração. Mantemos sempre um recreador fixo no topo do escorregador liberando as partidas com espaçamento seguro, e outro recreador atento a trajetória e auxiliando a criança a levantar. Usamos sabão líquido neutro certificado."
    },
    {
      q: "Quais materiais estão inclusos nas Oficinas Criativas?",
      a: "Absolutamente tudo! Fornecemos aventais impermeáveis para precaver as roupas, mesas, banquinhos confortáveis, além de todos os insumos e materiais utilizados na oficina. Ao final do evento, cada criança leva para casa o próprio artesanato fabricado."
    },
    {
      q: "Atendem em quais regiões?",
      a: "Estamos localizados em Taubaté, porém também conseguimos realizar incríveis festas em São José dos Campos, Jacareí, Caçapava, Pinda e cidades adjacentes do Litoral Norte e Serra da Mantiqueira."
    }
  ];

  // WhatsApp Link Builder (CRO conversion focal point)
  const generateWhatsAppLink = () => {
    const defaultNumber = "5512978120035"; // Format (12) 97812-0035
    const greetingText = `Olá Tio Gelado! Gostaria de simular um orçamento para a Alfa Kids.
    
📝 *DADOS DA RECREAÇÃO:*
👤 *Responsável:* ${parentName || "Não informado"}
📞 *WhatsApp:* ${phoneNumber || "Não informado"}
📅 *Sugestão de Data:* ${eventDate || "A definir"}
📍 *Cidade do Evento:* ${city}

👶 *Grupo de Idade:* ${ageGroup}
🎈 *Quantidade:* ${kidsCount}
⏳ *Duração Selecionada:* ${duration}

🎮 *Atividades de Preferência:*
${selectedActivities.map(act => `✓ ${act}`).join("\n")}

Estou no aguardo para conversar sobre as melhores opções para nosso grande dia! ✨🦁`;

    return `https://api.whatsapp.com/send?phone=${defaultNumber}&text=${encodeURIComponent(greetingText)}`;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-breath-white text-structural-black selection:bg-energy-yellow selection:text-cosmic-blue relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-cosmic-blue text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-blue-400 transition-all duration-300 ease-out transform hover:scale-[1.03]">
          <PartyPopper className="w-5 h-5 text-energy-yellow" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Floating Call to Action WhatsApp Button */}
      <a 
        href={generateWhatsAppLink()}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-recreation-orange hover:bg-orange-600 text-white rounded-full p-4 md:p-5 shadow-[0_4px_20px_rgba(255,102,0,0.35)] hover:shadow-[0_8px_30px_rgba(255,102,0,0.45)] transition-all duration-300 hover:scale-[1.03] flex items-center justify-center group active:scale-98"
        title="Falar com o Tio Gelado"
      >
        <span className="absolute right-16 bg-structural-black text-white px-3 py-1.5 rounded-2xl font-label-md text-xs tracking-wide shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-neutral-850">
          WhatsApp Online
        </span>
        <Phone className="w-6 h-6 md:w-7 md:h-7 transition-transform group-hover:rotate-12 duration-300" />
      </a>

      {/* Header & Nav */}
      <header className="sticky top-0 z-40 w-full bg-white border-b-4 border-energy-yellow shadow-[0_4px_25px_rgba(0,85,164,0.06)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
          
          {/* Logo with Mascot */}
          <a href="#" className="flex items-center gap-2 group transition-transform active:scale-95">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqJkvKXAJBEHpbsf8nUllDLbObgq9055oBb4USOaS3ph-UfFFGU2BIkz4Vkg1Ag_pinhJVmVskkB5i8mnDb4CZc8oYutq5ZgwP7ESnnMYDOMI0X_MCZ0D7Wf9_usjPWFcVj0RbMjJP9DdwKShfIXf7kZLuGvS9Q9fdv8-pASTNWAKl3xKOuPughrDQcpODFy6Tm4w2WCjqd7mCxn0faYorvGtLsVVgXeElXBp0teKYY7c2FWMfTA_KGFXbQ3GvzkeULqYWr2fmBq7t" 
              alt="Alfa Kids Logo" 
              className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>



          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-neutral-600">
            <a 
              href="#" 
              onClick={() => setActiveSection("inicio")}
              className={`hover:text-recreation-orange relative py-1 transition-colors ${
                activeSection === "inicio" 
                  ? "text-cosmic-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-recreation-orange after:rounded" 
                  : "text-neutral-600 hover:text-cosmic-blue"
              }`}
            >
              Início
            </a>
            <a 
              href="#quem-somos" 
              onClick={() => setActiveSection("quem-somos")}
              className={`hover:text-recreation-orange relative py-1 transition-colors ${
                activeSection === "quem-somos" 
                  ? "text-cosmic-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-recreation-orange after:rounded" 
                  : "text-neutral-600 hover:text-cosmic-blue"
              }`}
            >
              Quem Somos
            </a>
            <a 
              href="#atividades" 
              onClick={() => setActiveSection("atividades")}
              className={`hover:text-recreation-orange relative py-1 transition-colors ${
                activeSection === "atividades" 
                  ? "text-cosmic-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-recreation-orange after:rounded" 
                  : "text-neutral-600 hover:text-cosmic-blue"
              }`}
            >
              Oficinas Lúdicas
            </a>
            <a 
              href="#oficinas" 
              onClick={() => setActiveSection("oficinas")}
              className={`hover:text-recreation-orange relative py-1 transition-colors ${
                activeSection === "oficinas" 
                  ? "text-cosmic-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-recreation-orange after:rounded" 
                  : "text-neutral-600 hover:text-cosmic-blue"
              }`}
            >
              Oficinas Criativas
            </a>
            <a 
              href="#galeria" 
              onClick={() => setActiveSection("galeria")}
              className={`hover:text-recreation-orange relative py-1 transition-colors ${
                activeSection === "galeria" 
                  ? "text-cosmic-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-recreation-orange after:rounded" 
                  : "text-neutral-600 hover:text-cosmic-blue"
              }`}
            >
              Galeria
            </a>
            <a 
              href="#calculadora" 
              onClick={() => setActiveSection("calculadora")}
              className={`hover:text-amber-800 transition-colors bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full text-amber-800 text-xs flex items-center gap-1 relative ${
                activeSection === "calculadora"
                  ? "ring-2 ring-recreation-orange"
                  : ""
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Simulador
            </a>
            <a 
              href="#faq" 
              onClick={() => setActiveSection("faq")}
              className={`hover:text-recreation-orange relative py-1 transition-colors ${
                activeSection === "faq" 
                  ? "text-cosmic-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-recreation-orange after:rounded" 
                  : "text-neutral-600 hover:text-cosmic-blue"
              }`}
            >
              Perguntas
            </a>
          </nav>

          {/* Lead Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="#calculadora" 
              className="bg-energy-yellow hover:bg-yellow-400 text-cosmic-blue border-b-4 border-amber-600 font-display text-base tracking-wide px-6 py-2.5 rounded-full shadow-md transition-all active:translate-y-0.5 active:border-b-2 hover:-translate-y-0.5"
            >
              Simular Recreação
            </a>
          </div>

          {/* Burger button for mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden p-2 text-cosmic-blue hover:bg-neutral-100 rounded-2xl transition-colors focus:outline-none"
            aria-label="Abrir menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Slide-Over */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-80 max-w-md bg-white border-l-4 border-cosmic-blue p-6 flex flex-col justify-between shadow-2xl relative rounded-l-3xl">
              
              <div>
                <div className="flex items-center justify-between border-b pb-5">
                  <span className="font-display text-xl text-cosmic-blue">Menu Alfa Kids</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-neutral-500 hover:text-neutral-800 rounded-full hover:bg-neutral-100"
                    aria-label="Fechar menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex flex-col gap-4 mt-8">
                  <a 
                    href="#" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg font-bold text-neutral-700 hover:text-cosmic-blue p-2 rounded-2xl hover:bg-neutral-50"
                  >
                    <span className="w-2 h-2 rounded-full bg-energy-yellow"></span> Início
                  </a>
                  <a 
                    href="#quem-somos" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg font-bold text-neutral-700 hover:text-cosmic-blue p-2 rounded-2xl hover:bg-neutral-50"
                  >
                    <span className="w-2 h-2 rounded-full bg-recreation-orange"></span> Quem Somos
                  </a>
                  <a 
                    href="#atividades" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg font-bold text-neutral-700 hover:text-cosmic-blue p-2 rounded-2xl hover:bg-neutral-50"
                  >
                    <span className="w-2 h-2 rounded-full bg-alert-red"></span> Oficinas Lúdicas
                  </a>
                  <a 
                    href="#oficinas" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg font-bold text-neutral-700 hover:text-cosmic-blue p-2 rounded-2xl hover:bg-neutral-50"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Oficinas Criativas
                  </a>
                  <a 
                    href="#galeria" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg font-bold text-neutral-700 hover:text-cosmic-blue p-2 rounded-2xl hover:bg-neutral-50"
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> Galeria
                  </a>
                  <a 
                    href="#calculadora" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg font-bold text-amber-800 bg-amber-50 p-2.5 rounded-2xl hover:scale-98 transition-transform"
                  >
                    🎨 Simulador de Orçamento
                  </a>
                  <a 
                    href="#faq" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg font-bold text-neutral-700 hover:text-cosmic-blue p-2 rounded-2xl hover:bg-neutral-50"
                  >
                    <span className="w-2 h-2 rounded-full bg-neutral-400"></span> Dúvidas Frequentes
                  </a>
                </nav>
              </div>

              <div className="border-t pt-6 bg-neutral-50 -mx-6 -mb-6 p-6">
                <p className="text-xs text-neutral-500 text-center mb-4 font-semibold">Recreação com segurança estruturada</p>
                <a 
                  href={generateWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full bg-recreation-orange text-white block text-center font-display text-base tracking-wide py-3 rounded-full shadow-[0_4px_10px_rgba(255,102,0,0.3)] hover:opacity-90 transition-opacity active:scale-95"
                >
                  Falar no WhatsApp
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-amber-50/50 to-white pt-10 pb-20 md:py-24 px-4 md:px-8">
          
          {/* Ambient vector shapes for children vibe */}
          <div className="absolute top-10 left-10 w-28 h-28 bg-[#ffdf91] rounded-full opacity-35 blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-44 h-44 bg-[#93c3ff] rounded-full opacity-35 blur-3xl animate-float-delayed" />
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left side: Copywriter Content */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-cosmic-blue text-white px-4 py-1.5 rounded-full shadow-md text-xs font-bold tracking-wide">
                <Star className="w-4 h-4 text-energy-yellow fill-energy-yellow" />
                <span>Em busca de se tornar a maior Agência Recreativa do Vale do Paraíba</span>
              </div>

              {/* Main Catchy H1 Hook */}
              <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl text-cosmic-blue leading-tight tracking-wide">
                Transformamos cada evento em um{" "}
                <span className="text-recreation-orange underline decoration-energy-yellow decoration-solid decoration-wavy underline-offset-8 uppercase">MOMENTO INESQUECÍVEL!</span>
              </h1>

              {/* Persuading subtitle to ease tension */}
              <p className="text-neutral-600 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
                Recreação infantil que une a <b className="text-cosmic-blue font-bold">energia contagiante</b> e <b className="text-energy-yellow font-bold">aprendizado lúdico</b> com a <b className="text-recreation-orange font-bold">garantia de segurança</b> que os pais tanto procuram. Atividades comandadas por profissionais especializados e experientes. Venha se divertir com a Alfa!
              </p>

              {/* Bullet-proof credibility points above grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg pt-2 text-left">
                {[
                  "Aniversários e Casamentos",
                  "Eventos em Escolas",
                  "Eventos Corporativos"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/80 backdrop-blur p-2.5 rounded-2xl shadow-sm border border-neutral-100">
                    <div className="bg-emerald-100 p-1 rounded-full shrink-0">
                      <Check className="w-4 h-4 text-emerald-600 font-bold" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* Fast interactive CTA with conversion focus */}
              <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto pt-4">
                <a 
                  href="#calculadora" 
                  className="w-full sm:w-auto bg-recreation-orange text-white font-display text-lg tracking-wider px-8 py-4.5 rounded-full shadow-[0_4px_15px_rgba(255,102,0,0.35)] hover:shadow-[0_8px_25px_rgba(255,102,0,0.45)] transition-all duration-300 hover:scale-[1.02] active:scale-98 text-center cursor-pointer"
                >
                  Fazer Simulação de Orçamento
                </a>
                
                <a 
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cosmic-blue hover:text-recreation-orange font-bold text-sm tracking-wide py-2.5 flex items-center justify-center gap-1.5 transition-colors"
                >
                  Falar no WhatsApp Comercial
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Compromisso com Excelência e Segurança */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-neutral-200/60 w-full justify-center lg:justify-start">
                <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-100 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left text-xs text-neutral-500">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold uppercase tracking-wider text-[10px]">
                    Atendimento Exclusivo
                  </div>
                  <p className="mt-0.5">Realizamos nosso serviço de forma totalmente personalizada de acordo com seu evento!</p>
                </div>
              </div>

            </div>

            {/* Right side: Mascot Image looking beautiful & encouraging direction click! */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              
              {/* Outer circle layout */}
              <div className="absolute w-[80%] aspect-square bg-[#0055a4]/8 rounded-full blur-2xl transform scale-110 pointer-events-none" />
              
              {/* Animated soft shape under mascot */}
              <div className="absolute w-[85%] aspect-square bg-[#fff1bb] rounded-[45%_55%_60%_40%/50%_60%_40%_50%] opacity-85 z-0 animate-float" />
              
              {/* Actual Mascot of Alfa Kids pointing to the left buttons */}
              <div className="relative z-10 max-w-sm md:max-w-md">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBspHZS05qOcqnL_LbhYWQdsuD47oRaKfKlgSRsIWRFr5720_HcCD9-_w6RrmxSivZW8NlwMbMJcbBwbRMff0aPlG5VlaBA0_0SUfRJ70dLJ3jRqIesVD7HcfHtAOhfrzJULklxq-2NkC-qdZFKOJReyagPD9WG6fdMO7mh65HopSFa6NFho3ZOeLrt9BkYFPhKIcFLMGbFF0ZpVIF4Wua9BoZs3HQ1fnKi56s1oCPz6TMlxdXkjIh944qKrlRR3Wumgmtn0O48GkPe" 
                  alt="Leão da Alfa Kids sorrindo e apontando para o botão" 
                  className="w-full h-auto object-contain [filter:drop-shadow(0_12px_24px_rgba(0,0,0,0.15))] transition-transform hover:scale-[1.02] duration-300"
                />



              </div>

            </div>

          </div>

          {/* Curved Wave shape at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-10 w-full overflow-hidden leading-none z-10">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,0 Q150,90 300,45 T600,60 T900,45 T1200,0 L1200,120 L0,120 Z"></path>
            </svg>
          </div>

        </section>

        {/* SECTION "QUEM SOMOS" / "TIO GELADO" */}
        <section id="quem-somos" className="py-20 bg-white px-4 md:px-8 relative overflow-hidden">
          <PawPrintTrailSinuous className="left-2 md:left-4 top-20 opacity-50 select-none pointer-events-none" />
          <PawPrintTrailDiagonal className="right-2 md:right-4 bottom-10 opacity-50 select-none pointer-events-none hidden sm:block" />
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center relative z-10">
            
            {/* Visual Mosaic Box (Left) */}
            <div className="hidden lg:flex w-full lg:w-1/2 relative justify-center">
              
              {/* Background paint blotch */}
              <div className="absolute inset-x-0 w-full h-[120%] bg-blue-50/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -top-10 pointer-events-none z-0 rotate-12" />
              
              <div className="relative z-10 grid grid-cols-2 gap-4 max-w-lg w-full">
                
                <div className="space-y-4">
                  <img 
                    src={quemSomosImg1} 
                    alt="Recreador experiente animando as crianças com bolhas gigantes" 
                    className="w-full h-56 object-cover rounded-[2rem] rounded-tl-[4rem] border-4 border-white shadow-lg rotate-[-2deg] transition-transform hover:rotate-0 duration-300"
                  />
                  <div className="bg-recreation-orange text-white p-5 rounded-[2.5rem] rounded-bl-2xl shadow-md text-center">
                    <p className="font-display text-3xl">100X</p>
                    <p className="text-xs font-bold uppercase tracking-wider">MAIS GELADO</p>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <div className="bg-cosmic-blue text-white p-5 rounded-[2.5rem] rounded-tr-2xl shadow-md text-center">
                    <p className="font-display text-4xl">100%</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider">De Sorrisos Seguros</p>
                  </div>
                  <img 
                    src={quemSomosImg2} 
                    alt="Pintura facial delicada e profissional" 
                    className="w-full h-56 object-cover rounded-[2rem] rounded-br-[4rem] border-4 border-white shadow-lg rotate-[2deg] transition-transform hover:rotate-0 duration-300"
                  />
                </div>

              </div>

            </div>

            {/* Brand Storytelling Copywriting Box (Right) */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-6 text-center lg:text-left">
              
              <div className="inline-flex self-center lg:self-start items-center gap-1.5 bg-amber-100 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold">
                <Smile className="w-3.5 h-3.5 fill-current" />
                <span>O Propósito Alfa Kids</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl text-cosmic-blue leading-tight">
                Atrás de muita energia, existe um <br />
                <span className="text-recreation-orange">planejamento seguro!</span>
              </h2>

              <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
                Fundada pelo carismático <b className="text-cosmic-blue font-bold">Tio Gelado (Enzo)</b>, a Alfa Kids surgiu para resolver a maior preocupação dos pais: Como garantir que os filhos se divirtam com brincadeiras, desafios e dinâmicas de modo supervisionado e com incentivo pedagógico?
              </p>

              <p className="text-neutral-600 text-base leading-relaxed">
                Nosso diferencial está em trazer Oficinas <b className="text-recreation-orange font-bold">NUNCA</b> antes vistas em Taubaté e região. Além disso, todas as nossas gincanas, oficinas e brincadeiras são lideradas por profissionais experientes e com preparo para mediar convívio, aplicar técnicas de inclusão infantil e manter os limites físicos sobre vigilância.
              </p>

              {/* Mobile Visual Mosaic Representation */}
              <div className="lg:hidden relative py-4 flex justify-center w-full">
                <div className="absolute inset-x-0 w-full h-[120%] bg-blue-50/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -top-6 pointer-events-none z-0 rotate-12" />
                <div className="relative z-10 grid grid-cols-2 gap-4 max-w-lg w-full">
                  <div className="space-y-4">
                    <img 
                      src={quemSomosImg1} 
                      alt="Recreador experiente animando as crianças com bolhas gigantes" 
                      className="w-full h-56 object-cover rounded-[2rem] rounded-tl-[4rem] border-4 border-white shadow-lg rotate-[-2deg] transition-transform hover:rotate-0 duration-300"
                    />
                    <div className="bg-recreation-orange text-white p-5 rounded-[2.5rem] rounded-bl-2xl shadow-md text-center">
                      <p className="font-display text-3xl">100X</p>
                      <p className="text-xs font-bold uppercase tracking-wider">MAIS GELADO</p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="bg-cosmic-blue text-white p-5 rounded-[2.5rem] rounded-tr-2xl shadow-md text-center">
                      <p className="font-display text-4xl">100%</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider">De Sorrisos Seguros</p>
                    </div>
                    <img 
                      src={quemSomosImg2} 
                      alt="Pintura facial delicada e profissional" 
                      className="w-full h-56 object-cover rounded-[2rem] rounded-br-[4rem] border-4 border-white shadow-lg rotate-[2deg] transition-transform hover:rotate-0 duration-300"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/70 border-l-4 border-cosmic-blue p-4.5 rounded-r-2xl text-left my-2">
                <p className="text-sm font-bold text-cosmic-blue flex items-center gap-1">
                  📍 Atendemos Taubaté e região!
                </p>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Levamos toda a nossa diversão, mega-estrutura recreativa de alto padrão e equipe de professores qualificados para o seu evento em Taubaté e cidades vizinhas do Vale do Paraíba.
                </p>
              </div>

              {/* USP List */}
              <div className="space-y-3.5 pt-2">
                {[
                  { title: "Profissionais Especializados", desc: "Monitores que entendem de motricidade infantil, segurança e recreação lúdica.", icon: ShieldCheck },
                  { title: "Segurança Ativa em 1º Lugar", desc: "Todo o material de gincanas é higienizado rigorosamente e hipoalergênico.", icon: Award },
                  { title: "Foco Total na Inclusão", desc: "Garantimos que todas as crianças da festa, independente da sua individualidade, se divirtam.", icon: Heart }
                ].map((usp, i) => (
                  <div key={i} className="flex gap-4 items-start text-left bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <div className="bg-white text-recreation-orange p-2.5 rounded-2xl shadow-sm md:shrink-0">
                      <usp.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-800">{usp.title}</h4>
                      <p className="text-xs text-neutral-500">{usp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* SECTION "NOSSAS ATIVIDADES" */}
        <section id="atividades" className="py-20 bg-blue-50/40 border-y border-blue-100 px-4 md:px-8 relative overflow-hidden">
          <PawPrintTrailHorizontal className="left-[2%] md:left-[10%] top-[4%] opacity-50 select-none pointer-events-none" />
          <PawPrintTrailDiagonal className="right-[-60px] md:right-[-40px] bottom-[15%] opacity-50 select-none pointer-events-none hidden sm:block" />
          <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Header copy */}
            <div className="text-center max-w-xl mx-auto space-y-4 mb-14">
              <div className="inline-flex items-center gap-1.5 bg-blue-100 text-cosmic-blue px-3 py-1 rounded-full text-xs font-bold">
                <PartyPopper className="w-3.5 h-3.5 text-cosmic-blue" />
                <span>Garantia de Extrema Alegria</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-cosmic-blue font-display">
                Oficinas para colocar a <span className="text-recreation-orange">ENERGIA LÁ EM CIMA!!!</span>
              </h2>
              <p className="text-neutral-500 text-sm md:text-base">
                Clique nos cartões abaixo para conferir o protocolo de realização, regras de segurança e detalhes de cada vivência!
              </p>
            </div>

            {/* Grid of cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((act) => {
                const isSelected = selectedActivities.includes(act.title);
                return (
                  <article 
                    key={act.id} 
                    className="bg-white rounded-3xl border-2 border-neutral-200/70 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative"
                  >
                    
                    {/* Selected state overlay banner */}
                    {isSelected && (
                      <div className="absolute top-3 left-3 z-10 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Selecionado</span>
                      </div>
                    )}

                    {/* Image space with Zoom indicator */}
                    <div className="relative h-48 overflow-hidden bg-neutral-100">
                      <img 
                        src={act.image} 
                        alt={act.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/20 transition-colors" />
                      <button 
                        onClick={() => setSelectedActivity(act)}
                        className="absolute bottom-3 right-3 bg-white hover:bg-neutral-100 text-cosmic-blue p-2.5 rounded-full shadow-md text-xs font-semibold focus:outline-none transition-transform active:scale-95 flex items-center gap-1.5"
                        title="Ver destalhes e segurança"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-recreation-orange" />
                        <span>Ver Detalhes</span>
                      </button>
                    </div>

                    {/* Card details body */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2.5xl">{act.emoji}</span>
                          <h3 className="font-display text-xl text-cosmic-blue">{act.title}</h3>
                        </div>
                        <p className="text-neutral-500 text-xs md:text-sm leading-relaxed line-clamp-3">
                          {act.description}
                        </p>
                      </div>

                      {/* Select activity button tied to the dynamic form */}
                      <div className="pt-6 border-t border-neutral-100 mt-4 flex flex-col sm:flex-row gap-2">
                        <button 
                          onClick={() => toggleActivityInQuote(act.title)}
                          className={`w-full font-bold text-xs tracking-wide py-2.5 rounded-full transition-all flex items-center justify-center gap-1.5 ${
                            isSelected 
                              ? "bg-emerald-50 text-emerald-800 border-2 border-emerald-300 hover:bg-emerald-100" 
                              : "bg-neutral-100 text-neutral-700 hover:bg-recreation-orange hover:text-white border border-transparent"
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-4 h-4 font-bold" />
                              <span>Remover do Meu Filtro</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span>Marcar Esta Brincadeira</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>

                  </article>
                );
              })}
            </div>

            {/* Quote redirect call to action banner under grid */}
            <div className="mt-14 bg-gradient-to-r from-cosmic-blue to-blue-800 text-white p-8 rounded-3xl shadow-lg border-2 border-energy-yellow flex flex-col lg:flex-row gap-6 justify-between items-center text-center lg:text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="space-y-1 text-center lg:text-left">
                <h4 className="font-display text-2xl tracking-wide text-energy-yellow">
                  Quer montar um pacote de recreação exclusivo?
                </h4>
                <p className="text-sm text-neutral-200">
                  Selecione as atividades que mais combinam com seu filho e simule o orçamento completo abaixo!
                </p>
              </div>

              <a 
                href="#calculadora" 
                className="bg-energy-yellow hover:bg-yellow-400 text-cosmic-blue font-display text-base tracking-wide px-8 py-3.5 rounded-full shadow-md transition-transform hover:-translate-y-0.5 active:translate-y-0 text-center shrink-0"
              >
                Planejar Meu Evento Já!
              </a>
            </div>

          </div>
        </section>

        {/* SECTION "OFICINAS CRIATIVAS" */}
        <section id="oficinas" className="py-20 bg-white px-4 md:px-8 relative overflow-hidden">
          <PawPrintTrailSinuous className="right-2 md:right-4 top-[10%] opacity-50 select-none pointer-events-none" />
          <PawPrintTrailHorizontal className="left-[-100px] md:left-[-50px] bottom-[5%] opacity-50 select-none pointer-events-none hidden sm:block" />
          <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Intro Header */}
            <div className="text-center max-w-xl mx-auto space-y-4 mb-14">
              <div className="inline-flex items-center gap-1.5 bg-orange-100 text-recreation-orange px-3 py-1 rounded-full text-xs font-bold">
                <Brush className="w-3.5 h-3.5 text-recreation-orange" />
                <span>Atividades Calmas &amp; Manuais</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-cosmic-blue">
                Oficinas Criativas de <span className="text-recreation-orange">Mão na Massa</span>
              </h2>
              <p className="text-neutral-500 text-sm md:text-base">
                Perfeitas para acalmar os ânimos no meio do evento ou servir como lembrança real e afetiva que os amiguinhos levam de suvenir.
              </p>
            </div>

            {/* Quick Badges Bento List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshops.map((off, index) => {
                const IconComponent = off.icon;
                const isSelected = selectedActivities.includes(off.title);
                return (
                  <div 
                    key={off.id} 
                    onClick={() => setSelectedWorkshop(off)}
                    className={`p-6 rounded-2xl border-2 shadow-sm flex items-start gap-4 transition-all hover:shadow-md hover:scale-[1.02] active:scale-98 duration-200 cursor-pointer relative group ${off.color} ${
                      isSelected 
                        ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-emerald-100" 
                        : "border-neutral-200/60"
                    }`}
                  >
                    {/* Selection Indicator badge */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white p-1 rounded-full shadow-sm animate-bounce-slow">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                    
                    <div className="bg-white p-3 rounded-2xl shadow-sm shrink-0 flex items-center justify-center transition-transform group-hover:scale-110">
                      <IconComponent className="w-6 h-6 shrink-0" />
                    </div>
                    <div className="space-y-1 text-left pr-4">
                      <h4 className="font-display text-lg text-neutral-800 tracking-wide m-0">{off.title}</h4>
                      <p className="text-xs text-neutral-500 leading-normal">
                        {off.description}
                      </p>
                      <span className="inline-block text-[10px] text-cosmic-blue font-bold uppercase tracking-wider pt-1 hover:underline">
                        Ver detalhes →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Objections clearing for Parents & Recreação Livre Attention Box Side-by-Side */}
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
              {/* Left Column: Safety and Eco souvenirs */}
              <div className="lg:col-span-5 bg-neutral-50 border border-neutral-200/60 p-6 rounded-3xl flex flex-col gap-6 text-left justify-center">
                <div className="flex gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-sm text-neutral-800">Materiais Não Tóxicos</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">Tintas guache laváveis, colas à base de água e elementos não cortantes garantem diversão segura para idades a partir de 2 anos.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-sm text-neutral-800">Lembrancinha Ecológica</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">Em vez de brindes plásticos descartáveis, as crianças levam para casa um presente orgulhoso e manufaturado por elas mesmas.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Attention/Alert Red Box */}
              <div className="lg:col-span-7 bg-red-50 border-2 border-red-200 text-neutral-800 rounded-3xl p-6 flex flex-col sm:flex-row gap-4 text-left items-start justify-center shadow-sm">
                <div className="bg-red-600 text-white p-2.5 rounded-2xl shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-red-600 block text-xs uppercase tracking-wider">
                    RECREAÇÃO LIVRE E TRADICIONAL
                  </span>
                  <p className="text-sm text-neutral-700 leading-relaxed font-semibold">
                    <b className="text-red-700">Olha que incrível:</b> Nenhuma oficina específica chamou sua atenção? Não se preocupe! Nós temos o serviço de Recreação Livre e Tradicional. É pura animação comandada pelos nossos líderes, com brincadeiras dinâmicas que incluem todas as crianças e contam até com participação dos pais 😉
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION "GALERIA DE FOTOS (BENTO)" */}
        <section id="galeria" className="py-20 bg-neutral-50 border-t border-neutral-200/50 px-4 md:px-8 relative overflow-hidden">
          
          {/* Wave top decorator in section */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto text-center">
            
            <div className="text-center max-w-xl mx-auto space-y-4 mb-14">
              <div className="inline-flex items-center gap-1.5 bg-neutral-200 text-neutral-700 px-3 py-1 rounded-full text-xs font-bold">
                <Instagram className="w-3.5 h-3.5" />
                <span>Nossa Vibração Real nas Redes</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-cosmic-blue">
                Momentos <span className="text-recreation-orange">Alfa Kids de Verdade</span>
              </h2>
              <p className="text-neutral-500 text-sm md:text-base">
                Clique nas fotos/vídeos da nossa galeria de memórias para ampliar e testemunhar a atmosfera de pura alegria.
              </p>
            </div>

            {/* Elegant Bento Grid of original URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px]">
              {galleryImages.map((img, i) => (
                <div 
                  key={i} 
                  className={`relative overflow-hidden rounded-3xl border-2 border-white group shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1 duration-300 ${img.span || ""}`}
                  onClick={() => setActiveLightboxImage({ url: img.url, alt: img.alt, type: img.type as "image" | "video" })}
                >
                  {img.type === "video" ? (
                    <div className="w-full h-full relative">
                      {currentVideoResolvedType === "youtube" ? (
                        <div className="w-full h-full bg-neutral-900 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                          <img 
                            src={`https://img.youtube.com/vi/${getYoutubeId(img.url) || "dQw4w9WgXcQ"}/0.jpg`} 
                            alt={img.alt} 
                            className="w-full h-full object-cover opacity-70"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>
                      ) : (
                        <video 
                          src={img.url} 
                          className="w-full h-full object-cover cursor-pointer"
                          muted
                          loop
                          playsInline
                          autoPlay
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.src.includes('gtv-videos-bucket') && !target.src.startsWith('blob:')) {
                              target.src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4';
                              target.load();
                              target.play().catch(() => {});
                            }
                          }}
                        />
                      )}
                      {/* Video visual indicator badge */}
                      <div className="absolute top-3 right-3 bg-recreation-orange text-white p-2 rounded-full shadow-md z-10 animate-pulse flex items-center justify-center">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={img.url} 
                      alt={img.alt} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                    />
                  )}
                  
                  {/* Subtle zoom overlays */}
                  <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer">
                    <span className="bg-white text-cosmic-blue p-3.5 rounded-full shadow-lg font-bold text-xs flex items-center gap-1 scale-90 group-hover:scale-100 transition-transform">
                      {img.type === "video" ? (
                        <>
                          <Play className="w-3.5 h-3.5 text-recreation-orange fill-current" /> Assistir Vídeo
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-recreation-orange" /> Ampliar Memória
                        </>
                      )}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-2xl text-[10px] sm:text-xs font-semibold text-left line-clamp-1 opacity-80 pointer-events-none text-center">
                    {img.alt}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION DYNAMIC BUDGET CALCULATOR / ESTIMATOR */}
        <section id="calculadora" className="py-20 bg-gradient-to-b from-white via-indigo-50/20 to-white px-4 md:px-8 relative overflow-hidden">
          <PawPrintTrailDiagonal className="left-[-100px] md:left-[-50px] top-[15%] opacity-50 select-none pointer-events-none hidden sm:block" />
          <PawPrintTrailSinuous className="right-2 md:right-4 bottom-[10%] opacity-50 select-none pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            
            {/* CRO Form header */}
            <div className="text-center space-y-4 mb-12">
              <span className="bg-energy-yellow text-cosmic-blue font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow">Diga Não ao Preço Oculto</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-cosmic-blue">
                Simulador de Recreação On-line
              </h2>
              <p className="text-neutral-500 text-sm md:text-md max-w-xl mx-auto leading-relaxed">
                Preencha os dados abaixo para formatar uma estimativa lúdica do seu evento. Seus dados e preferências de brincadeiras são compilados e enviados de forma instantânea para o WhatsApp do Tio Gelado!
              </p>
            </div>

            {/* Interactive Calculator Body Frame */}
            <div className="bg-white rounded-[2rem] border-4 border-cosmic-blue shadow-[0_15px_40px_rgba(0,85,164,0.12)] p-6 md:p-10 relative overflow-hidden">
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-recreation-orange rounded-full opacity-10 pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-energy-yellow rounded-full opacity-10 pointer-events-none" />

              <div className="space-y-8">
                
                {/* Steps / Block 1: Basic Info */}
                <div className="space-y-4 text-left">
                  <h3 className="font-display text-xl text-cosmic-blue flex items-center gap-2 border-b-2 border-neutral-100 pb-2">
                    <span className="bg-blue-100 text-cosmic-blue w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">1</span>
                    Dados Básicos do Responsável
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1.5 uppercase tracking-wide">Seu Nome Completo:</label>
                      <input 
                        type="text" 
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="Ex: Mariana Silva" 
                        className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:border-cosmic-blue focus:ring-1 focus:ring-cosmic-blue focus:outline-none text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1.5 uppercase tracking-wide">Seu WhatsApp de Contato:</label>
                      <input 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Ex: (12) 99876-5432" 
                        className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:border-cosmic-blue focus:ring-1 focus:ring-cosmic-blue focus:outline-none text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1.5 uppercase tracking-wide">Previsão da Data do Evento:</label>
                      <input 
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:border-cosmic-blue focus:ring-1 focus:ring-cosmic-blue focus:outline-none text-sm text-neutral-600 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-600 mb-1.5 uppercase tracking-wide">Cidade da Realização:</label>
                      <select 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:border-cosmic-blue focus:ring-1 focus:ring-cosmic-blue focus:outline-none text-sm text-neutral-600 transition-all bg-white"
                      >
                        <option value="Taubaté">Taubaté/SP</option>
                        <option value="São José dos Campos">São José dos Campos/SP</option>
                        <option value="Pindamonhangaba">Pindamonhangaba/SP</option>
                        <option value="Jacareí">Jacareí/SP</option>
                        <option value="Caçapava">Caçapava/SP</option>
                        <option value="Litoral Norte">Litoral Norte (Ubatuba/São Sebastião)</option>
                        <option value="Serra da Mantiqueira">Serra da Mantiqueira (Campos do Jordão)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Steps / Block 2: Dynamics filters */}
                <div className="space-y-4 text-left">
                  <h3 className="font-display text-xl text-cosmic-blue flex items-center gap-2 border-b-2 border-neutral-100 pb-2">
                    <span className="bg-orange-100 text-recreation-orange w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">2</span>
                    Detalhes do Público &amp; Tempo
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    {/* Kids Count */}
                    <div className="space-y-2">
                      <span className="block text-xs font-bold text-neutral-600 uppercase tracking-wide">Número de Crianças:</span>
                      <div className="flex flex-col gap-1.5">
                        {["Até 20 crianças", "21 a 30 crianças", "31 a 40 crianças", "Mais de 40 crianças"].map((option) => (
                          <button 
                            key={option}
                            onClick={() => setKidsCount(option)}
                            className={`w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border ${
                              kidsCount === option 
                                ? "bg-cosmic-blue/10 text-cosmic-blue border-cosmic-blue" 
                                : "bg-neutral-50 border-neutral-100 text-neutral-600 hover:bg-neutral-100"
                            }`}
                          >
                            {kidsCount === option ? "⚡ " : ""} {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Age Group */}
                    <div className="space-y-2">
                      <span className="block text-xs font-bold text-neutral-600 uppercase tracking-wide">Faixa Etária Predominante:</span>
                      <div className="flex flex-col gap-1.5">
                        {["2 a 5 anos", "6 a 10 anos", "11 a 14 anos", "Mista"].map((option) => (
                          <button 
                            key={option}
                            onClick={() => setAgeGroup(option)}
                            className={`w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border ${
                              ageGroup === option 
                                ? "bg-[#ffede3] text-recreation-orange border-recreation-orange" 
                                : "bg-neutral-50 border-neutral-100 text-neutral-600 hover:bg-neutral-100"
                            }`}
                          >
                            {ageGroup === option ? "🦁 " : ""} {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Duração */}
                    <div className="space-y-2">
                      <span className="block text-xs font-bold text-neutral-600 uppercase tracking-wide">Duração da Recreação:</span>
                      <div className="flex flex-col gap-1.5">
                        {["3 Horas", "4 Horas", "5 Horas", "Personalizada"].map((option) => (
                          <button 
                            key={option}
                            onClick={() => setDuration(option)}
                            className={`w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border ${
                              duration === option 
                                ? "bg-amber-100 text-amber-800 border-amber-500" 
                                : "bg-neutral-50 border-neutral-100 text-neutral-600 hover:bg-neutral-100"
                            }`}
                          >
                            {duration === option ? "⏳ " : ""} {option}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Steps / Block 3: Select Activities */}
                <div className="space-y-4 text-left">
                  <h3 className="font-display text-xl text-cosmic-blue flex items-center gap-2 border-b-2 border-neutral-100 pb-2">
                    <span className="bg-rose-100 text-red-500 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs font-sans">3</span>
                    Selecione suas Oficinas Preferidas
                  </h3>
                  
                  <div className="space-y-2">
                    <span className="block text-[10px] font-bold text-neutral-600 uppercase tracking-wider">🎈 Oficinas Lúdicas:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {activities.map((act) => {
                        const title = act.title;
                        const selected = selectedActivities.includes(title);
                        return (
                          <button 
                            key={title}
                            onClick={() => toggleActivityInQuote(title)}
                            className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all ${
                              selected 
                                ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm" 
                                : "bg-neutral-50 border-neutral-100 text-neutral-600 hover:border-neutral-200"
                            }`}
                          >
                            <span className="text-xs font-bold tracking-wide">{title}</span>
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                              selected ? "bg-emerald-500 text-white" : "bg-neutral-200 text-neutral-400"
                            }`}>
                              {selected ? "✓" : "+"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="block text-[10px] font-bold text-neutral-600 uppercase tracking-wider">🎨 Oficinas Criativas:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {workshops.map((off) => {
                        const title = off.title;
                        const selected = selectedActivities.includes(title);
                        return (
                          <button 
                            key={title}
                            onClick={() => toggleActivityInQuote(title)}
                            className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all ${
                              selected 
                                ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm" 
                                : "bg-neutral-50 border-neutral-100 text-neutral-600 hover:border-neutral-200"
                            }`}
                          >
                            <span className="text-xs font-bold tracking-wide">{title}</span>
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                              selected ? "bg-emerald-500 text-white" : "bg-neutral-200 text-neutral-400"
                            }`}>
                              {selected ? "✓" : "+"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Simulated Outcome Estimate */}
                <div className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-200 text-left space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold">RESUMO</span>
                      <h4 className="font-display text-lg text-cosmic-blue m-0">
                        Resumo da Simulação
                      </h4>
                    </div>
                    <div className="text-xs text-neutral-500 font-semibold">Região: {city}</div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-y py-4 border-slate-200">
                    <div>
                      <span className="text-neutral-400 block uppercase font-bold tracking-wider text-[9px] mb-0.5">Tempo</span>
                      <span className="font-bold text-neutral-700">{duration}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase font-bold tracking-wider text-[9px] mb-0.5">Faixa</span>
                      <span className="font-bold text-neutral-700">{ageGroup}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase font-bold tracking-wider text-[9px] mb-0.5">Atividades</span>
                      <span className="font-bold text-neutral-700">{selectedActivities.length} ativas</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase font-bold tracking-wider text-[9px] mb-0.5">Equipe Recomendada</span>
                      <span className="font-bold text-sky-700">
                        {kidsCount.includes("31 a 40") || kidsCount.includes("40") 
                          ? "3 a 4 Recreadores Alfa" 
                          : "2 a 3 Recreadores Alfa"}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-400 leading-normal">
                    Esta é uma simulação indicativa de capacidade para o Vale do Paraíba. O orçamento financeiro exato é enviado pelo Tio Gelado após o envio das informações de endereço no WhatsApp!
                  </p>
                </div>

                {/* Instant Launch Conversion CTA */}
                <div className="pt-4 text-center">
                  <a 
                    href={generateWhatsAppLink()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full bg-recreation-orange hover:bg-orange-600 text-white font-display text-xl tracking-wider py-4.5 rounded-full inline-flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,102,0,0.5)] transition-all transform hover:-translate-y-1 hover:scale-101 active:translate-y-0 active:scale-99 animate-pulse-slow font-semibold"
                  >
                    <Star className="w-5 h-5 text-energy-yellow fill-energy-yellow" />
                    Enviar Simulação Segura para o WhatsApp
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <p className="text-xs text-neutral-400 mt-3 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Seus dados estão protegidos. Conexão direta e imediata com o WhatsApp Oficial da Alfa Kids.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* SECTION "DEPOIMENTOS" (Halo Effect / Objection Crusher) */}
        <section className="py-20 bg-blue-50/20 border-t border-neutral-100 px-4 md:px-8 text-center">
          <div className="max-w-7xl mx-auto">
            
            <div className="max-w-xl mx-auto space-y-4 mb-14">
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Opinião Verdadeira dos Pais</span>
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-cosmic-blue">
                Quem Já Conduziu a <span className="text-recreation-orange">Aventura Alfa Kids</span>
              </h2>
              <p className="text-neutral-500 text-xs md:text-sm">
                Nossa reputação é moldada pelo alívio dos pais de poderem descansar enquanto os filhos brincam com segurança de elite.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  p: "Festa do Bernardo de 7 anos",
                  text: "Estávamos muito preocupados com o campeonato de futebol pois os amigos dele são extremamente enérgicos. O Tio Gelado e os monitores conduziram tudo com uma sobriedade esportiva fantástica! Os meninos se cansaram respeitosamente e as medalhas finais foram lúdicas e ricas. Valeu cada investimento!",
                  author: "Mariana Alvarenga",
                  city: "São José dos Campos/SP",
                  rating: 5
                },
                {
                  p: "Aniversário de Clarinha, 5 anos",
                  text: "Contratei a Oficina de Cupcakes e a Festa das Cores. A equipe Alfa Kids forrou todo o gramado do condomínio e cuidou das crianças de maneira carinhosa. A minha Clarinha é super tímida, e o monitor Enzo soube integrá-la com tanto afeto que ela brincou a festa inteira! Recomendo de olhos fechados.",
                  author: "Regiane Mendonça",
                  city: "Taubaté/SP",
                  rating: 5
                },
                {
                  p: "Evento Corporativo de Fim de Ano",
                  text: "Excelente! Recreadores formados, muito organizados, chegaram 1 hora antes para higienizar todos os materiais de gincana. O Skibum de água e sabão no final da tarde foi o delírio da criançada (e até de alguns diretores). Já reservamos os mesmos recreadores para a festa deste ano!",
                  author: "Ricardo Castor",
                  city: "Jacareí/SP",
                  rating: 5
                }
              ].map((dep, i) => (
                <div key={i} className="bg-white rounded-3xl border-2 border-neutral-100 p-6 shadow-sm text-left flex flex-col justify-between relative group hover:shadow-md transition-shadow">
                  <div className="absolute top-6 right-6 text-indigo-400 font-serif text-6xl opacity-15 pointer-events-none select-none">“</div>
                  <div className="space-y-3 relative z-10">
                    <div className="flex text-amber-500">
                      {"★★★★★".split("").map((str, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <h4 className="font-display text-lg text-cosmic-blue m-0">{dep.p}</h4>
                    <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
                      {dep.text}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 mt-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0055a4]/10 text-cosmic-blue font-bold flex items-center justify-center text-sm">
                      {dep.author[0]}
                    </div>
                    <div className="leading-tight">
                      <span className="block font-bold text-xs text-neutral-800">{dep.author}</span>
                      <span className="text-[10px] text-neutral-400 font-semibold">{dep.city}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION OBJECTIONS FAQ (CRO Essential) */}
        <section id="faq" className="py-20 bg-white px-4 md:px-8 relative overflow-hidden">
          <PawPrintTrailHorizontal className="left-[2%] md:left-[5%] bottom-4 opacity-50 select-none pointer-events-none" />
          <div className="max-w-3xl mx-auto relative z-10">
            
            <div className="text-center space-y-4 pt-12 mb-12">
              <span className="bg-neutral-100 text-neutral-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">Perguntas Respondidas</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-cosmic-blue">
                Dúvidas <span className="text-recreation-orange">Frequentes dos Pais</span>
              </h2>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {FAQs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className="border-2 border-neutral-150 rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    
                    {/* Header trigger button */}
                    <button 
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex justify-between items-center p-5 text-left bg-neutral-50 hover:bg-neutral-100/50 transition-colors focus:outline-none"
                    >
                      <span className="font-display text-base md:text-lg text-cosmic-blue font-semibold pr-4">
                        {faq.q}
                      </span>
                      <span className="bg-white p-1 rounded-2xl shadow-sm text-cosmic-blue">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </span>
                    </button>

                    {/* Collapsible panel */}
                    {isOpen && (
                      <div className="p-5 border-t-2 border-neutral-150 bg-white text-sm text-neutral-500 leading-relaxed text-left animate-slideDown">
                        {faq.a}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-cosmic-blue text-white rounded-t-[3rem] border-t-8 border-energy-yellow">
        
        {/* Core footer elements */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-12 text-center md:text-left">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-4 space-y-4">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqJkvKXAJBEHpbsf8nUllDLbObgq9055oBb4USOaS3ph-UfFFGU2BIkz4Vkg1Ag_pinhJVmVskkB5i8mnDb4CZc8oYutq5ZgwP7ESnnMYDOMI0X_MCZ0D7Wf9_usjPWFcVj0RbMjJP9DdwKShfIXf7kZLuGvS9Q9fdv8-pASTNWAKl3xKOuPughrDQcpODFy6Tm4w2WCjqd7mCxn0faYorvGtLsVVgXeElXBp0teKYY7c2FWMfTA_KGFXbQ3GvzkeULqYWr2fmBq7t" 
              alt="Alfa Kids Logo" 
              className="h-14 w-auto object-contain mx-auto md:mx-0 bg-white p-2 rounded-2xl"
            />
            <p className="text-sm text-neutral-200 leading-relaxed font-semibold">
              Especialistas em criar momentos mágicos e memórias memoráveis para as crianças, com segurança clínica absoluta para sossego dos pais.
            </p>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <a 
                href="https://instagram.com/alfakids.recreacao" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-white transition-colors"
                title="Configurações e Instagram oficial"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <span className="text-xs text-neutral-200 font-bold tracking-wide">@alfakids.recreacao</span>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="font-display text-lg text-energy-yellow uppercase tracking-wider border-b border-white/20 pb-2">
              Navegação Rápida
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-neutral-200 font-semibold">
              <a href="#" className="hover:text-energy-yellow transition-colors">Início</a>
              <a href="#quem-somos" className="hover:text-energy-yellow transition-colors">Quem Somos</a>
              <a href="#atividades" className="hover:text-energy-yellow transition-colors">Atividades</a>
              <a href="#oficinas" className="hover:text-energy-yellow transition-colors">Oficinas</a>
              <a href="#galeria" className="hover:text-energy-yellow transition-colors">Galeria</a>
              <a href="#calculadora" className="hover:text-energy-yellow transition-colors">Simulador</a>
            </div>
          </div>

          {/* Contact Details (CRO visual confirmation) */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="font-display text-lg text-energy-yellow uppercase tracking-wider border-b border-white/20 pb-2">
              Contato Vale do Paraíba
            </h4>
            <div className="space-y-3.5 text-sm font-semibold text-neutral-100">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-2xl text-energy-yellow">
                  <Phone className="w-4 h-4" />
                </div>
                <span>(12) 97812-0035</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-2xl text-energy-yellow">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Taubaté, São José dos Campos e região</span>
              </div>
              <p className="text-xs text-neutral-300 italic">
                *Disponibilidade para atendimento corporativo, escolar e festas presidenciais residenciais na chácara ou condomínio.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright banner */}
        <div className="bg-slate-950 text-neutral-400 py-6 px-4 text-center text-xs border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
            <p>© 2026 Alfa Kids Recreação &amp; Lazer. Todos os direitos reservados de imagem e marca.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Políticas de Privacidade</a>
              <a href="#" className="hover:underline">Termos de Serviço</a>
            </div>
          </div>
        </div>

      </footer>

      {/* LIGHTBOX FOR BENTO GALLERY IMAGES */}
      {activeLightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            onClick={() => setActiveLightboxImage(null)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors focus:outline-none"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col items-center gap-4">
            {activeLightboxImage.type === "video" ? (
              currentVideoResolvedType === "youtube" ? (
                <div className="w-[90vw] max-w-4xl aspect-video rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl bg-black">
                  <iframe 
                    src={`https://www.youtube.com/embed/${getYoutubeId(activeLightboxImage.url)}?autoplay=1&mute=0`} 
                    title={activeLightboxImage.alt}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <video 
                  src={activeLightboxImage.url} 
                  className="rounded-2xl max-w-full max-h-[60vh] object-contain border-4 border-white/10 shadow-2xl"
                  controls
                  autoPlay
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('gtv-videos-bucket') && !target.src.startsWith('blob:')) {
                      target.src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4';
                      target.load();
                      target.play().catch(() => {});
                    }
                  }}
                />
              )
            ) : (
              <img 
                src={activeLightboxImage.url} 
                alt={activeLightboxImage.alt} 
                className="rounded-2xl max-w-full max-h-[75vh] object-contain border-4 border-white/10 shadow-2xl"
              />
            )}
            <p className="text-white text-center text-sm font-semibold max-w-xl leading-relaxed">
              {activeLightboxImage.alt}
            </p>
          </div>
        </div>
      )}

      {/* DETAIL MODAL FOR UNIQUE ACTIVITIES DEEP DIVE */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-4 border-cosmic-blue animate-zoomIn flex flex-col text-left">
            
            {/* Top Close button and title layout */}
            <div className="relative h-56 bg-neutral-100">
              <img 
                src={selectedActivity.image} 
                alt={selectedActivity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <button 
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 bg-white hover:bg-neutral-100 p-2.5 rounded-full text-cosmic-blue shadow-md transition-colors"
                aria-label="Fechar"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="absolute bottom-4 left-5 flex items-center gap-2">
                <span className="text-3xl">{selectedActivity.emoji}</span>
                <div>
                  <h3 className="font-display text-2xl text-white m-0 tracking-wide">
                    {selectedActivity.title}
                  </h3>
                  <span className="text-[10px] bg-energy-yellow text-cosmic-blue font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                    Protocolo Alfa Kids
                  </span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wide text-neutral-400 mb-1">Como Funciona:</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                  {selectedActivity.detailedDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y py-4 border-neutral-100">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-rose-500 mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Diretrizes de Segurança:
                  </h4>
                  <p className="text-xs text-neutral-550 leading-relaxed font-semibold">
                    {selectedActivity.safety}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-cosmic-blue mb-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-energy-yellow fill-current" /> Espaço Recomendado:
                  </h4>
                  <p className="text-xs text-neutral-550 leading-relaxed font-semibold">
                    {selectedActivity.bestFor}
                  </p>
                </div>
              </div>

              {/* Instant dynamic inclusion feedback mechanism */}
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    toggleActivityInQuote(selectedActivity.title);
                    setSelectedActivity(null);
                  }}
                  className="w-full bg-recreation-orange text-white font-display text-base tracking-wide py-3 rounded-full hover:bg-orange-600 transition-colors shadow-md text-center shrink-0 active:scale-95"
                >
                  {selectedActivities.includes(selectedActivity.title) 
                    ? "✓ Remover das Preferências" 
                    : "🎯 Marcar Para Meu Evento"}
                </button>
                <button 
                  onClick={() => setSelectedActivity(null)}
                  className="px-5 py-3 rounded-full font-bold text-xs text-neutral-600 hover:bg-neutral-100 transition-colors border"
                >
                  Fechar
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* DETAIL MODAL FOR UNIQUE WORKSHOPS DEEP DIVE */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-4 border-recreation-orange animate-zoomIn flex flex-col text-left">
            
            {/* Top Close button and title layout */}
            <div className="relative h-56 bg-neutral-100">
              <img 
                src={selectedWorkshop.image} 
                alt={selectedWorkshop.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <button 
                onClick={() => setSelectedWorkshop(null)}
                className="absolute top-4 right-4 bg-white hover:bg-neutral-100 p-2.5 rounded-full text-recreation-orange shadow-md transition-colors"
                aria-label="Fechar"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="absolute bottom-4 left-5 flex items-center gap-3">
                <div className="bg-white/95 text-recreation-orange p-2 rounded-2xl shadow-sm">
                  <selectedWorkshop.icon className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <h3 className="font-display text-2.5xl text-white m-0 tracking-wide">
                    {selectedWorkshop.title}
                  </h3>
                  <span className="text-[10px] bg-energy-yellow text-cosmic-blue font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                    Oficina Criativa
                  </span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-5">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wide text-neutral-400 mb-1.5 font-sans">Sobre a Oficina:</h4>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-semibold">
                  {selectedWorkshop.description}
                </p>
              </div>

              {/* Instant dynamic inclusion feedback mechanism */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => {
                    toggleActivityInQuote(selectedWorkshop.title);
                    setSelectedWorkshop(null);
                  }}
                  className="w-full bg-recreation-orange text-white font-display text-base tracking-wide py-3 rounded-full hover:bg-orange-600 transition-colors shadow-md text-center shrink-0 active:scale-95 animate-pulse-slow"
                >
                  {selectedActivities.includes(selectedWorkshop.title) 
                    ? "✓ Remover das Preferências" 
                    : "🎯 Marcar Para Meu Evento"}
                </button>
                <button 
                  onClick={() => setSelectedWorkshop(null)}
                  className="px-5 py-3 rounded-full font-bold text-xs text-neutral-600 hover:bg-neutral-100 transition-colors border"
                >
                  Fechar
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
