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
          "Registration is simple! Navigate to the Events page, select your desired tournament, and click 'Register Now'. You'll be redirected to our Google Forms registration where you need to fill in team details, player IGNs, and contact information. Make sure all team members have valid IDs.",
      },
      {
        question: "What is the registration fee?",
        answer:
          "Registration fees vary by tournament: BGMI Championship - ₹500/team, Valorant Masters - ₹750/team, Free Fire League - ₹400/team. Payment instructions will be provided after form submission. Early bird discounts may apply!",
      },
      {
        question: "Can I change my team members after registration?",
        answer:
          "Yes, you can make roster changes up to 24 hours before the tournament begins. Contact our support team with the original team leader's details and the new player information. A maximum of 2 substitutions are allowed.",
      },
      {
        question: "Is there an age limit for participants?",
        answer:
          "Yes, participants must be at least 15 years old for Free Fire, and 16 years old for BGMI and Valorant tournaments. Valid government ID proof will be required during check-in.",
      },
    ],
  },
  {
    category: "Rules & Gameplay",
    questions: [
      {
        question: "What devices are allowed for mobile tournaments?",
        answer:
          "For BGMI and Free Fire, only mobile phones are allowed - no tablets, iPads, or emulators. Players must use their own devices. External triggers, gamepads, or any physical attachments are strictly prohibited.",
      },
      {
        question: "What happens if a player disconnects during a match?",
        answer:
          "If a player disconnects, the match will continue. Teams are given a 5-minute grace period to reconnect. If the issue persists, our technical team will assess whether a rematch is warranted. This decision is final.",
      },
      {
        question: "How are tie-breakers handled?",
        answer:
          "Tie-breakers are resolved based on: 1) Total kills, 2) Average placement, 3) Head-to-head results, 4) Chicken dinners/wins. If still tied, a sudden death match will be played.",
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
          "Prize money is distributed within 7-14 business days after the tournament concludes. Winners need to provide valid bank account details and complete KYC verification. Physical prizes (if any) will be shipped within 30 days.",
      },
      {
        question: "Are there any taxes on prize money?",
        answer:
          "Yes, TDS (Tax Deducted at Source) of 30% will be deducted on prizes exceeding ₹10,000 as per Indian tax laws. Winners will receive Form 16A for tax filing purposes.",
      },
      {
        question: "What other rewards are there besides prize money?",
        answer:
          "Winners receive exclusive QUANTICA merchandise, gaming peripherals from sponsors, certificates, trophies, and potential recruitment opportunities with professional esports organizations. Top performers may also get streaming deals!",
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
          "For LAN events: Valid government ID, your registered mobile device (fully charged), earphones/headphones, charger, and a positive attitude! For Valorant, PCs are provided at the venue.",
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
                  <AccordionItem
                    key={index}
                    value={`${category.category}-${index}`}
                    className="border border-border bg-card/50 px-6 data-[state=open]:border-primary transition-colors"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
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
