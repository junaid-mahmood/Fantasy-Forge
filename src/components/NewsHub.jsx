import React, { useState } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import Navbar from './Navbar';

const keyframes = {
  fadeIn: {
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' }
  },
  gradientShift: {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  },
  titleGlow: {
    '0%, 100%': { textShadow: '0 0 20px rgba(96, 165, 250, 0.3)' },
    '50%': { textShadow: '0 0 30px rgba(96, 165, 250, 0.5)' }
  },
  meshFloat: {
    '0%, 100%': { transform: 'translate(0, 0)' },
    '50%': { transform: 'translate(-2%, 2%)' }
  }
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #3b82f6 100%)",
    backgroundSize: "200% 200%",
    color: "#ffffff",
    overflowX: "hidden",
    animation: "gradientShift 15s ease infinite",
    position: "relative",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.2) 0%, rgba(15, 40, 71, 0) 50%)",
    pointerEvents: "none",
    zIndex: 1
  },
  meshBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
    backgroundImage: `radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.3) 0px, transparent 50%),
                     radial-gradient(at 80% 0%, rgba(96, 165, 250, 0.2) 0px, transparent 50%),
                     radial-gradient(at 0% 50%, rgba(37, 99, 235, 0.2) 0px, transparent 50%)`,
    animation: "meshFloat 15s ease-in-out infinite",
    zIndex: 0
  },
  main: {
    position: "relative",
    zIndex: 2,
    maxWidth: "1600px",
    margin: "0 auto",
    padding: "8rem 3rem 4rem",
  },
  sectionTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "2rem",
    color: "white",
    fontFamily: "'Russo One', sans-serif",
    background: "linear-gradient(45deg, #ffffff 30%, #60a5fa 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 20px rgba(96, 165, 250, 0.3)",
    animation: "titleGlow 2s ease-in-out infinite"
  },
  layout: {
    display: "flex",
    gap: "2rem",
  },
  mainArticle: {
    flex: 2,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    backdropFilter: "blur(12px)",
    borderRadius: "1.2rem",
    padding: "2.5rem 2.5rem 1.5rem",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    transition: "all 0.3s ease",
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)',
    }
  },
  smallArticle: {
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    backdropFilter: "blur(8px)",
    borderRadius: "1rem",
    padding: "1.5rem",
    border: "1px solid rgba(59, 130, 246, 0.1)",
    marginTop: "1.5rem",
    transition: "all 0.3s ease",
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.2)',
      backgroundColor: "rgba(59, 130, 246, 0.1)",
    }
  },
  sideArticles: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  sideArticle: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    backdropFilter: "blur(12px)",
    borderRadius: "1.2rem",
    padding: "1.5rem",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    transition: "all 0.3s ease",
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)',
      backgroundColor: "rgba(59, 130, 246, 0.15)",
    }
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#f3f4f6",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  newsImage: {
    width: "100%",
    borderRadius: "0.75rem",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    '&:hover': {
      transform: 'scale(1.02)',
    }
  },
  icon: {
    color: "#60a5fa",
    width: "1.5rem",
    height: "1.5rem",
  },
  readMoreLink: {
    color: '#60a5fa',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#3b82f6',
      gap: '0.75rem',
    }
  }
};

