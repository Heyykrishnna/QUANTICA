import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, Send } from "lucide-react";
import { useState } from "react";
import PageTransition from "../components/PageTransition";
import GlitchText from "../components/GlitchText";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };
  return (
    <PageTransition>
      { }
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Get In Touch
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              <GlitchText text="CONTACT US" />
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about our tournaments? Want to partner with us?
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">
                LET'S <span className="text-secondary">CONNECT</span>
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center clip-corner-sm flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@quantica.gg</p>
                    <p className="text-muted-foreground">support@quantica.gg</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center clip-corner-sm flex-shrink-0">
                    <Phone className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                    <p className="text-muted-foreground">+91 98765 43211</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center clip-corner-sm flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold mb-1">
                      Location
                    </h3>
                    <p className="text-muted-foreground">
                      Connaught Place, New Delhi
                      <br />
                      Delhi NCR, India - 110001
                    </p>
                  </div>
                </div>
              </div>
              { }
              <div className="mt-12">
                <h3 className="text-foreground font-semibold mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all"
                  >
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
            { }
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form
                onSubmit={handleSubmit}
                className="border border-primary p-8 clip-corner"
              >
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  SEND A <span className="text-primary">MESSAGE</span>
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-muted border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-muted border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full bg-muted border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-muted border border-border px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <button type="submit" className="cyber-btn w-full flex items-center justify-center gap-2">
                    <Send size={18} />
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      { }
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground">
              FIND <span className="text-primary">US</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="border border-primary clip-corner overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3490.152339339759!2d77.08742877568416!3d28.98285646808564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390db1e3451de103%3A0xf3b49ff0baac646f!2sRishihood%20University!5e0!3m2!1sen!2sin!4v1767774791430!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, filter: "grayscale(100%) invert(92%)" }}
              allowFullScreen
              loading="lazy"
              title="QUANTICA Location"
            />
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
export default Contact;
