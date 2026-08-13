import HeroSection from '../components/HeroSection'
import FeatureCard from '../components/FeatureCard'
import './Home.css'

function Home() {
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

          <FeatureCard
            title="Marketplace"
            description="Buy and sell useful items within your campus."
            link="/marketplace"
          />

          <FeatureCard
            title="Lost & Found"
            description="Report lost items and help others find their belongings."
            link="/lost-found"
          />

          <FeatureCard
            title="Academic Resources"
            description="Access notes, previous year papers, and study materials."
            link="/academic"
          />

          <FeatureCard
            title="Campus Events"
            description="Discover events, activities, and opportunities on campus."
            link="/events"
          />

          <FeatureCard
            title="Messaging"
            description="Connect and communicate with fellow students."
            link="/messages"
          />

          <FeatureCard
            title="Student Profile"
            description="Create and manage your CampusConnect student profile."
            link="/profile"
          />

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