const NewsHub = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const articles = [
    {
      title: "Brentford Close in on Loan Deal for Fiorentina Defender Michael Kayode",
      url: "https://www.theguardian.com/football/2025/jan/22/brentford-close-in-on-loan-deal-for-fiorentina-defender-michael-kayode?utm_source=chatgpt.com",
      image: "https://i.guim.co.uk/img/media/02e3728bea4a5b699e111cf735c928bc411cec1d/0_115_3072_1844/master/3072.jpg?width=1900&dpr=1&s=none&crop=none",
    },
    {
      title: "Suns, Jazz Complete First-Round Draft Pick Swap",
      url: "https://www.spotrac.com/news/_/id/2585/suns-jazz-complete-first-round-draft-pick-swap",
      image: "",
    },
    {
      title: "The Messi Effect: Luis Suarez is Inter Miami's Latest Landmark Signing",
      url: "https://amp.theguardian.com/football/2023/dec/24/the-messi-effect-luis-suarez-is-inter-miamis-latest-landmark-signing?",
      image: "https://i.guim.co.uk/img/media/226cb1b07e908722d642695eba499c4a03b24237/36_0_1068_641/master/1068.jpg?width=620&dpr=1&s=none&crop=none",
    },
    {
      title: "Lillard Joining Antetokounmpo at Bucks in Blockbuster Trade, Say Reports",
      url: "https://amp.theguardian.com/sport/2023/sep/27/lillard-joining-antetokounmpo-at-bucks-in-blockbuster-trade-say-reports?",
      image: "https://i.guim.co.uk/img/media/7af568471f2c48ff14f9e0e339b85b53a04f8699/0_118_5567_3341/master/5567.jpg?width=620&dpr=1&s=none&crop=none",
    },
    {
      title: "Football Transfer Rumours: Chelsea to Hold Talks Over Garnacho Deal",
      url: "https://www.theguardian.com/football/2025/jan/22/football-transfer-rumours-chelsea-to-hold-talks-over-garnacho-deal?",
      image: "https://i.guim.co.uk/img/media/7ae46f2854ff502e3836aa29874aa2e4fd2503f6/0_152_2573_1545/master/2573.jpg?width=620&dpr=1&s=none&crop=none",
    },
    {
      title: "Deep Dive: Utah Jazz, Phoenix Suns, Devin Booker, Danny Ainge, Kevin Durant, Justin Zanik, Bradley Beal",
      url: "https://www.slcdunk.com/2025/1/21/24349082/deep-dive-utah-jazz-phoenix-suns-devin-booker-danny-ainge-kevin-durant-justin-zanik-bradley-beal?",
      image: "https://cdn.vox-cdn.com/thumbor/JVXbHPFw_VgqqKjYKWx_wiKQlZs=/0x0:4800x3200/920x0/filters:focal(0x0:4800x3200):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/25841154/2193575580.jpg",
    },
    {
      title: "Pat Riley, Heat Fire Back at Latest Jimmy Butler Trade Rumors",
      url: "https://www.sbnation.com/nba/2024/12/26/24329754/pat-riley-heat-fire-back-latest-jimmy-butler-trade-rumors-nba?",
      image: "https://cdn.vox-cdn.com/thumbor/01MlNtuaI_TPhDfS3TT3v5PXGoM=/0x0:3441x2294/920x613/filters:focal(1303x465:1853x1015):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/73810558/1178382519.0.jpg",
    },
  ];

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} currentPage="news" />
      <div style={styles.page}>
        <div style={styles.gradientOverlay} />
        <div style={styles.meshBackground} />
        <main style={styles.main}>
          <h1 style={styles.sectionTitle}>NEWS</h1>
          <div style={styles.layout}>
            <div style={styles.mainArticle}>
              <h2 style={styles.cardTitle}>
                <Newspaper style={styles.icon} />
                {articles[0].title}
              </h2>
              {articles[0].image && (
                <a href={articles[0].url} target="_blank" rel="noopener noreferrer">
                  <img src={articles[0].image} alt={articles[0].title} style={styles.newsImage} />
                </a>
              )}
              <a href={articles[0].url} target="_blank" rel="noopener noreferrer" style={styles.readMoreLink}>
                Read more <ExternalLink style={styles.icon} />
              </a>
              <div style={styles.smallArticle}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#f3f4f6" }}>
                  <Newspaper style={styles.icon} />
                  Build-up to Man City, Arsenal & Celtic in Champions League
                </h3>
                <a href="https://www.bbc.com/sport/football/live/c5y7ldy45y0t" target="_blank" rel="noopener noreferrer" style={styles.readMoreLink}>
                  Read more <ExternalLink style={styles.icon} />
                </a>
              </div>
              {articles.slice(2, 5).map((article, index) => (
                <div key={index} style={styles.smallArticle}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#f3f4f6" }}>
                    <Newspaper style={styles.icon} />
                    {article.title}
                  </h3>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" style={styles.readMoreLink}>
                    Read more <ExternalLink style={styles.icon} />
                  </a>
                </div>
              ))}
            </div>
            <div style={styles.sideArticles}>
              {articles.slice(1, 2).concat(articles.slice(5)).map((article, index) => (
                <div key={index} style={styles.sideArticle}>
                  <h3 style={styles.cardTitle}>
                    <Newspaper style={styles.icon} />
                    {article.title}
                  </h3>
                  {article.image && (
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      <img src={article.image} alt={article.title} style={styles.newsImage} />
                    </a>
                  )}
                  <a href={article.url} target="_blank" rel="noopener noreferrer" style={styles.readMoreLink}>
                    Read more <ExternalLink style={styles.icon} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default NewsHub;
