
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { events } from "@/data/events";
import PageTransition from "../components/PageTransition";
import GlitchText from "../components/GlitchText";
import { Check, ChevronRight, Upload, Phone, Mail, User, MapPin } from "lucide-react";
import toast from "react-hot-toast";

const EventRegistration = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const event = events.find((e) => e.slug === slug);

    const [formData, setFormData] = useState({
        teamName: "",
        teamLeadName: "",
        teamLeadPhone: "",
        teamLeadEmail: "",
        teamLeadIgn: "",
        logoUrl: "",
        dropErangel: "",
        dropMiramar: "",
        dropRondo: "",
        participants: [] as { name: string; ign: string; phone?: string; email?: string, role: string }[],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!event) {
            toast.error("Event not found");
            navigate("/events");
            return;
        }

        // Initialize participants based on game type
        let initialParticipants = [];
        if (event.slug === "bgmi") {
            // 3 Members + 1 Sub (Lead is Player 1)
            initialParticipants = [
                { name: "", ign: "", role: "Player 2" },
                { name: "", ign: "", role: "Player 3" },
                { name: "", ign: "", role: "Player 4" },
                { name: "", ign: "", role: "Substitute (Optional)" },
            ];
        } else if (event.slug === "freefire") {
            // 3 Members + 1 Sub
            initialParticipants = [
                { name: "", ign: "", role: "Player 2" },
                { name: "", ign: "", role: "Player 3" },
                { name: "", ign: "", role: "Player 4" },
                { name: "", ign: "", role: "Substitute (Optional)" },
            ];
        } else if (event.slug === "valorant") {
            // 4 Members + 1 Sub (Lead is Player 1)
            initialParticipants = [
                { name: "", ign: "", role: "Player 2" },
                { name: "", ign: "", role: "Player 3" },
                { name: "", ign: "", role: "Player 4" },
                { name: "", ign: "", role: "Player 5" }, // Valorant is 5v5
                { name: "", ign: "", role: "Substitute (Optional)" },
            ];
        } else {
            // Solo/Knockout - No extra participants needed by default, 
            // Lead is the main player.
            initialParticipants = [];
        }

        setFormData(prev => ({ ...prev, participants: initialParticipants }));

    }, [event, navigate, slug]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleParticipantChange = (index: number, field: string, value: string) => {
        const updatedParticipants = [...formData.participants];
        updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
        setFormData((prev) => ({ ...prev, participants: updatedParticipants }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare payload
            // Lead is implicitly a participant, but backend schema separates teamLead info 
            // We will add lead as a participant in the backend array as well for consistency if needed, 
            // OR just rely on teamLead fields.
            // Let's add lead to participants list for roster completeness if the backend controller logic expects it or separate.
            // The current controller logic creates participants from the array. 
            // We should add the Team Lead as a participant as well.

            const leadParticipant = {
                name: formData.teamLeadName,
                ign: formData.teamLeadIgn,
                email: formData.teamLeadEmail,
                phone: formData.teamLeadPhone,
                role: "Team Leader"
            };

            const finalParticipants = [leadParticipant, ...formData.participants.filter(p => p.name.trim() !== "")];

            const payload = {
                name: formData.teamName || formData.teamLeadName, // For solo, team name can be player name
                eventId: event?.slug, // Using slug as ID for now or need to map to real ID? 
                // WAIT -> Schema uses UUID for Relation. We need the real Event UUID from Database, not Slug.
                // Frontend 'events' data file has slugs. Backend has UUIDs.
                // We might need to lookup Event ID by Slug on backend or fetch event by slug first.
                // CURRENT CONTROLLER expects `eventId`. 
                // We will need to update the controller to Look up by Slug OR fetch ID here.
                // Let's assume we need to pass the slug and backend handles it OR we fetch ID first.
                // Let's UPDATE Controller to find event by Slug if UUID fails, OR just pass slug if we change schema? 
                // No, Schema relates to Event.id (UUID). 
                // Let's fetch the Event ID first? Or simpler: Modify Controller to accept `eventSlug`.

                // Refined Plan: Update Controller to find event by `slug` if `eventId` is not a UUID.
                // For now, let's assume we will update controller to handle slug lookup.
                eventSlug: slug,

                teamLeadName: formData.teamLeadName,
                teamLeadPhone: formData.teamLeadPhone,
                teamLeadEmail: formData.teamLeadEmail,
                teamLeadIgn: formData.teamLeadIgn,
                logoUrl: formData.logoUrl,
                dropErangel: formData.dropErangel,
                dropMiramar: formData.dropMiramar,
                dropRondo: formData.dropRondo,
                participants: finalParticipants
            };

            const response = await fetch("http://localhost:5000/api/teams/register", { // Need new endpoint or use create
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Registration failed");

            toast.success("Registration Successful!");
            navigate("/events");
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!event) return null;

    return (
        <PageTransition>
            <section className="min-h-screen pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="container mx-auto px-4 relative z-10 max-w-4xl">

                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <GlitchText text={`REGISTER FOR ${event.title.toUpperCase()}`} />
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Complete your squad details to enter the arena.
                        </p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-8 bg-card border border-border p-6 md:p-10 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600" />

                        {/* Team Details */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                                <User className="w-6 h-6" />
                                Team & Leader Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Team Name (or Player Name for Solo)</label>
                                    <input
                                        required
                                        name="teamName"
                                        value={formData.teamName}
                                        onChange={handleChange}
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="Enter Team Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Team Logo URL (Optional)</label>
                                    <input
                                        name="logoUrl"
                                        value={formData.logoUrl}
                                        onChange={handleChange}
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Leader Name</label>
                                    <input
                                        required
                                        name="teamLeadName"
                                        value={formData.teamLeadName}
                                        onChange={handleChange}
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">In-Game Name (IGN)</label>
                                    <input
                                        required
                                        name="teamLeadIgn"
                                        value={formData.teamLeadIgn}
                                        onChange={handleChange}
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="Your IGN"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                                    <input
                                        required
                                        name="teamLeadPhone"
                                        value={formData.teamLeadPhone}
                                        onChange={handleChange}
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="+91..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        name="teamLeadEmail"
                                        value={formData.teamLeadEmail}
                                        onChange={handleChange}
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Drop Locations (BGMI Only) */}
                        {slug === 'bgmi' && (
                            <div className="space-y-6 pt-6 border-t border-border">
                                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                                    <MapPin className="w-6 h-6" />
                                    Drop Locations
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Erangel Drop</label>
                                        <input
                                            required
                                            name="dropErangel"
                                            value={formData.dropErangel}
                                            onChange={handleChange}
                                            className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            placeholder="e.g. Pochinki"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Miramar Drop</label>
                                        <input
                                            required
                                            name="dropMiramar"
                                            value={formData.dropMiramar}
                                            onChange={handleChange}
                                            className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            placeholder="e.g. Pecado"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Rondo Drop</label>
                                        <input
                                            required
                                            name="dropRondo"
                                            value={formData.dropRondo}
                                            onChange={handleChange}
                                            className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            placeholder="e.g. Jaden City"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Squad Members */}
                        {formData.participants.length > 0 && (
                            <div className="space-y-6 pt-6 border-t border-border">
                                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                                    <User className="w-6 h-6" />
                                    Squad Members
                                </h2>

                                {formData.participants.map((member, index) => (
                                    <div key={index} className="bg-background/50 p-4 rounded-lg border border-border">
                                        <h3 className="text-sm font-bold text-muted-foreground mb-3">{member.role}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                required={!member.role.includes('Optional')}
                                                placeholder="Player Name"
                                                value={member.name}
                                                onChange={(e) => handleParticipantChange(index, "name", e.target.value)}
                                                className="bg-background border border-border rounded px-3 py-2 text-sm focus:border-primary outline-none"
                                            />
                                            <input
                                                required={!member.role.includes('Optional')}
                                                placeholder="In-Game Name (IGN)"
                                                value={member.ign}
                                                onChange={(e) => handleParticipantChange(index, "ign", e.target.value)}
                                                className="bg-background border border-border rounded px-3 py-2 text-sm focus:border-primary outline-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary text-primary-foreground font-bold text-lg uppercase tracking-wider py-4 rounded-lg hover:bg-primary/90 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>Processing...</>
                                ) : (
                                    <>Complete Registration <ChevronRight className="w-5 h-5" /></>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </section>
        </PageTransition>
    );
};

export default EventRegistration;
