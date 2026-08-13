import HeroSection from '../components/HeroSection'
import FeatureCard from '../components/FeatureCard'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <HeroSection />

      <section className="features-section">
        <h2>Explore CampusConnect</h2>

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
        </div>
      </section>
    </div>
  )
}

export default Home