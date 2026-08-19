import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import FeatureCard from '../components/FeatureCard'
import './Home.css'

const sections = [
  {
    id: 'section-marketplace',
    title: 'Marketplace',
    description: 'Buy and sell useful items within your campus.',
    link: '/marketplace',
  },
  {
    id: 'section-lost-found',
    title: 'Lost & Found',
    description: 'Report lost items and help others find their belongings.',
    link: '/lost-found',
  },
  {
    id: 'section-academic',
    title: 'Academic Resources',
    description: 'Access notes, previous year papers, and study materials.',
    link: '/academic',
  },
  {
    id: 'section-events',
    title: 'Campus Events',
    description: 'Discover events, activities, and opportunities on campus.',
    link: '/events',
  },
  {
    id: 'section-messages',
    title: 'Messaging',
    description: 'Connect and communicate with fellow students.',
    link: '/messages',
  },
  {
    id: 'section-profile',
    title: 'Student Profile',
    description: 'Create and manage your CampusConnect student profile.',
    link: '/profile',
  },
]

function Home() {
  const location = useLocation()
  const navigate = useNavigate()

  // If we arrived here because the navbar wants us to land on a
  // specific card (see Navbar.jsx), scroll to it and flash a
  // highlight so it's obvious which section was requested.
  useEffect(() => {
    const targetId = location.state?.scrollTo

    if (!targetId) return

    const el = document.getElementById(targetId)

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('feature-card-highlight')

      const timeout = setTimeout(() => {
        el.classList.remove('feature-card-highlight')
      }, 1600)

      // Clear the navigation state so refreshing/going back
      // doesn't re-trigger the scroll.
      navigate(location.pathname, { replace: true, state: {} })

      return () => clearTimeout(timeout)
    }
  }, [location.state, location.pathname, navigate])

  return (
    <div className="home">

      <HeroSection />

      <section className="features-section">

        <h2>Explore CampusConnect</h2>

        <p className="features-intro">
          Everything you need to connect, share, learn,
          and participate in your campus community.
        </p>

        <div className="feature-grid">

          {sections.map((section) => (
            <div id={section.id} key={section.id}>
              <FeatureCard
                title={section.title}
                description={section.description}
                link={section.link}
              />
            </div>
          ))}

        </div>

      </section>

      <section className="home-cta">

        <h2>Be Part of Your Campus Community</h2>

        <p>
          Share useful resources, help fellow students,
          discover opportunities, and stay connected.
        </p>

      </section>

    </div>
  )
}

export default Home