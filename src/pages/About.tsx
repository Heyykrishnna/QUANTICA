import { motion } from "framer-motion";
import { Target, Users, Trophy, Star } from "lucide-react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import PageTransition from "../components/PageTransition";
import GlitchText from "../components/GlitchText";
import DraggableCardDemo from "../components/Draggable";

const coreTeam = [
  {
    name: "Deepanshu Chaudhary",
    role: "Founder",
    image: "https://ik.imagekit.io/vdigjljlu/IMG_9480.JPG",
    linkedin: "https://www.linkedin.com/in/deepanshu-chaudhary17/",
    email: "deepanshu.chaudhary2024@nst.rishihood.edu.in",
  },
  {
    name: "Sarabjeet singh",
    role: "Tournament Director",
    image: "https://ik.imagekit.io/vdigjljlu/Image%20Converter%20Output.png",
    linkedin: "https://www.linkedin.com/in/sarabjeet-singh-0695a8310/",
    email: "sarabjeet.singh2024@nst.rishihood.edu.in",
  },
  {
    name: "Somil Thakur",
    role: "Operations Head",
    image: "https://ik.imagekit.io/vdigjljlu/IMG_2138.JPG",
    linkedin: "https://www.linkedin.com/in/somil-thakur-682817323/",
    email: "somil.thakur2024@makers.rishihood.edu.in",
  },
  {
    name: "Kapish Rohilla",
    role: "Technical Lead",
    image: "https://ik.imagekit.io/vdigjljlu/Screenshot%202026-01-10%20at%204.16.14%E2%80%AFPM.png?updatedAt=1769411838200",
    // image: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1768044091/Screenshot_2026-01-10_at_4.50.48_PM_dng2eg.png",
    linkedin: "https://www.linkedin.com/in/kapishrohilla/",
    email: "kapish.rohilla2024@nst.rishihood.edu.in",
  },
  {
    name: "Neelanshu karn",
    role: "Sponsorship Head",
    image: "https://ik.imagekit.io/vdigjljlu/WhatsApp%20Image%202026-01-12%20at%2000.52.58.jpeg",
    linkedin: "https://www.linkedin.com/in/neelanshu-karn-05146130a/",
    email: "neelanshu.2024@nst.rishihood.edu.in",
  },
  {
    name: "Anindya Sarkar",
    role: "Outreach Head",
    image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/Picture%20-%20Anindya%20Sarkar.jpeg",
    linkedin: "https://www.linkedin.com/in/anindya-sarkar2007/",
    email: "anindya.s25058@nst.rishihood.edu.in",
  },
  {
    name: "Kaustubh Singh",
    role: "Design Lead",
    image: "https://ik.imagekit.io/vdigjljlu/WhatsApp%20Image%202026-01-10%20at%2016.16.49.jpeg",
    linkedin: "https://www.linkedin.com/in/ikaustubhsingh/",
    email: "kaustubh.s25008@design.rishihood.edu.in",
  },
  {
    name: "Kushagra Maheshwari",
    role: "Content Lead",
    image: "https://ik.imagekit.io/vdigjljlu/WhatsApp%20Image%20Jan%2012%202026%20from%20Kushagra%20Maheshwari.jpeg",
    linkedin: "https://www.linkedin.com/in/kushm11/",
    email: "kushagra.maheshwari2024@nst.rishihood.edu.in",
  },
];

