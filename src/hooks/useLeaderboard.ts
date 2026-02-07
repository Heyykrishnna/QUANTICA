
import { useEffect, useState } from 'react';
import axios from 'axios';
// import api from '../lib/api'; // Commented out to use explicit axios

// Define explicit types matching the backend response
export interface Team {
  id: string;
  name: string;
  eventId: string;
  totalPoints: number | null;
  totalKills: number | null;
  wins: number | null;
  rank: number | null;
  positionPoints: number | null;
  group?: string | null;
  participants: { name: string }[];
}

export interface MatchScore {
  teamId: string;
  placement: number;
  kills: number;
  points: number;
  team?: Team;
}

export interface Match {
  id: string;
  matchNumber: number;
  team1Id: string | null;
  team2Id: string | null;
  winnerTeamId: string | null;
  team1Score: string | null;
  team2Score: string | null;
  status: 'scheduled' | 'live' | 'completed';
  scheduledDate: string;
  stage?: 'Group' | 'Finals';
  scores: MatchScore[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string | null;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Event {
  id: string;
  name: string;
  game: string;
  date: string;
  status: string;
  slug: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

export function useLeaderboard(eventSlug: string) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        // 1. Get Event ID from Slug
        const eventsRes = await axios.get<Event[]>(`${API_BASE_URL}/events`);
        const foundEvent = eventsRes.data.find(e => e.slug === eventSlug);

        if (!foundEvent) {
          setTeams([]);
          setEvent(null);
          setLoading(false);
          return;
        }
        setEvent(foundEvent);

        // 2. Fetch Teams for Event
        const teamsRes = await axios.get<Team[]>(`${API_BASE_URL}/teams?eventId=${foundEvent.id}`);
        const rawTeams = teamsRes.data;

        // 3. Fetch Matches with Scores for Event
        const matchesRes = await axios.get<Match[]>(`${API_BASE_URL}/matches?eventId=${foundEvent.id}`);
        const matches = matchesRes.data;

        // 4. Calculate team statistics from match scores
        const teamStats = new Map<string, { totalPoints: number; totalKills: number; wins: number }>();

        // Initialize stats for all teams
        rawTeams.forEach(team => {
          teamStats.set(team.id, { totalPoints: 0, totalKills: 0, wins: 0 });
        });

        // Aggregate stats from all match scores
        matches.forEach(match => {
          if (match.scores && match.scores.length > 0) {
            // Find the winning team (highest placement i.e., placement === 1 for Battle Royale)
            const winningScore = match.scores.reduce((best, current) => {
              return current.placement === 1 ? current : best;
            }, match.scores[0]);

            match.scores.forEach(score => {
              const stats = teamStats.get(score.teamId);
              if (stats) {
                stats.totalPoints += score.points || 0;
                stats.totalKills += score.kills || 0;
                if (score.teamId === winningScore?.teamId && winningScore.placement === 1) {
                  stats.wins += 1;
                }
              }
            });
          }
        });

        // 5. Merge calculated stats with team data
        const enrichedTeams = rawTeams.map(team => {
          const stats = teamStats.get(team.id) || { totalPoints: 0, totalKills: 0, wins: 0 };
          return {
            ...team,
            totalPoints: stats.totalPoints,
            positionPoints: stats.totalPoints - stats.totalKills,
            totalKills: stats.totalKills,
            wins: stats.wins,
          };
        });

        const sortedTeams = enrichedTeams.sort((a, b) => {
            if ((b.totalPoints || 0) !== (a.totalPoints || 0)) {
                return (b.totalPoints || 0) - (a.totalPoints || 0);
            }
            if ((b.wins || 0) !== (a.wins || 0)) {
                return (b.wins || 0) - (a.wins || 0);
            }
            if ((b.positionPoints || 0) !== (a.positionPoints || 0)) {
                return (b.positionPoints || 0) - (a.positionPoints || 0);
            }
            return (b.totalKills || 0) - (a.totalKills || 0);
        });
        const rankedTeams = sortedTeams.map((team, index) => ({
          ...team,
          rank: index + 1,
        }));

        setTeams(rankedTeams);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message || 'Failed to fetch leaderboard');
      } finally {
        setLoading(false);
      }
    }

    if (eventSlug) {
      fetchLeaderboard();
    }
  }, [eventSlug]);

  return { teams, event, loading, error };
}

export function useLiveMatches(eventSlug: string) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const eventsRes = await axios.get<Event[]>(`${API_BASE_URL}/events`);
        const event = eventsRes.data.find(e => e.slug === eventSlug);

        if (!event) {
          setMatches([]);
          setLoading(false);
          return;
        }

        const matchesRes = await axios.get<Match[]>(`${API_BASE_URL}/matches?eventId=${event.id}`);
        setMatches(matchesRes.data);
      } catch (err) {
        console.error('Error fetching matches:', err);
      } finally {
        setLoading(false);
      }
    }

    if (eventSlug) {
      fetchMatches();
    }
  }, [eventSlug]);

  return { matches, loading };
}

export function useRoadmap() {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for schedule
    const mockSchedule: RoadmapItem[] = [
      {
        id: '1',
        title: 'Registration Opens',
        description: 'Team registrations go live for all events.',
        date: '2026-01-25T10:00:00',
        status: 'completed',
      },
      {
        id: '2',
        title: 'Krunker.io Qualifiers',
        description: 'Online qualifiers - Top 32 teams advance.',
        date: '2026-02-01T14:00:00',
        status: 'ongoing',
      },
      {
        id: '3',
        title: 'Opening Ceremony',
        description: 'Live stream kickoff with guest speakers and bracket reveal.',
        date: '2026-02-07T09:00:00',
        status: 'upcoming',
      },
      {
        id: '4',
        title: 'Valorant Quarter Finals',
        description: 'Best of 3 matches. Main stage.',
        date: '2026-02-07T11:30:00',
        status: 'upcoming',
      },
      {
        id: '5',
        title: 'Lunch Break & Mini-Games',
        description: 'Crowd interactions and giveaways.',
        date: '2026-02-07T13:00:00',
        status: 'upcoming',
      },
      {
        id: '6',
        title: 'BGMI Squad Battle',
        description: 'Erangel & Miramar maps back-to-back.',
        date: '2026-02-07T15:00:00',
        status: 'upcoming',
      },
      {
        id: '7',
        title: 'Hackathon Keynote',
        description: 'Theme announcement for 24h coding sprint.',
        date: '2026-02-07T18:00:00',
        status: 'upcoming',
      },
      {
        id: '8',
        title: 'Grand Finals - Valorant',
        description: 'The ultimate showdown. Best of 5.',
        date: '2026-02-08T16:00:00',
        status: 'upcoming',
      },
      {
        id: '9',
        title: 'Prize Distribution',
        description: 'Awards ceremony and closing remarks.',
        date: '2026-02-08T20:00:00',
        status: 'upcoming',
      },
    ];

    setRoadmapItems(mockSchedule);
    setLoading(false);
  }, []);

  return { roadmapItems, loading };
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axios.get<Event[]>(`${API_BASE_URL}/events`);
        setEvents(res.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return { events, loading };
}
