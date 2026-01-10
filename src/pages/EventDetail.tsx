import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  Clock,
  Check,
  ArrowLeft,
  Ticket,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import GlitchText from "../components/GlitchText";
const eventData = {
  bgmi: {
    title: "BGMI 2026",
    game: "BGMI",
    tagline: "The Ultimate Battle Royale Showdown",
    date: "7-8 Feb 2026",
    time: "10:00 AM - 8:00 PM",
    location: "Rishihood University, Delhi NCR",
    prizePool: "₹40,000",
    teams: "64",
    format: "Squad (4 Players)",
    entryFee: "Free",
    image: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1768036375/bgmi_xs2dud.jpg",
    color: "cyan",
    prizeDistribution: [
      { place: "1st Place", prize: "₹20,000" },
      { place: "2nd Place", prize: "₹12,500" },
      { place: "3rd Place", prize: "₹7,500" },
    ],
    rules: [
      "All players must be 16+ years old",
      "Each team must have 4 players + 1 substitute",
      "No emulators or controller support allowed",
      "Players must use their registered devices only",
      "Match results are final and binding",
    ],
    schedule: [
      { day: "Jan 25 - Feb 7", events: "Online Qualifiers" },
      { day: "Day 1 (Feb 7)", events: "Semi Finals" },
      { day: "Day 2 (Feb 8)", events: "Finals" },
    ],
    registerLink: "#register",
    rulebook: "/rulebook/bgmi-rules.pdf",
    rulebookText: `QUANTICA FEST
BGMI Rulebook
Welcome to the BGMI tournament. Our goal is to have a fun, fair, and competitive event for
everyone. All participants are expected to read and abide by the following rules.

Common Rules & Regulations
1. Identity Verification
All players must carry a valid Aadhaar Card and School/College ID for verification.
Failure to produce these documents when asked may result in disqualification.
2. Damage to Property
Any damage caused to equipment, venue assets, or college property by an
individual or team will be the full responsibility of the respective team, and
necessary compensation must be provided.
3. Misconduct & Physical Altercations
Any involvement in physical fights, aggressive behavior, or serious misconduct
will result in strict action, including disqualification or further penalties, as decided
by the Organising Team.
4. Team Name Guidelines
Team names must be appropriate and respectful. Names that are abusive,
offensive, or hurt religious sentiments, individuals, or communities are strictly
prohibited and may lead to disqualification.
5. Authority of the Organising Team
The Organising Team reserves the right to modify, amend, or introduce new
rules at any time if required.
All decisions made by the Organising Team will be final and binding in any matter.
6. Prohibited Substances
The consumption or possession of intoxicating substances, including alcohol, is
strictly prohibited within the campus premises. Violation will result in immediate
disciplinary action.

1. General Rules
● Eligibility: all players under the age of 28.
● Code of Conduct:
○ Sportsmanship: All players are expected to show good sportsmanship. Be respectful
to fellow competitors and tournament organizers. Toxicity, harassment, or hate
speech will not be tolerated and will result in immediate disqualification.
○ Competitive Integrity: Play to the best of your ability in every match. Intentionally
losing, splitting prize money with other teams (collusion), or any form of match-fixing
is strictly forbidden.
● Organizer's Authority: All decisions regarding rule interpretation, player eligibility, and
penalties are at the sole discretion of the tournament organizers. All decisions are final.

2. Team & Player Rules
● Roster Requirements:
○ Each team must consist of 4 starting players.
○ Teams can optionally register up to 1 substitute players.
○ The roster submitted at the time of registration is final. No changes will be allowed
once the tournament begins, except in emergency situations approved by the
organizers.
● Player Names (In-Game Name/IGN):
○ Your in-game name should be appropriate and non-offensive.
○ It is recommended to use the format: TeamTagPlayerName (e.g., SAGEJohn).
● Team Names:
○ Team names must be unique and appropriate. Offensive names will be rejected.
○ Team names cannot impersonate professional organizations without permission.

3. In-Game Rules & Match Format
Match Settings
● Mode: Third Person Perspective (TPP)
● Maps: Erangel, Miramar, Rondo
● Aim Assist: Disabled
● Sound Visualization: Disabled
● Disabled Items: Red Zone & Flare Guns
● Loot: All Weapons, Scopes, and Magazines spawn rate set to x3.

Scoring System
Points are awarded based on placement and finishes in each match.
● Placement Points:
○ 1st Place: 10 points
○ 2nd Place: 6 points
○ 3rd Place: 5 points
○ 4th Place: 4 points
○ 5th Place: 3 points
○ 6th Place: 2 points
○ 7th - 8th Place: 1 point
○ 9th - 16th Place: 0 points
● Finish Points: Each finish (kill) is worth 1 point.

Tiebreaker Rules
If two teams have the same total points, the tie will be broken in the following order:
1. Total number of Chicken Dinners (1st place finishes).
2. Total accumulated placement points.
3. Total accumulated finish points.
4. Placement in the most recent match.

4. Prohibited Actions & Fair Play
● No Cheating: Using any kind of cheating hardware, third-party software, hacks, mods, or
cheat programs is strictly prohibited. This includes using emulators to play on a PC.
● No Exploiting Bugs: Intentionally using any in-game bug or glitch to gain an unfair
advantage is forbidden.
● Use of self aid and emergency pickup is not allowed. Teams using these will get 0
points for that match.
● Authorized Devices: All games must be played on mobile phones or other handheld
devices. Peripherals like controllers, adapters, or Bluetooth keyboards are not allowed.

5. Competitive Integrity: POV Recording
To ensure a fair playing field, all players are required to record their in-game point-of-view
(POV) for every match.
● How to Record: Use your device's built-in screen recorder. Third-party recording apps
are not allowed.
● Submission: Tournament organizers may request your POV recording at any time to
investigate cheating allegations.
● Penalty: Failure to provide a requested POV recording may result in point deductions or
disqualification for your team.

6. Match Procedures
● Lobby Information: Lobby ID and password will be shared with the Team Captain before
each match.
● For qualified teams : Players are not permitted to leave their assigned positions until the
match has officially ended, unless allowed by the organising team.
● Peeking, screen-watching, or any form of visual assistance from opponents’ screens
is prohibited and will be treated as a serious violation.
● Punctuality: Teams are expected to be in the lobby and ready at the scheduled time.
Delays may result in penalties.
● Disconnects & Restarts:
○ The tournament organizers may restart a match if multiple players face technical
issues or disconnects at the very beginning of the game.
○ Once the game has progressed, it will not be restarted for individual player
disconnections. Players who disconnect may attempt to rejoin the match.

Good luck to all participating teams! Let's have a great tournament. 🏆`
  },
  valorant: {
    title: "Valorant",
    game: "Valorant",
    tagline: "Tactical Shooter Excellence",
    date: "7-8 Feb 2026",
    time: "11:00 AM - 9:00 PM",
    location: "Rishihood University, Delhi NCR",
    prizePool: "₹15,000",
    teams: "32",
    format: "5v5 Teams",
    entryFee: "Free",
    image: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1768036269/valorant_wvxtwf.jpg",
    color: "magenta",
    prizeDistribution: [
      { place: "1st Place", prize: "₹10,000" },
      { place: "2nd Place", prize: "₹5,000" },
    ],
    rules: [
      "All players must be 16+ years old",
      "Each team must have 5 players + 1 coach (optional)",
      "PC provided at venue - no personal peripherals",
      "Standard competitive map pool",
      "Anti-cheat software mandatory",
    ],
    schedule: [
      { day: "Jan 25 - Feb 7", events: "Online Qualifiers" },
      { day: "Day 1 (Feb 7)", events: "Playoffs" },
      { day: "Day 2 (Feb 8)", events: "Semi Finals & Finals" },
    ],
    registerLink: "#register",
    rulebook: "/rulebook/valorant-rules.pdf",
    rulebookText: `QUANTICA FEST – VALORANT
TOURNAMENT

OFFICIAL RULEBOOK

1. GAME & TOURNAMENT STRUCTURE
● Game: VALORANT (Riot Games)
● Tournament Format: Single Elimination
● Match Type: 5v5
● Roster Limit: Maximum 7 players
○ 5 Starting Players
○ Up to 2 Substitutes
● Eligibility:
○ Open to Indian citizens only
○ Players must comply with Riot Games’ Terms of Service
● Communication Platform:
○ Discord is mandatory for all participating teams
○ All official announcements, match coordination, and admin communication will
take place via Discord

2. TOURNAMENT SCHEDULE
● Registrations: To be announced by Quantica Fest Organizers
● Tournament Start Date: To be announced
● Match Schedule:
○ Shared on Discord prior to match day
○ Teams are responsible for tracking their match timings

3. MATCH EXECUTION & CHECK-IN
3.1 Joining the Match

● Teams must join the Quantica Fest Discord 30 minutes before their scheduled match
time
● Match lobby details will be shared with team captains only
● Captains must distribute lobby information to teammates
Late Arrival Rule
● 10-minute grace period from scheduled match time
● Failure to join within this time results in automatic disqualification
No-Show Proof
● In case the opponent does not show up:
○ Capture a lobby screenshot with timestamp
○ Submit it in the designated #results channel

3.2 Preparation & Substitutions
● Minimum 15 minutes break between consecutive matches
● Full team must be present in the lobby 10 minutes before match start
● Substitutions:
○ Must be communicated to admins at least 1 hour in advance

4. MATCH RULES
4.1 Match Format
● Best of 1 (BO1): All matches except Semi-Finals & Finals
● Best of 3 (BO3): Semi-Finals and Grand Finals

4.2 Map Pool
● Ascent
● Haven
● Bind
● Lotus
● Sunset
● Corrode

(Maps will be assigned by the organisers. No map veto process will be followed.)

4.3 In-Game Settings
● Game Mode: Tournament Mode
● Win Condition:
○ First team to reach 13 rounds wins the match
○ No overtime will be played
● Warmup Time: 5 minutes
● Agent Select: Locked once match begins
● Agent Control Freeze: Enabled during pauses

4.4 Game of Record (GoR)
A match is officially considered Game of Record when:
● All 10 players have joined the lobby
● Map is loaded and freeze time has ended
Restart Conditions
● In case of restart, score resets to 0–0
● Freeze time must expire again before GoR is re-established

5. PLAYER ELIGIBILITY & TECHNICAL ISSUES
● Minimum Players Required: 5 starting players
● Minimum Account Level: Level 25
● Rank Eligibility: Iron to Radiant (All ranks allowed)
Disconnect Rules
● Before first kill or spike plant (Round 1): Round restart
● After Round 1:
○ Technical pause will be initiated
○ If the player cannot reconnect:
■ Match continues 4v5
■ If players drop below 4 → match forfeit

6. GAMEPLAY RESTRICTIONS
6.1 Strictly Prohibited
● Exploits:
○ Pixel walking
○ Clipping
○ Spike sound abuse
○ Unintended map boosts
● Third-Party Software:
○ Scripts
○ Modified game files
○ HUD / radar / sprite alterations
○ Discord or RivaTuner overlays
○ FPS counters are allowed
● Communication Abuse:
○ Harassment or offensive language
○ Non-game-related communication during live rounds

6.2 Pauses & Timeouts
● Technical Pauses:
○ Maximum 5 minutes per match
● Timeouts:
○ 2 per map
○ 60 seconds each
○ Can only be used during buy phase
● Emergency Pause:
○ 1 per map
○ Maximum 10 minutes
○ Subject to admin review

7. COACHING & SPECTATING
Coaches
● Allowed with prior declaration

● Communication allowed only during:
○ Timeouts
○ Half-time
○ Map switches (BO3 only)

Spectators
● Only Quantica Fest staff are allowed in streamed matches

8. CONDUCT, REPORTING & PENALTIES
8.1 Player Conduct
Any form of the following will result in penalties or bans:
● Racism or hate speech
● Cheating or hacking
● Bug abuse
● Match sabotage
● Misconduct toward admins, referees, or players

8.2 Reporting Violations
● Email: contact@quanticafest.fun
● Include:
○ Match date & time
○ Lobby details
○ Player/team involved
○ Screenshots or video proof

8.3 Team Responsibilities
● Captain Responsibilities:
○ Sole point of contact with organisers
○ Result verification with screenshots
○ Relaying all official communication to team members
○ Signing off on team decisions
● Naming Policy:

○ No offensive, abusive, or trademarked names allowed

9. DISPUTE RESOLUTION
● All disputes will be reviewed by Quantica Fest Organising Team
● Decisions taken by organisers and referees are final and binding
● Players will be given a fair opportunity to present their case
● Appeals after final judgment are not permitted

10. COMMON RULES & REGULATIONS
Identity Verification
● All players must carry a valid Aadhaar Card and College ID for verification
● Failure to produce these documents when asked may result in disqualification
Damage to Property
● Any damage caused to equipment, venue assets, or college property by an individual or
team will be the full responsibility of the respective team
● Necessary compensation must be provided
Misconduct & Physical Altercations
● Any involvement in physical fights, aggressive behavior, or serious misconduct will result
in strict action, including disqualification or further penalties as decided by the
Organising Team
Team Name Guidelines
● Team names must be appropriate and respectful
● Names that are abusive, offensive, or hurt religious sentiments, individuals, or
communities are strictly prohibited
● Violations may lead to immediate disqualification
Authority of the Organising Team
● The Organising Team reserves the right to modify, amend, or introduce new rules at
any time

● All decisions made by the Organising Team will be final and binding
Prohibited Substances
● Consumption or possession of alcohol or intoxicating substances is strictly prohibited
within the campus premises
● Violations will result in immediate disciplinary action

11. GENERAL PROTOCOLS
● Players with active Riot Games or tournament bans are ineligible
● Teams found violating this will be immediately disqualified
● Intentional match fixing or throwing is strictly prohibited and will result in bans`,
  },
  freefire: {
    title: "Free Fire MAX",
    game: "Free Fire",
    tagline: "The Ultimate Survival Challenge",
    date: "7-8 Feb 2026",
    time: "10:00 AM - 7:00 PM",
    location: "Rishihood University, Delhi NCR",
    prizePool: "₹20,000",
    teams: "48",
    format: "Squad (4 Players)",
    entryFee: "Free",
    image: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1768036270/ff_bclrl6.jpg",
    color: "cyan",
    prizeDistribution: [
      { place: "1st Place", prize: "₹10,000" },
      { place: "2nd Place", prize: "₹6,000" },
      { place: "3rd Place", prize: "₹4,000" },
    ],
    rules: [
      "All players must be 15+ years old",
      "Each team must have 4 players",
      "Mobile devices only - no tablets",
      "No external triggers or accessories",
      "Fair play policy strictly enforced",
    ],
    schedule: [
      { day: "Jan 25 - Feb 7", events: "Online Qualifiers" },
      { day: "Day 1 (Feb 7)", events: "Semi Finals" },
      { day: "Day 2 (Feb 8)", events: "Finals" },
    ],
    registerLink: "#register",
    rulebook: "/rulebook/freefire-rules.pdf",
    rulebookText: `QUANTICA FEST
FREEFIRE MAX Rulebook
Common Rules & Regulations
1. Identity Verification
All players must carry a valid Aadhaar Card and School/College ID for verification.
Failure to produce these documents when asked may result in disqualification.
2. Damage to Property
Any damage caused to equipment, venue assets, or college property by an
individual or team will be the full responsibility of the respective team, and
necessary compensation must be provided.
3. Misconduct & Physical Altercations
Any involvement in physical fights, aggressive behavior, or serious misconduct
will result in strict action, including disqualification or further penalties, as decided
by the Organising Team.
4. Team Name Guidelines
Team names must be appropriate and respectful. Names that are abusive,
offensive, or hurt religious sentiments, individuals, or communities are strictly
prohibited and may lead to disqualification.
5. Authority of the Organising Team
The Organising Team reserves the right to modify, amend, or introduce new
rules at any time if required.
All decisions made by the Organising Team will be final and binding in any matter.
6. Prohibited Substances
The consumption or possession of intoxicating substances, including alcohol, is
strictly prohibited within the campus premises. Violation will result in immediate
disciplinary action.
1. General Rules & Eligibility
● 1.1. Game Title:
The official game title for this tournament is FreeFire MAX (FFM) on the Mobile
(iOS/Android) platform.

● 1.2. Acceptance of Rules:
By registering, all participants agree to have read, understood, and accepted these
regulations.
● 1.3. Eligibility: all players under the age of 28.
● 1.4. Team Roster:
○ Teams must submit their final roster before the registration period closes. Any
changes after this are at the sole discretion of the organizers.
○ Players are not permitted to register with multiple teams or on multiple accounts.
● 1.5. Registration Information:
Every player must fill out their registration form with complete and accurate information.
Providing false or incorrect information can lead to disqualification.

2. Tournament Format & Scoring
(Note: The provided ESFI document states that specific match rules are published separately.
The following is a standard competitive format that can be used for your finals.)
● 2.1. Map Rotation: Bermuda, Purgatory, Kalahari, Alpine, Nexetera,solara.
● 2.2. Scoring System:
1. Kill Points: 1 point per kill.
2. Placement Points:
■ 1st Place (Booyah): 12 Points
■ 2nd Place: 9 Points
■ 3rd Place: 8 Points
■ 4th Place: 7 Points
■ 5th Place: 6 Points
■ 6th Place: 5 Points
■ 7th Place: 4 Points
■ 8th Place: 3 Points
■ 9th Place: 2 Points
■ 10th Place: 1 Point

● 2.3. Tiebreaker: In the event of a tie, the winner will be determined in the following
order:
1. Total number of Booyahs.
2. Total kill count.
3. Best placement in the final match.

3. Player Conduct

All players must conduct themselves in a professional and fair manner at all times. Failure to
adhere to these conduct rules will result in penalties.
● 3.1. Prohibited Actions & Behavior:
○ Cheating and Hacking: There is a zero-tolerance policy for cheating. Using
cheats, exploits, bots, hacks, mods, or any unauthorized software designed to
modify or interfere with the game is strictly prohibited.
○ Unfair Play: Throwing a match, intentionally halting play, or showing a clear lack
of effort is a violation of conduct.
○ Vulgarity and Abuse: Any form of vulgarity, abuse, or dissent towards
administrators, spectators, or other players will not be tolerated.
○ Harassment and Discrimination: Abuse, bullying, harassment (including
sexual/verbal), and discrimination on the basis of sex, caste, race, or religion will
be taken with utmost seriousness.
○ Impersonation: Attempting to impersonate another player is strictly prohibited.
○ Illegal Substances: The use of alcohol, illegal drugs, or any
performance-enhancing drugs is strictly prohibited.

4. Penalties for Misconduct
● 4.1. Right to Penalize:
If any of these regulations are violated, tournament organizers reserve the right to
impose penalties. The player(s) in question will be given an opportunity to be heard
before a final decision is made.
● No Exploiting Bugs: Intentionally using any in-game bug or glitch to gain an unfair
advantage is forbidden.
● 4.2. Applicable Penalties:
Penalties may be applied individually or in combination and include:
○ A formal warning or reprimand.
○ Forfeiture of a game or the entire tournament.
○ Disqualification of the player or the entire team from the tournament.
○ A ban from future tournaments hosted by the club, either temporarily or
permanently.

On-Site Player Conduct
1. Remain Seated: Players must remain seated for the entire duration of a match. Getting
up or leaving the designated play area is not allowed. In case of a critical issue or
emergency, the player must raise their hand and get explicit permission from a
tournament moderator before leaving their seat.

2. Screen Integrity: Peeking or attempting to look at the screen or device of another team
is strictly forbidden and will be considered an act of cheating.
Remote Player Integrity For any player competing from a location outside the campus venue, it
is mandatory to have both a face/handcam recording running for the entire duration of every
match. These recordings must be made available to the organizers upon request.
Section Z: Code of Conduct & Prohibited Actions
Z.1 Anti-Collusion Policy Teaming up with an opposing team or intentionally "donating" kills to
another team, is a severe violation of competitive integrity. Any team found guilty of such actions
will face immediate disqualification. This penalty will result in all associated teams being
disqualified from the tournament.
Further please refer to the general rules from ESFI’s rulebook.`,
  },
  efootball: {
    title: "EFootball",
    game: "EFootball",
    tagline: "The Ultimate Battle Royale Showdown",
    date: "7-8 Feb 2026",
    time: "10:00 AM - 8:00 PM",
    location: "Rishihood University, Delhi NCR",
    prizePool: "₹5,000",
    teams: "64",
    format: "1v1",
    entryFee: "Free",
    image: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1768036270/efootball_ohpdk8.jpg",
    color: "cyan",
    prizeDistribution: [
      { place: "1st Place", prize: "₹2,500" },
      { place: "2nd Place", prize: "₹1,500" },
      { place: "3rd Place", prize: "₹1,000" },
    ],
    rules: [
      "All players must be 16+ years old",
      "1v1 Format",
      "No emulators or controller support allowed",
      "Players must use their registered devices only",
      "Match results are final and binding",
    ],
    schedule: [
      { day: "Jan 25 - Feb 7", events: "Online Qualifiers" },
      { day: "Day 1 (Feb 7)", events: "Playoffs" },
      { day: "Day 2 (Feb 8)", events: "Semi Finals & Finals" },
    ],
    registerLink: "#register",
    rulebook: "/rulebook/efootball-rules.pdf",
    rulebookText: `QUANTICA FEST

eFootballTM Mobile – Tournament Rules &
Regulations
These rules are aligned with official eFootballTM Mobile competitive tournament standards
and must be strictly followed by all participants.

1. Game & Platform
● Game Title: eFootballTM Mobile (Latest Version)
● Platform: Android / iOS
● Match Format: 1v1
● Game Mode: Dream Team / Authentic Match (as announced by organisers)
● Players must ensure the game is updated to the latest official version.

2. Match Settings
● Match Time: Standard (default in-game settings)
● Difficulty Level: Top Player / Superstar (as decided by organisers)
● Camera & Visual Settings: Player’s choice

⚠️ Any unauthorised change to match settings may result in penalties or disqualification.

3. Team & Squad Rules
● Only official in-game squads and players are allowed.
● Use of edited teams, modded squads, or hacked accounts is strictly prohibited.
● Squad selection must be finalised before the match starts.
● Squad changes after kickoff are not permitted.

4. Controls & Devices
● Touch controls are allowed.
● Use of emulators, macros, scripts, third-party apps, or plugins is strictly prohibited.
● Any violation will result in immediate disqualification.

5. Defensive Clear Limit (Official Rule)
● Defensive clearances are strictly limited as per official eFootballTM Mobile tournament
rules.
● A player may use the Clear option only a limited number of times (maximum 3
clears per half).
● Excessive clearing to waste time or avoid gameplay is prohibited.
● Violation of this rule may result in:
○ Official warning
○ Match penalty or goal awarded to opponent
○ Match forfeit (for repeated offences)

6. Fair Play & Match Conduct
● Intentional time-wasting is prohibited.
● Exploiting AI behavior, mechanics, or glitches is not allowed.
● Players must maintain continuous and fair gameplay at all times.

7. Disconnections & Network Issues
● Players are responsible for stable internet connectivity.
● Disconnection before halftime may result in a rematch.
● Disconnection after halftime will be reviewed by match officials.
● Intentional disconnection = Immediate disqualification

8. Cheating & Exploits
The following actions are strictly prohibited:
● Use of glitches, bugs, or unintended mechanics
● Lag switching or network manipulation
● Third-party software or modified game files

Any violation will lead to immediate disqualification.

9. Common Rules & Regulations

9.1 Identity Verification
All players must carry a valid Aadhaar Card and College ID for verification. Failure to produce
these documents when requested may result in disqualification.

9.2 Damage to Property
Any damage caused to equipment, venue assets, or college property by an individual or
team will be the full responsibility of the respective team, and necessary compensation must
be provided.

9.3 Misconduct & Physical Altercations
Any involvement in physical fights, aggressive behavior, or serious misconduct will result in
strict disciplinary action, including disqualification or further penalties, as decided by the
Organising Team.

9.4 Team Name Guidelines
Team names must be appropriate and respectful. Names that are abusive, offensive, or
harmful to religious sentiments, individuals, or communities are strictly prohibited and may
lead to disqualification.

9.5 Authority of the Organising Team
The Organising Team reserves the right to modify, amend, or introduce new rules at any time
if required.
All decisions made by the Organising Team shall be final and binding in all matters.

9.6 Prohibited Substances
The consumption or possession of intoxicating substances, including alcohol, is strictly
prohibited within the campus premises. Any violation will result in immediate disciplinary
action, including removal from the tournament.

10. Penalty & Warning System
10.1 Warning Structure
● First Offence: Official Warning
● Second Offence: Match Penalty / Goal Awarded
● Third Offence: Match Forfeit or Disqualification

10.2 Penalty Table

Violation Penalty
Excessive defensive clears Warning → Match Penalty
Use of exploits or glitches Immediate Disqualification
Emulator or third-party tools Immediate Disqualification
Intentional disconnection Immediate Disqualification
Unsportsmanlike conduct Warning → Disqualification
Physical altercation Immediate Disqualification
Property damage Compensation + Possible Disqualification
Use of intoxicants Immediate Disqualification

11. Final Authority
The Organising Team and Match Officials reserve complete authority over all tournament
matters. All decisions shall be final and binding, and no disputes will be entertained after
match completion.`,
  },
  tekken8: {
    title: "Tekken 8",
    game: "Tekken 8",
    tagline: "Tactical Shooter Excellence",
    date: "7-8 Feb 2026",
    time: "11:00 AM - 9:00 PM",
    location: "Rishihood University, Delhi NCR",
    prizePool: "₹5,000",
    teams: "32",
    format: "1v1",
    entryFee: "Free",
    image: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1768036269/tekken_uxsuqn.jpg",
    color: "magenta",
    prizeDistribution: [
      { place: "1st Place", prize: "₹2,500" },
      { place: "2nd Place", prize: "₹1,500" },
      { place: "3rd Place", prize: "₹1,000" },
    ],
    rules: [
      "All players must be 16+ years old",
      "1v1 Format",
      "Console provided at venue - no personal peripherals",
      "Standard competitive settings",
    ],
    schedule: [
      { day: "Jan 25 - Feb 7", events: "Online Qualifiers" },
      { day: "Day 1 (Feb 7)", events: "Playoffs" },
      { day: "Day 2 (Feb 8)", events: "Semi Finals & Finals" },
    ],
    registerLink: "#register",
    rulebook: "/rulebook/tekken8-rules.pdf",
    rulebookText: `QUANTICA FEST

TEKKEN 8 – Official Tournament Rulebook
Mode: Offline (LAN)
Game: Tekken 8
Platform: Console (as provided by Organising Team)
Event Type: On-Campus Esports Tournament

1. Tournament Format
1. The tournament will be conducted offline on campus.
2. Match format:
○ Pools & Early Rounds: Best of 3 (BO3)
○ Semi-Finals, Finals, Grand Finals: Best of 5 (BO5)
3. Matches are 1v1 only.
4. Bracket format and progression will be announced before the event begins.

2. Player Eligibility & Verification
1. All players must carry a valid Aadhaar Card and College ID for verification.
2. Only registered players are allowed to compete. No substitutions are permitted.
3. Players must report to the match area at least 15 minutes before their scheduled
match.

3. Match Rules (Official Standard)
1. Round Settings
○ Rounds to Win: 3
○ Round Time: 60 seconds
○ Damage Settings: Default
○ Health Recovery & Special Systems: Default (as per TEKKEN 8 ruleset)
2. Side Selection
○ Player 1 side is decided by coin toss or referee decision.
○ The winner of the previous match must retain their side.
3. Match Flow
○ Once a match begins, pausing is not allowed.
○ Players must remain seated until the match concludes.

4. Character & Stage Rules
1. Character Selection
○ All characters are allowed.
○ Character switching is allowed only for the losing player between matches.
○ The winning player must lock the same character.
2. Stage Selection
○ Stage selection will be random.

○ Any stage with significant gameplay advantage may be restricted at the
discretion of the Organising Team.

5. Controller & Equipment Rules
1. Players may use:
○ PS5 controllers
2. Controllers must not have turbo, macros, or programmable advantages.
3. Wireless controllers must be disconnected immediately after the match.
4. Any damage caused to equipment or college property will be the full responsibility of
the player/team.

6. In-Game Rules & Fair Play
1. Pausing
○ Intentional pausing will result in round loss or match loss.
○ Accidental pauses must be reported immediately to the referee.
2. Coaching
○ Coaching is not allowed during matches.
○ Coaching is permitted between matches only.
3. Exploits
○ Use of glitches, bugs, or unintended mechanics is strictly forbidden.

7. Disconnections & Interruptions
1. In case of technical failure before the completion of a round, the referee may restart the
round.
2. If a disconnection occurs after significant progress, the decision will be made by the
referee.
3. Intentional disconnections will result in immediate disqualification.

8. Player Conduct & Discipline
1. Players must remain at their assigned stations until the match is completed.
2. Physical altercations, verbal abuse, or aggressive behavior will lead to immediate
disciplinary action, including disqualification.
3. Team or player names must not be offensive, abusive, or hurt religious sentiments
or individuals.
4. Consumption or possession of intoxicating substances, including alcohol, is strictly
prohibited within campus premises.

9. Authority & Final Decision
1. The Organising Team reserves the right to modify rules if required due to unforeseen
circumstances.
2. All decisions made by referees and the Organising Team are final and binding.
3. Failure to comply with the rulebook may result in penalties, match loss, or
disqualification.

10. Health & Safety
1. Players must follow safety instructions provided by organisers.
2. Any player feeling unwell must inform the referee immediately.
3. The Organising Team is not responsible for personal belongings lost or damaged.`,
  },
  eafootball26: {
    title: "EAFC 26",
    game: "EAFC 26",
    tagline: "The Ultimate Survival Challenge",
    date: "7-8 Feb 2026",
    time: "10:00 AM - 7:00 PM",
    location: "Rishihood University, Delhi NCR",
    prizePool: "₹15,000",
    teams: "48",
    format: "1v1",
    entryFee: "Free",
    image: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1768036271/fifa_d267yz.jpg",
    color: "cyan",
    prizeDistribution: [
      { place: "1st Place", prize: "₹7,500" },
      { place: "2nd Place", prize: "₹4,500" },
      { place: "3rd Place", prize: "₹3,000" },
    ],
    rules: [
      "All players must be 15+ years old",
      "1v1 Format",
      "Console/PC Provided",
      "No external triggers or accessories",
      "Fair play policy strictly enforced",
    ],
    schedule: [
      { day: "Jan 25 - Feb 7", events: "Online Qualifiers" },
      { day: "Day 1 (Feb 7)", events: "Playoffs" },
      { day: "Day 2 (Feb 8)", events: "Semi Finals & Finals" },
    ],
    registerLink: "#register",
    rulebook: "/rulebook/eafc26-rules.pdf",
    rulebookText: `QUANTICA FEST

EA FC 26 – Tournament Rules &
Regulations
These rules are aligned with standard EA collegiate esports tournament formats. All
participants are required to read and comply with the following regulations.

1. Game & Platform
● Game Title: EA Sports FC 26
● Game Mode: Kick-Off
● Match Format: 1v1
● Platform: PS5
● Game Version: Latest official update provided by the Organising Team

2. Match Settings (Locked)
● Match Length: 6 minutes per half
● Difficulty: World Class
● Game Speed: Normal
● Injuries: Off
● Handball: Off (except penalties)

● Radar: 2D

3. Controller Rules
● Only standard, official controllers are permitted.
● Players must configure controls before match kickoff.
● Control changes after kickoff are not allowed.
● Use of macros, scripts, adapters, or modified controllers is strictly prohibited.

4. Team Selection Rules
● All current club and national teams are allowed.
● Classic XI, World XI, Soccer Aid, and custom teams are strictly prohibited.
● Mirror matches are allowed.
● Team selection cannot be changed once the match has started.

5. Match Flow & Pausing
● Pausing is permitted only for substitutions and tactical changes.
● Excessive or unnecessary pausing may lead to penalties or forfeiture.
● Pausing during open play without valid reason is prohibited.

6. Draws & Tiebreakers
● Matches ending in a draw will proceed to extra time.
● If required, penalty shootouts will determine the winner.

7. Disconnections & Technical Issues
● Disconnections before halftime will result in a match restart.
● Disconnections after halftime will be reviewed by match officials.
● Intentional disconnections will result in immediate disqualification.

8. Fair Play & Player Conduct
● Players must maintain sportsmanlike conduct at all times.
● Use of glitches, exploits, or unfair mechanics is strictly prohibited.
● Abusive language, harassment, or unsporting behavior will result in penalties or
disqualification.

9. Common Rules & Regulations
9.1 Identity Verification
All players must carry a valid Aadhaar Card and College ID for verification. Failure to produce
these documents when requested may result in disqualification.
9.2 Damage to Property

Any damage caused to equipment, venue assets, or college property by an individual or
team will be the full responsibility of the respective team, and necessary compensation must
be provided.
9.3 Misconduct & Physical Altercations
Any involvement in physical fights, aggressive behavior, or serious misconduct will lead to
strict disciplinary action, including disqualification or further penalties, as decided by the
Organising Team.
9.4 Team Name Guidelines
Team names must be appropriate and respectful. Names that are abusive, offensive, or
harmful to religious sentiments, individuals, or communities are strictly prohibited and may
lead to disqualification.
9.5 Authority of the Organising Team
The Organising Team reserves the right to modify, amend, or introduce new rules at any time
if required.
All decisions made by the Organising Team shall be final and binding in all matters.
9.6 Prohibited Substances
The consumption or possession of intoxicating substances, including alcohol, is strictly
prohibited within the campus premises. Violation will result in immediate disciplinary action,
including removal from the tournament.

10. Penalty & Warning System
10.1 Warning Structure
● First Offence: Official Warning
● Second Offence: Game Loss or Match Penalty
● Third Offence: Match Forfeit or Disqualification

10.2 Penalty Table

Violation Penalty
Excessive pausing Warning → Game Loss
Use of prohibited teams Match Forfeit
Abusive or offensive language Immediate Match Forfeit
Physical altercation Immediate Disqualification
Exploit or glitch abuse Immediate Disqualification
Intentional disconnection Immediate Disqualification
Property damage Compensation + Possible

Disqualification

Use of intoxicants Immediate Disqualification

11. Final Authority
The Organising Team and Match Officials reserve complete authority over the tournament. All
decisions taken shall be final and binding, and no disputes will be entertained after the
conclusion of a match.`,
  },
  f126: {
    title: "F1 26",
    game: "F1 26",
    tagline: "The Ultimate Racing Experience",
    date: "7-8 Feb 2026",
    time: "11:00 AM - 9:00 PM",
    location: "Rishihood University, Delhi NCR",
    prizePool: "₹4,000",
    teams: "32",
    format: "1v1 Time Trial/Race",
    entryFee: "Free",
    image: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1768036271/f1_sowdra.jpg",
    color: "magenta",
    prizeDistribution: [
      { place: "1st Place", prize: "₹2,000" },
      { place: "2nd Place", prize: "₹1,200" },
      { place: "3rd Place", prize: "₹800" },
    ],
    rules: [
      "All players must be 16+ years old",
      "Simulator provided at venue",
      "Standard competitive settings",
      "Fair play enforced",
    ],
    schedule: [
      { day: "Jan 25 - Feb 7", events: "Online Qualifiers" },
      { day: "Day 1 (Feb 7)", events: "Playoffs" },
      { day: "Day 2 (Feb 8)", events: "Semi Finals & Finals" },
    ],
    registerLink: "#register",
    rulebook: "/rulebook/f126-rules.pdf",
    rulebookText: `QUANTICA FEST

F1 26 – Tournament Rulebook
Mode: Offline
Platform: Racing Simulator
Controller: Logitech G29 Steering Wheel
Event Type: LAN / On-Campus

1. Tournament Format
1. The tournament will be conducted offline on campus using Logitech G29 racing
simulators.
2. All matches will be played on identical simulator setups provided by the organisers.
3. Players will compete in solo (1v1) format unless otherwise specified by the Organising
Team.
4. Race format, number of laps, and circuit selection will be announced before the match.

2. Player Eligibility & Verification
1. All participants must carry a valid Aadhaar Card and College ID for identity verification.
2. Only registered players are allowed to participate. Substitutions are not permitted.
3. Players must report to the match area at least 15 minutes prior to their scheduled race.

3. Match Conduct & Fair Play

1. Players must remain at their assigned simulator station until the race is officially
completed.
2. Peeking at other players’ screens, mirrors, or race data is strictly prohibited.
3. Any form of verbal abuse, unsportsmanlike conduct, or intentional disruption will
result in penalties or disqualification.
4. Players must follow all instructions given by referees and the Organising Team at all
times.

4. Simulator & Equipment Rules
1. All races will be played using Logitech G29 steering wheels provided by the
organisers.
2. Players are not allowed to modify, recalibrate, or adjust advanced settings of the
simulator without prior approval.
3. Any damage caused to the simulator or related equipment will be the full responsibility
of the player and their team, and compensation will be required.
4. Players must handle equipment carefully and report any technical issues immediately.

5. Game Settings
1. Game difficulty, assists, damage settings, and race rules will be standardized for all
players.
2. In case of technical failure (system crash, wheel malfunction), the referee may pause
or restart the race.
3. Race results recorded by the system will be considered final unless reviewed by the
Organising Team.

6. Disconnections & Restarts
1. If a technical issue occurs within the opening phase of the race, a restart may be
granted at the referee’s discretion.
2. No restarts will be allowed due to player error.
3. Any intentional disconnection or misuse of equipment will lead to disqualification.

7. Prohibited Actions
1. Intentional crashing, reckless driving, or blocking to gain unfair advantage is not
allowed.
2. Exploiting game bugs or mechanics is strictly prohibited.
3. Consumption or possession of intoxicating substances, including alcohol, is strictly
prohibited within campus premises.

8. Team Name & Behaviour Policy
1. Player or team names must not be offensive, abusive, or hurt religious sentiments or
individuals.
2. Any misconduct, including physical altercations, will result in immediate disciplinary
action, including disqualification.

9. Authority & Final Decision
1. The Organising Team reserves the right to amend or modify rules at any time if
necessary.

2. All decisions made by the Organising Team and match referees will be final and
binding.
3. Failure to comply with the rulebook may result in penalties, match loss, or
disqualification.

10. Health & Safety
1. Players must maintain proper conduct and safety while using the simulator.
2. Any player feeling unwell must inform the referee immediately.
3. The Organising Team will not be responsible for personal belongings lost or damaged.`,
  },
  clashroyale: {
    title: "Clash Royale",
    game: "Clash Royale",
    tagline: "The Ultimate Strategy Battle",
    date: "7-8 Feb 2026",
    time: "10:00 AM - 7:00 PM",
    location: "Rishihood University, Delhi NCR",
    prizePool: "₹5,000",
    teams: "48",
    format: "1v1",
    entryFee: "Free",
    image: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1768036374/clashroyale_kjqawu.jpg",
    color: "cyan",
    prizeDistribution: [
      { place: "1st Place", prize: "₹2,500" },
      { place: "2nd Place", prize: "₹1,500" },
      { place: "3rd Place", prize: "₹1,000" },
    ],
    rules: [
      "All players must be 15+ years old",
      "1v1 Format",
      "Mobile devices only - no tablets",
      "Fair play policy strictly enforced",
    ],
    schedule: [
      { day: "Jan 25 - Feb 7", events: "Online Qualifiers" },
      { day: "Day 1 (Feb 7)", events: "Playoffs" },
      { day: "Day 2 (Feb 8)", events: "Semi Finals & Finals" },
    ],
    registerLink: "#register",
    rulebook: "/rulebook/clashroyale-rules.pdf",
    rulebookText: `QUANTICA FEST

Clash Royale – Tournament Rules &
Regulations
These rules are aligned with official Clash Royale competitive tournament standards and
must be strictly followed by all participants.

1. Game & Platform
● Game Title: Clash Royale (Latest Version)
● Platform: Android / iOS
● Match Format: 1v1
● Players must ensure their game is updated to the latest official version before
competing.

2. Match Format
● Battle Type: Friendly Battle (Tournament Standard)
● King Tower Level: Tournament Standard (Level 11)
● Card Levels: Capped at Tournament Standard levels
● Match Type: Best of 3 (BO3)
(Finals may be Best of 5 at the discretion of the Organising Team)

3. Deck Rules
● Players must use valid decks as permitted by Clash Royale.
● Deck changes are allowed between matches, but not during an active game.
● Intentional stalling, exploiting overtime, or abusing game mechanics is prohibited.
● Use of bugged, glitched, or hacked cards is strictly forbidden.

4. Account Rules
● Players must compete using their own personal Clash Royale account.
● Account sharing, boosting, or playing on another player’s account is prohibited.
● Use of emulators, modded applications, or third-party software is strictly forbidden.

5. Fair Play & Player Conduct
● Players must maintain sportsmanlike behavior at all times.
● Abusive language, harassment, or unsporting conduct will result in penalties or
disqualification.
● External assistance, coaching during matches, or stream sniping is prohibited.

6. Disconnections & Technical Issues
● Players are responsible for stable internet connectivity.
● Disconnections occurring:

○ Within the first 1 minute: Match may be replayed
○ After the first 1 minute: Result will stand unless organisers decide otherwise
● Intentional disconnections will result in immediate disqualification.

7. Exploits & Cheating
The following actions are strictly prohibited:
● Exploiting glitches, bugs, or unintended mechanics
● Modified game files or hacked clients
● Network manipulation or unfair advantages

Any violation will result in immediate disqualification.

8. Common Rules & Regulations
8.1 Identity Verification
All players must carry a valid Aadhaar Card and College ID for verification. Failure to produce
these documents when requested may result in disqualification.

8.2 Damage to Property
Any damage caused to equipment, venue assets, or college property by an individual or
team will be the full responsibility of the respective team, and necessary compensation must
be provided.

8.3 Misconduct & Physical Altercations

Any involvement in physical fights, aggressive behavior, or serious misconduct will result in
strict disciplinary action, including disqualification or further penalties, as decided by the
Organising Team.

8.4 Team Name Guidelines
Team names must be appropriate and respectful. Names that are abusive, offensive, or
harmful to religious sentiments, individuals, or communities are strictly prohibited and may
lead to disqualification.

8.5 Authority of the Organising Team
The Organising Team reserves the right to modify, amend, or introduce new rules at any time
if required.
All decisions made by the Organising Team shall be final and binding in all matters.

8.6 Prohibited Substances
The consumption or possession of intoxicating substances, including alcohol, is strictly
prohibited within the campus premises. Violation will result in immediate disciplinary
action, including removal from the tournament.

9. Penalty & Warning System
9.1 Warning Structure
● First Offence: Official Warning
● Second Offence: Match Loss
● Third Offence: Disqualification

9.2 Penalty Table

Violation Penalty
Emulator / modded app
usage

Immediate Disqualification

Exploit or glitch abuse Immediate Disqualification
Account sharing / boosting Immediate Disqualification
Intentional disconnection Immediate Disqualification
Unsportsmanlike conduct Warning → Disqualification
Physical altercation Immediate Disqualification
Property damage Compensation + Possible Disqualification
Use of intoxicants Immediate Disqualification

10. Final Authority
The Organising Team and Match Officials reserve complete authority over the Clash Royale
tournament. All decisions shall be final and binding, and no disputes will be entertained after
match completion.`,
  },
};
const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const event = eventData[slug as keyof typeof eventData];
  if (!event) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Event Not Found
            </h1>
            <Link to="/events" className="cyber-btn">
              View All Events
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }
  const borderColor =
    event.color === "cyan" ? "border-primary" : "border-secondary";
  const textColor = event.color === "cyan" ? "text-primary" : "text-secondary";
  const bgColor = event.color === "cyan" ? "bg-primary" : "bg-secondary";
  return (
    <PageTransition>
      { }
      <section className="relative min-h-[70vh] flex items-end pb-16">
        <div className="absolute inset-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Events
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span
              className={`${textColor} text-sm font-bold uppercase tracking-wider px-4 py-1 border ${borderColor} inline-block mb-4`}
            >
              {event.game}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              <GlitchText text={event.title} />
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {event.tagline}
            </p>
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn inline-block"
            >
              Register Now
            </a>
          </motion.div>
        </div>
      </section>
      { }
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="flex items-center gap-3">
              <Calendar className={`w-6 h-6 ${textColor}`} />
              <div>
                <p className="text-foreground font-semibold">{event.date}</p>
                <p className="text-muted-foreground text-xs">Date</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className={`w-6 h-6 ${textColor}`} />
              <div>
                <p className="text-foreground font-semibold">30th Jan</p>
                <p className="text-muted-foreground text-xs">Registration Deadline</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className={`w-6 h-6 ${textColor}`} />
              <div>
                <p className="text-foreground font-semibold">{event.location}</p>
                <p className="text-muted-foreground text-xs">Venue</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className={`w-6 h-6 ${textColor}`} />
              <div>
                <p className="text-foreground font-semibold">
                  {event.prizePool}
                </p>
                <p className="text-muted-foreground text-xs">Prize Pool</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Ticket className={`w-6 h-6 ${textColor}`} />
              <div>
                <p className="text-foreground font-semibold">
                  {event.entryFee}
                </p>
                <p className="text-muted-foreground text-xs">Entry Fee</p>
              </div>
            </div>

          </div>
        </div>
      </section>
      { }
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            { }
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`border ${borderColor} p-8 clip-corner`}
            >
              <h3
                className={`text-2xl font-bold text-foreground mb-6 ${textColor}`}
              >
                Prize Distribution
              </h3>
              <div className="space-y-4">
                {event.prizeDistribution.map((prize, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-border last:border-0"
                  >
                    <span className="text-muted-foreground">{prize.place}</span>
                    <span className={`font-bold ${textColor}`}>
                      {prize.prize}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
            { }
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`border ${borderColor} p-8 clip-corner`}
            >
              <h3
                className={`text-2xl font-bold text-foreground mb-6 ${textColor}`}
              >
                Schedule
              </h3>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="py-3 border-b border-border last:border-0">
                    <p className="text-foreground font-semibold">{item.day}</p>
                    <p className="text-muted-foreground text-sm">
                      {item.events}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
            { }
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`border ${borderColor} p-8 clip-corner`}
            >
              <h3
                className={`text-2xl font-bold text-foreground mb-6 ${textColor}`}
              >
                Rules & Guidelines
              </h3>
              <div className="space-y-3">
                {event.rules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 ${textColor} mt-0.5 flex-shrink-0`} />
                    <span className="text-muted-foreground text-sm">{rule}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      { }
      <section className="py-12 bg-card relative border-y border-border">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`max-w-4xl mx-auto border ${borderColor} p-4 clip-corner bg-background/50`}
          >
            <div className="flex justify-between items-center mb-6 px-4">
              <h3 className={`text-2xl font-bold text-foreground ${textColor}`}>
                OFFICIAL RULEBOOK
              </h3>
              {!(event as any).rulebookText && event.rulebook && (
                <a
                  href={event.rulebook}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-xs uppercase tracking-wider ${textColor} hover:underline`}
                >
                  Open in New Tab
                </a>
              )}
            </div>

            <div
              className={`w-full ${(event as any).rulebookText ? 'h-[600px] p-6 overflow-y-auto overscroll-y-none' : 'h-[600px] overflow-hidden'} bg-black/50 border border-white/10 rounded-sm custom-scrollbar relative z-20`}
              onWheel={(e) => e.stopPropagation()}
            >
              {(event as any).rulebookText ? (
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-muted-foreground text-lg leading-relaxed">
                    {(event as any).rulebookText}
                  </pre>
                </div>
              ) : (
                <iframe
                  src={`${event.rulebook}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full"
                  title={`${event.title} Rulebook`}
                />
              )}
            </div>
            <div className="text-center mt-4">
              <p className="text-blue-500 font-bold uppercase tracking-widest text-sm md:text-base">
                Organised by SAGE
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      { }
      <section id="register" className="py-24 bg-card relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`max-w-3xl mx-auto text-center border ${borderColor} p-12 clip-corner`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              REGISTER YOUR <span className={textColor}>TEAM</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Entry Fee: <span className="text-foreground font-bold">{event.entryFee}</span> |
              Format: <span className="text-foreground font-bold">{event.format}</span>
            </p>
            <p className="text-muted-foreground mb-8">
              Limited slots available. Register now to secure your spot in {event.title}.
            </p>
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn inline-block"
            >
              Register via Unstop
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
export default EventDetail;
