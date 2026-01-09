import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const faqs = [
  {
    category: "Registration",
    questions: [
      {
        question: "How do I register my team for a tournament?",
        answer:
          "Registration is quick and easy! Head to the Events page, choose your desired tournament, and click Register Now. You’ll be redirected to Upstop, where you’ll need to fill in your team details, player IGNs, and contact information. Please ensure that all team members have valid IDs before registering.",
      },
      {
        question: "What is the registration fee?",
        answer:
          "There is no registration fee to participate. All tournaments hosted by us are completely free to enter. Simply register your team through the Events page and follow the provided instructions to complete your registration.",
      },
      {
        question: "Can I change my team members after registration?",
        answer:
          "No, team rosters are final once registration is completed. Please ensure that all player details are accurate before submitting your registration, as no changes or substitutions will be permitted after registration.",
      },
      {
        question: "Is there an age limit for participants?",
        answer:
          "Yes. The tournament is open to school and college students, as well as other eligible participants under the age of 28. All players must carry a valid government-issued ID or institutional ID for verification during check-in.",
      },
    ],
  },
  {
    category: "Rules & Gameplay",
    questions: [
      {
        question: "What devices are allowed/provided?",
        answer:
          "For mobile tournaments (BGMI, Free Fire, Clash Royale), only mobile phones are allowed - no tablets/iPads. Players must use their own devices. For PC/Console titles (Valorant, Tekken 8, EAFC, F1), high-end equipment is provided at the venue.",
      },
      {
        question: "What happens if a player disconnects during a match?",
        answer:
          "If a player disconnects, the match will continue. Teams are given a 5-minute grace period to reconnect. If the issue persists, our technical team will assess whether a rematch is warranted. This decision is final.",
      },
      {
        question: "What behavior can lead to disqualification?",
        answer:
          "Disqualification can result from: use of hacks/cheats, teaming with opponents, abusive behavior, failure to check-in on time, using unauthorized devices, or any form of match-fixing. All decisions by referees are final.",
      },
    ],
  },
  {
    category: "Prizes & Rewards",
    questions: [
      {
        question: "How and when are prizes distributed?",
        answer:
          "Winners need to provide valid bank account details and complete KYC verification.",
      },
      {
        question: "What other rewards are there besides prize money?",
        answer:
          "Winners receive exclusive QUANTICA merchandise, gaming peripherals from sponsors, certificates, trophies, and potential recruitment opportunities with professional esports organizations.",
      },
    ],
  },
  {
    category: "Venue & Logistics",
    questions: [
      {
        question: "Is the tournament online or LAN?",
        answer:
          "QUANTICA hosts hybrid tournaments. Qualifiers are conducted online, while finals are LAN events held at premium venues in Delhi NCR. This ensures accessibility while providing an electrifying finals experience.",
      },
      {
        question: "Is accommodation provided for outstation teams?",
        answer:
          "Accommodation is not provided directly, but we have partnered hotels offering discounted rates for participants. Details will be shared with teams that qualify for LAN finals.",
      },
      {
        question: "What should I bring on match day?",
        answer:
          "For LAN events: Valid government ID, your registered mobile device (if applicable, fully charged), earphones/headphones, charger, and a positive attitude! For PC titles, standard peripherals are provided, but you may bring your own mouse/keyboard/headset if compatible.",
      },
    ],
  },
];
const FAQSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Got Questions?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            FREQUENTLY ASKED <span className="text-secondary">QUESTIONS</span>
          </h2>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold text-primary mb-4 uppercase tracking-wider">
                {category.category}
              </h3>
              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((faq, index) => (
                  <div key={index} className="cursor-target w-full border border-border bg-card/50 transition-colors data-[state=open]:border-primary overflow-hidden">
                    <AccordionItem
                      value={`${category.category}-${index}`}
                      className=""
                    >
                      <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-4 px-6">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 px-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
        { }
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="cyber-btn-outline inline-block"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};
export default FAQSection;