const additionalTeams = [
  {
    title: "Tech Team",
    subtitle: "Code. Conquer. Control the Game.",
    members: [
      {
        name: "Yuvansh Juneja",
        role: "Tech Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/d9783e4b-29ce-41e6-bd7a-929dd30eca12%20-%20Yuvansh%20Juneja.jpeg",
        linkedin: "https://www.linkedin.com/in/yuvansh-juneja-905679332/",
        email: "yuvansh.j25537@nst.rishihood.edu.in",
      },
      {
        name: "Yatharth Khandelwal",
        role: "Tech Team",
        image: "https://res.cloudinary.com/dqh5g2nmn/image/upload/v1768237165/Yatharth_uwywey.png",
        linkedin: "https://www.linkedin.com/in/khandelwalyatharth/",
        email: "yatharth.k25530@nst.rishihood.edu.in",
      },
    ],
  },
  {
    title: "Design Team",
    subtitle: "Pixels with Purpose",
    members: [
      {
        name: "Prateek Girdhar",
        role: "Design Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG_0638%20-%20Prateek%20Girdhar.jpeg",
        linkedin: "https://www.linkedin.com/in/prateek-girdhar-b0250327a/",
        email: "prateek.g25035@design.rishihood.edu.in",
      },
      {
        name: "Arit Dey",
        role: "Design Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG_0082%20-%20Arit%20Dey.jpeg?updatedAt=1769665004100",
        linkedin: "https://www.linkedin.com/in/arit-dey-39412136b/",
        email: "arit.d25002@design.rishihood.edu.in",
      },
    ],
  },
  {
    title: "Sponsorship and Partnership Team",
    subtitle: "Partnerships That Win Games.",
    members: [
      {
        name: "Anshika Srivastava",
        role: "Sponsorship Team",
        image: "https://ik.imagekit.io/vdigjljlu/WhatsApp%20Image%202026-01-22%20at%2016.52.24.jpeg",
        linkedin: "https://www.linkedin.com/in/anshika-srivastava-b5a046356/",
        email: "anshika.s25071@nst.rishihood.edu.in",
      },
      {
        name: "Keshav Goel",
        role: "Sponsorship Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/Screenshot%202026-01-29%20at%2011.26.12%E2%80%AFAM.png",
        linkedin: "https://www.linkedin.com/in/keshav-goel-6a7b47380/",
        email: "keshav.g25720@nst.rishihood.edu.in",
      },
      {
        name: "Rudransh Singh",
        role: "Partnership Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG-20260112-WA0040%20-%20Rudransh%20Singh.jpg",
        linkedin: "https://www.linkedin.com/in/rudransh-singh-941a45304/",
        email: "rudransh.s25390@nst.rishihood.edu.in",
      },
      {
        name: "Sayan Bhattacharya ",
        role: "Sponsorship Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG-20260108-WA0218%20-%20Sayan%20Bhattacharya.jpg",
        linkedin: "https://www.linkedin.com/in/sayanbhattacharya01/",
        email: "sayan.bhattacharya2024@nst.rishihood.edu.in",
      },
    ],
  },
  {
    title: "Outreach Team",
    subtitle: "Ping Sent. Connection Made.",
    members: [
      {
        name: "Ishan Maheshwari",
        role: "Outreach Lead",
        image: "https://ik.imagekit.io/vdigjljlu/WhatsApp%20Image%202026-01-29%20at%2012.40.48.jpeg",
        linkedin: "https://www.linkedin.com/in/ishan-maheshwari-4b6154323/",
        email: "ishan.maheshwari2024@nst.rishihood.edu.in",
      },
      {
        name: "Dhaval sethi",
        role: "Outreach Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/20251201_004223%20-%20Dhaval%20Sethi.jpg?updatedAt=1769665004508",
        linkedin: "/",
        email: "dhaval.s25141@nst.rishihood.edu.in",
      },
      {
        name: "Ansh singh",
        role: "Outreach Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/Screenshot_2026-01-12-11-32-02-59_92460851df6f172a4592fca41cc2d2e6%20-%20Ansh%20Singh.jpg?updatedAt=1769665003379",
        linkedin: "https://www.linkedin.com/in/ansh-singh-nst",
        email: "ansh.s25070@nst.rishihood.edu.in",
      },
      {
        name: "Saksham Saxena",
        role: "Outreach Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/Screenshot_2026_0117_205312%20-%20Saksham%20Saxena.png?updatedAt=1769665004304",
        linkedin: "",
        email: "saksham.s25395@nst.rishihood.edu.in",
      },
      {
        name: "Shlok Garg",
        role: "Outreach Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG_20251204_003711_001%20-%20Shlok%20Garg.webp?updatedAt=1769665003351",
        linkedin: "https://www.linkedin.com/in/shlok-garg-390b1b38b",
        email: "shlok.g25677@nst.rishihood.edu.in",
      },
    ],
  },
  {
    title: "Marketing Team",
    subtitle: "Visibility Wins Games",
    members: [
      {
        name: "Aayush Ray",
        role: "Marketing Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/PHOTO-2026-01-12-01-43-40%20-%20Aayush%20Ray.jpg",
        linkedin: "https://www.linkedin.com/in/aayushray/",
        email: "aayush.r25009@nst.rishihood.edu.in",
      },
      {
        name: "Alok Rawat",
        role: "Marketing Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG_7367%20-%20Alok%20Rawat.HEIC?updatedAt=1769665004823",
        linkedin: "https://www.linkedin.com/in/alok-rawat-1698172aa/",
        email: "alok.r25012@csds.rishihood.edu.in",
      },
      {
        name: "Lakshay Chaudhary",
        role: "Marketing Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG_20251212_182736%20-%20Lakshay%20Chaudhary.jpg",
        linkedin: "/",
        email: "lakshay.c25623@nst.rishihood.edu.in",
      },
      {
        name: "Parth Mittal",
        role: "Marketing Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG_4643%20-%20Parth%20Mittal.jpeg",
        linkedin: "https://www.linkedin.com/in/parth-mittal-159228371/",
        email: "parth.m25657@nst.rishihood.edu.in",
      },
      {
        name: "Krishna Agarwal",
        role: "Marketing Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG_3337%20-%20Krishna%20Agarwal.png?updatedAt=1769665004097",
        linkedin: "https://www.linkedin.com/in/krishna-agarwal-1a963626b/",
        email: "krishna.a25010@design.rishihood.edu.in",
      },
      {
        name: "Saurav Singh",
        role: "Marketing Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/WhatsApp%20Image%202026-01-13%20at%2023.08.41%20-%20Saurav%20Kumar.jpeg?updatedAt=1769665002987",
        linkedin: "https://www.linkedin.com/in/saurav-singh-52971936a/",
        email: "saurav.k25020@design.rishihood.edu.in",
      },
      {
        name: "Harsh Raja",
        role: "Marketing Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG_20251201_131108_867%20-%20Harsh%20Raja.webp",
        linkedin: "https://www.linkedin.com/in/harsh-raja-15baba354/",
        email: "harsh.r25177@nst.rishihood.edu.in",
      },
      {
        name: "Poorak Pandey",
        role: "Marketing Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/20251205_135023%20-%20Poorak%20Pandey.jpg?updatedAt=1769665003812",
        linkedin: "https://www.linkedin.com/in/poorak-pandey-038a38262/",
        email: "poorak.p25055@csds.rishihood.edu.in",
      },
      {
        name: "Shray Upadhyay",
        role: "Marketing Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG-20250122-WA0011%20-%20Shray%20Upadhyay.jpg?updatedAt=1769665002950",
        linkedin: "https://www.linkedin.com/in/shray-upadhyay-659946314",
        email: "shray.u25134@csds.rishihood.edu.in",
      },
      {
        name: "Aaryan Barthwal",
        role: "Marketing Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/20260125_222141%20-%20Aaryan%20Barthwal.jpg?updatedAt=1769665004560",
        linkedin: "https://www.linkedin.com/in/aaryanbarthwal",
        email: "aaryan.b25681@nst.rishihood.edu.in",
      },
    ],
  },
  {
    title: "Events Team",
    subtitle: "Orchestrating the Experience",
    members: [
      {
        name: "Aayush Kumar",
        role: "Events Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG-20251201-WA0161%20-%20Aayush%20Kumar.jpg?updatedAt=1769665003953",
        linkedin: "https://www.linkedin.com/in/aayush-kumar2007",
        email: "aayush.k25011@nst.rishihood.edu.in",
      },
      {
        name: "Subrat Kumar Sahu",
        role: "Events Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/WhatsApp%20Image%202026-01-29%20at%2017.52.32.jpeg?updatedAt=1770010291789",
        linkedin: "https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav",
        email: "subrat.s25547@nst.rishihood.edu.in",
      },
      {
        name: "Chirag Tyagi",
        role: "Events Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG-20250805-WA0002%20-%20Chirag%20Tyagi.jpg?updatedAt=1769665003254",
        linkedin: "https://www.linkedin.com/in/chirag-tyagi-77521037b/",
        email: "chirag.t25126@nst.rishihood.edu.in",
      },
      {
        name: "Hrishabh Prajapati",
        role: "Events Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/WhatsApp%20Image%202026-01-29%20at%2012.08.20.jpeg",
        linkedin: "https://www.linkedin.com/in/hrishabh-prajapati-a50607319/",
        email: "hrishabh.prajapati2024@nst.rishihood.edu.in",
      },
    ],
  },
  {
    title: "Operations Team",
    subtitle: "Orchestrating the Experience",
    members: [
      {
        name: "Chirag Antil",
        role: "Operations Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG_20251219_013526_478(1)%20-%20Chirag%20Antil.jpg?updatedAt=1769665004071",
        linkedin: "https://www.linkedin.com/in/chiragantil",
        email: "chirag.a25125@nst.rishihood.edu.in",
      },
      {
        name: "Akshay Kumar Singh",
        role: "Operations Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG20250617174150%20-%20AKSHAY%20KUMAR%20SINGH.jpg?updatedAt=1769665004661",
        linkedin: "https://www.linkedin.com/in/akshay-kumar-singh-327280374/",
        email: "akshay.s25582@nst.rishihood.edu.in",
      },
      {
        name: "Shlok Srivastava",
        role: "Operations Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG-20251204-WA0062%20-%20Shlok%20Srivastava.jpg?updatedAt=1769665003642",
        linkedin: "https://www.linkedin.com/in/shlok-srivastava-a65906368/",
        email: "shlok.s25434@nst.rishihood.edu.in",
      },
      {
        name: "Jai Shastri",
        role: "Operations Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG_20241031_204404%20-%20Jai%20Shastri.jpg?updatedAt=1769665003813",
        linkedin: "https://www.linkedin.com/in/jai-shastri-46a080380",
        email: "jai.s25689@nst.rishihood.edu.in",
      },
      {
        name: "Akshat Agrawal",
        role: "Operations & Logistics",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG_1416%20-%20Akshat%20Agrawal.jpeg?updatedAt=1769665004260",
        linkedin: "https://www.linkedin.com/in/akshat-agrawal-955347316",
        email: "akshat.agrawal2024@nst.rishihood.edu.in",
      },
    ],
  },
  {
    title: "Decoration Team",
    subtitle: "Orchestrating the Experience",
    members: [
      {
        name: "Mayank Jangra",
        role: "Decor Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/Screenshot%202026-01-12%20at%2012.33.37%E2%80%AFAM%20-%20Mayank%20Jangra.png?updatedAt=1769665003563",
        linkedin: "http://www.linkedin.com/in/mayank-jangra-a3792a387",
        email: "mayank.j25573@nst.rishihood.edu.in",
      },
      {
        name: "Yanshika Rana",
        role: "Decor Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG-20251205-WA0025~2%20-%20Yanshika%20Rana.jpg",
        linkedin: "https://www.linkedin.com/in/yanshika-rana-853171374/",
        email: "yanshika.r25120@csds.rishihood.edu.in",
      },
      {
        name: "Bhavya",
        role: "Decor Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/88a4f051-5a6b-4a7f-94c4-fc29548f1337%20-%20Bhavya.jpeg",
        linkedin: "https://www.linkedin.com/in/bhavya-saini-000561373/",
        email: "bhavya.25019@csds.rishihood.edu.in",
      },
      {
        name: "Aditi",
        role: "Decor Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/IMG_20260123_104330%20-%20Aditi.jpg?updatedAt=1769665003033",
        linkedin: "https://www.linkedin.com/in/aditi-dahiya-190604371",
        email: "aditi.25008@csds.rishihood.edu.in",
      },
      {
        name: "Jivika",
        role: "Decor Team",
        image: "https://ik.imagekit.io/vdigjljlu/Upload%20a%20Clear%20Photograph%20(File%20responses)/Screenshot_2026-01-25-16-33-26-64_99c04817c0de5652397fc8b56c3b3817%20-%20Jivika.jpg?updatedAt=1769665003292",
        linkedin: "https://www.linkedin.com/in/jivika-adlakha-57392a36b",
        email: "jivika.25028@csds.rishihood.edu.in",
      },
    ],
  },
];
const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for perfection in every tournament we organize, ensuring world-class experiences.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building a thriving esports community in Delhi NCR where gamers can connect and grow.",
  },
  {
    icon: Trophy,
    title: "Competition",
    description:
      "Fair play and healthy competition are the foundations of our tournaments.",
  },
  {
    icon: Star,
    title: "Innovation",
    description:
      "Pushing boundaries with cutting-edge production and unique gaming experiences.",
  },
];
// Helper to optimize images from CDN
const getOptimizedImage = (url: string, width = 400) => {
  if (!url) return "";

  // ImageKit Optimization
  if (url.includes("ik.imagekit.io")) {
    if (url.includes("?")) {
      return `${url}&tr=w-${width},q-80,f-auto`;
    }
    return `${url}?tr=w-${width},q-80,f-auto`;
  }

  // Cloudinary Optimization
  if (url.includes("res.cloudinary.com")) {
    // Insert transformation after /upload/
    return url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);
  }

  return url;
};

