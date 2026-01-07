'use client'

import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'

export default function DashboardClient({ session }: { session: Session }) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Dashboard</h1>
            <p style={styles.subtitle}>Welcome back, {session.user?.name}</p>
          </div>
          <button onClick={handleSignOut} style={styles.signOutButton}>
            Sign Out
          </button>
        </header>

        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>👤</div>
            <h3 style={styles.cardTitle}>Profile</h3>
            <div style={styles.cardContent}>
              <p style={styles.cardText}>
                <strong>Name:</strong> {session.user?.name}
              </p>
              <p style={styles.cardText}>
                <strong>Email:</strong> {session.user?.email}
              </p>
              <p style={styles.cardText}>
                <strong>Role:</strong> {session.user?.role || 'user'}
              </p>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon}>🎯</div>
            <h3 style={styles.cardTitle}>Quick Actions</h3>
            <div style={styles.cardContent}>
              <button style={styles.actionButton}>Edit Profile</button>
              <button style={styles.actionButton}>Settings</button>
              <button style={styles.actionButton}>View Activity</button>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon}>📊</div>
            <h3 style={styles.cardTitle}>Stats</h3>
            <div style={styles.cardContent}>
              <div style={styles.stat}>
                <div style={styles.statValue}>24</div>
                <div style={styles.statLabel}>Projects</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statValue}>156</div>
                <div style={styles.statLabel}>Tasks</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statValue}>89%</div>
                <div style={styles.statLabel}>Completion</div>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon}>🔔</div>
            <h3 style={styles.cardTitle}>Recent Activity</h3>
            <div style={styles.cardContent}>
              <div style={styles.activity}>
                <div style={styles.activityDot}></div>
                <div>
                  <p style={styles.activityText}>Logged in successfully</p>
                  <p style={styles.activityTime}>Just now</p>
                </div>
              </div>
              <div style={styles.activity}>
                <div style={styles.activityDot}></div>
                <div>
                  <p style={styles.activityText}>Profile updated</p>
                  <p style={styles.activityTime}>2 hours ago</p>
                </div>
              </div>
              <div style={styles.activity}>
                <div style={styles.activityDot}></div>
                <div>
                  <p style={styles.activityText}>New task completed</p>
                  <p style={styles.activityTime}>5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    padding: '2rem',
  },
  dashboard: {
    maxWidth: '1400px',
    margin: '0 auto',
    animation: 'fadeIn 0.6s ease-out',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 800,
    marginBottom: '0.5rem',
    background: 'linear-gradient(135deg, #ff3366 0%, #ffffff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#a0a0a0',
  },
  signOutButton: {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: 600,
    background: 'transparent',
    color: 'white',
    border: '1px solid #333',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    padding: '2rem',
    transition: 'all 0.3s ease',
  },
  cardIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cardText: {
    color: '#a0a0a0',
    lineHeight: 1.6,
  },
  actionButton: {
    padding: '0.75rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    background: '#0a0a0a',
    color: 'white',
    border: '1px solid #333',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
  },
  stat: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: '#0a0a0a',
    border: '1px solid #2a2a2a',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#ff3366',
  },
  statLabel: {
    color: '#a0a0a0',
    fontSize: '0.9rem',
  },
  activity: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  activityDot: {
    width: '8px',
    height: '8px',
    background: '#ff3366',
    borderRadius: '50%',
    marginTop: '6px',
    flexShrink: 0,
  },
  activityText: {
    color: 'white',
    fontSize: '0.95rem',
    marginBottom: '0.25rem',
  },
  activityTime: {
    color: '#666',
    fontSize: '0.85rem',
  },
}