const About = () => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="pt-32 pb-24 relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              About Us
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
              <GlitchText text="WE ARE QUANTICA" className="text-[40px] md:text-7xl" />
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                OUR <span className="text-secondary">STORY</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Team Sage emerged in September 2025 with a single, unwavering purpose: to redefine the gaming experience. More than an organization, we became a collective driven by passion, precision, and the relentless pursuit of competitive excellence.
                </p>
                <p>
                  By December 2025, that drive evolved into a vision called QUANTICA—a tournament imagined as the ultimate proving ground for gamers across Delhi NCR. What began as an ambitious concept quickly transformed into an obsession: to build something bigger, bolder, and unforgettable.
                </p>
                <p>
                  Defying limitations and expectations, Team Sage turned vision into reality. Now, in February 2026, QUANTICA rises as one of the most anticipated esports spectacles in the region—powered by resilience, fueled by passion, and built for those who live for the game.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="clip-corner overflow-hidden border border-primary">
                <img
                  src={getOptimizedImage("https://ik.imagekit.io/vdigjljlu/E-sports%20DSC09749.JPG?updatedAt=1769276693186", 800)}
                  alt="Gaming Setup"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-secondary" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              What Drives Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              OUR <span className="text-secondary">VALUES</span>
            </h2>
          </motion.div>
          <div className="gap-8">
            <DraggableCardDemo />
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-secondary uppercase tracking-[0.3em] text-sm mb-4">
              Meet The Squad
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase">
              Meet <span className="text-primary">Our Core Team</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden clip-corner mb-4">
                  <img
                    src={getOptimizedImage(member.image)}
                    alt={member.name}
                    className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <div className="flex gap-4 justify-center mt-2">
                  <a
                    href={member.email ? `mailto:${member.email}` : "#"}
                    className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
                  >
                    <FaEnvelope size={20} />
                  </a>
                  <a
                    href={member.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#0077b5] transition-colors hover:scale-110 transform duration-200"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extended Squad Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-secondary uppercase tracking-[0.3em] text-sm mb-4">
              Extended Squad
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase">
              The Players <span className="text-primary">Behind the Game</span>
            </h2>
          </motion.div>

          <div className="space-y-20">
            {additionalTeams.map((teamGroup, groupIndex) => (
              teamGroup.members.length > 0 && (
                <motion.div
                  key={teamGroup.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: groupIndex * 0.1 }}
                >
                  <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {teamGroup.title}
                    </h3>
                    <p className="text-secondary text-sm uppercase tracking-widest">
                      {teamGroup.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-8">
                    {teamGroup.members.map((member, memberIndex) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: memberIndex * 0.1 }}
                        className="group w-full max-w-[280px]"
                      >
                        <div className="relative overflow-hidden clip-corner mb-4">
                          <img
                            src={getOptimizedImage(member.image)}
                            alt={member.name}
                            className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h4 className="text-md font-bold text-foreground">
                          {member.name}
                        </h4>
                        <p className="text-primary text-sm mb-3">{member.role}</p>
                        <div className="flex gap-4 justify-center mt-2">
                          <a
                            href={member.email ? `mailto:${member.email}` : "#"}
                            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
                          >
                            <FaEnvelope size={20} />
                          </a>
                          <a
                            href={member.linkedin || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-[#0077b5] transition-colors hover:scale-110 transform duration-200"
                          >
                            <FaLinkedin size={20} />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </div>

          {additionalTeams.every((team) => team.members.length === 0) && (
            <div className="text-center text-muted-foreground py-12">
              <p className="text-lg">More team members coming soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl md:text-6xl font-bold text-primary mb-2">
                10+
              </p>
              <p className="text-muted-foreground uppercase tracking-wider text-sm">
                Events Hosted
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-4xl md:text-6xl font-bold text-secondary mb-2">
                2K+
              </p>
              <p className="text-muted-foreground uppercase tracking-wider text-sm">
                Players
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-4xl md:text-6xl font-bold text-primary mb-2">
                ₹4L+
              </p>
              <p className="text-muted-foreground uppercase tracking-wider text-sm">
                Prize Distributed
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
export default About;
