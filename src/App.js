import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import backgroundImage from './images/background.jpg';
import aboutBackground from './images/about-background.jpg';
import aboutPhoto from './images/about-photo.jpg';
import photo1 from './images/photo1.jpg';
import photo2 from './images/photo2.jpg';
import photo3 from './images/photo3.jpg';
import snapchatIcon from './images/snapchat.png';
import whatsappIcon from './images/whatsapp.png';
import instagramIcon from './images/instagram.png';
import tweetyImage from './images/tweety.png';
import hobbiesBackground from './images/hobbies-background.png';
import envelopeClosed from './images/envelope-closed.png';
import envelopeOpened from './images/envelope-opened.png';
import hobbySport from './images/hobby-sport.png';
import hobbyLanguages from './images/hobby-languages.png';
import hobbyMusic from './images/hobby-music.png';
import hobbyDrawing from './images/hobby-drawing.png';
import hobbyCoding from './images/hobby-coding.png';
import skillsBear from './images/skills-bear.png';
import skillsButtons from './images/skills-buttons.png';
import skillsComposite from './images/skills-composite.png';
import musicBackground from './images/music-background.jpg';
import musicVinyl from './images/music-vinyl.png';
import musicRibbon from './images/music-ribbon.png';
import newCharacterImage from './images/new-character.png';

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showTweety, setShowTweety] = useState(false);
  const [showNewCharacter, setShowNewCharacter] = useState(false);
  const [envelopeStage, setEnvelopeStage] = useState('closed');
  const [currentHobbyIndex, setCurrentHobbyIndex] = useState(0);
  const [skillsBgIndex, setSkillsBgIndex] = useState(0);
  const [vinylVisible, setVinylVisible] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const vinylSectionRef = useRef(null);

  const pastelBackgrounds = [
    'linear-gradient(135deg, #f5e9d0 0%, #faf3e5 100%)',
    'linear-gradient(135deg, #F4DAD4 0%, #FAE8E4 100%)',
    'linear-gradient(135deg, #2E4060 0%, #4A5C7A 100%)',
    'linear-gradient(135deg, #FDF1E2 0%, #FFF8F0 100%)',
    'linear-gradient(135deg, #655A7C 0%, #807596 100%)',
    'linear-gradient(135deg, #F0FFF0 0%, #F8FFF8 100%)',
  ];

  const pages = [
    { name: 'Home', id: 'home' },
    { name: 'About Me', id: 'about' },
    { name: 'My Hobbies', id: 'hobbies' },
    { name: 'My Skills', id: 'skills' },
    { name: 'Music', id: 'music' },
  ];

  const contacts = {
    snapchat: 'vsvikusichka',
    whatsapp: '+380971056740',
    instagram: 'love_mrs_vika',
  };

  const hobbies = [
    { image: hobbySport },
    { image: hobbyLanguages },
    { image: hobbyMusic },
    { image: hobbyDrawing },
    { image: hobbyCoding },
  ];

  const songs = [
    { number: '01', title: 'crush', artist: '2hollis', file: '/audio/song1.mp3' },
    { number: '02', title: 'misery', artist: 'pupsies', file: '/audio/song2.mp3' },
    { number: '03', title: 'Self Aware', artist: 'Temper City', file: '/audio/song3.mp3' },
    { number: '04', title: 'Stephanie', artist: 'Nafeesisboujee', file: '/audio/song4.mp3' },
  ];

  const handleFocus = () => setIsDropdownOpen(true);

  const handleBlur = () => setTimeout(() => setIsDropdownOpen(false), 200);

  const handlePageClick = (page) => {
    setSearchValue(page.name);
    setIsDropdownOpen(false);
    const element = document.getElementById(page.id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSocialClick = (platform) => {
    switch (platform) {
      case 'snapchat':
        window.open(`https://www.snapchat.com/add/${contacts.snapchat}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${contacts.whatsapp}?text=Hello!%20I%20saw%20ur%20portfolio`, '_blank');
        break;
      case 'instagram':
        window.open(`https://instagram.com/${contacts.instagram}`, '_blank');
        break;
      default:
        break;
    }
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setShowTweety(true);
  };

  const handleNewCharacterClick = (e) => {
    e.stopPropagation();
    setShowNewCharacter(true);
  };

  const handleBackgroundClick = () => {
    setShowTweety(false);
    setShowNewCharacter(false);
  };

  const handleEnvelopeClick = (e) => {
    e.stopPropagation();
    if (envelopeStage === 'closed') setEnvelopeStage('opened');
    else if (envelopeStage === 'opened') setEnvelopeStage('hobbies');
  };

  const handlePrevHobby = (e) => {
    e.stopPropagation();
    setCurrentHobbyIndex((prev) => (prev > 0 ? prev - 1 : hobbies.length - 1));
  };

  const handleNextHobby = (e) => {
    e.stopPropagation();
    setCurrentHobbyIndex((prev) => (prev < hobbies.length - 1 ? prev + 1 : 0));
  };

  const handleSkillsBgClick = () => {
    setSkillsBgIndex((prev) => (prev + 1) % pastelBackgrounds.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVinylVisible(true);
        });
      },
      { threshold: 0.3 }
    );
    if (vinylSectionRef.current) observer.observe(vinylSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSongClick = (index) => {
    if (currentSongIndex === index) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) audioRef.current.pause();
      setCurrentSongIndex(index);
      setIsPlaying(true);
      setTimeout(() => {
        if (audioRef.current) audioRef.current.play();
      }, 100);
    }
  };

  const handleSongEnd = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div className="portfolio-container" onClick={handleBackgroundClick}>
      <section id="home" className="page-section section-home">
        <div className="background-layer" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="search-container">
            <div className="search-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Find page..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-list">
                {pages.map((page, index) => (
                  <div key={index} className="dropdown-item" onClick={() => handlePageClick(page)}>
                    {page.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="social-icons-container">
            <img src={snapchatIcon} alt="Snapchat" className="social-icon social-snapchat" onClick={() => handleSocialClick('snapchat')} />
            <img src={instagramIcon} alt="Instagram" className="social-icon social-instagram" onClick={() => handleSocialClick('instagram')} />
            <img src={whatsappIcon} alt="WhatsApp" className="social-icon social-whatsapp" onClick={() => handleSocialClick('whatsapp')} />
          </div>
          <img src={photo3} alt="Photo 3" className="my-photo photo-left" />
          <img src={photo2} alt="Photo 2" className="my-photo photo-center" />
          <img src={photo1} alt="Photo 1" className="my-photo photo-right" />
        </div>
      </section>

      <section id="about" className="page-section section-about">
        <div className="about-background-layer" style={{ backgroundImage: `url(${aboutBackground})` }}>
          <div className="about-photo-container">
            <img src={aboutPhoto} alt="About Me" className="about-photo" />
          </div>
          <span className="heart-emoji" onClick={handleHeartClick}>💕</span>
          {showTweety && (
            <div className="tweety-popup">
              <img src={tweetyImage} alt="Tweety" className="tweety-image" />
            </div>
          )}
          {showNewCharacter && (
            <div className="new-character-popup">
              <img src={newCharacterImage} alt="Character" className="new-character-image" />
            </div>
          )}
        </div>
      </section>

      <section id="hobbies" className="page-section section-hobbies">
        <div className="hobbies-background-layer" style={{ backgroundImage: `url(${hobbiesBackground})` }}>
          {envelopeStage === 'closed' && (
            <img src={envelopeClosed} alt="Envelope" className="envelope-closed" onClick={handleEnvelopeClick} />
          )}
          {envelopeStage === 'opened' && (
            <img src={envelopeOpened} alt="Envelope Opened" className="envelope-opened" onClick={handleEnvelopeClick} />
          )}
          {envelopeStage === 'hobbies' && (
            <>
              <div className="hobby-card">
                <button className="hobby-nav-btn prev-btn" onClick={handlePrevHobby}>←</button>
                <div className="hobby-content">
                  <img src={hobbies[currentHobbyIndex].image} alt={`Hobby ${currentHobbyIndex + 1}`} className="hobby-image" />
                </div>
                <button className="hobby-nav-btn next-btn" onClick={handleNextHobby}>→</button>
              </div>
              <div className="hobby-indicator">
                {hobbies.map((_, index) => (
                  <span key={index} className={`indicator-dot ${index === currentHobbyIndex ? 'active' : ''}`} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section id="skills" className="page-section section-skills">
        <div className="skills-background-layer" style={{ background: pastelBackgrounds[skillsBgIndex] }} onClick={handleSkillsBgClick}>
          <img src={skillsBear} alt="Bear" className="skills-bear" />
          <img src={skillsButtons} alt="Buttons" className="skills-buttons" />
          <img src={skillsComposite} alt="Skills" className="skills-composite" />
        </div>
      </section>

      <section id="music" className="page-section section-music" ref={vinylSectionRef}>
        <div className="music-background-layer" style={{ backgroundImage: `url(${musicBackground})` }}>
          <div className={`music-vinyl-container ${vinylVisible ? 'visible' : ''}`}>
            <img src={musicVinyl} alt="Vinyl" className="music-vinyl" />
          </div>
          <div className="music-ribbon-container">
            <img src={musicRibbon} alt="Ribbon" className="music-ribbon" />
            <div className="music-playlist">
              {songs.map((song, index) => (
                <div key={index} className={`music-song ${currentSongIndex === index ? 'active' : ''}`} onClick={() => handleSongClick(index)}>
                  <span className="song-number">{song.number}</span>
                  <span className="song-title">{song.title}</span>
                  <span className="song-artist">- {song.artist}</span>
                </div>
              ))}
            </div>
          </div>
          {currentSongIndex !== null && (
            <audio ref={audioRef} src={songs[currentSongIndex].file} onEnded={handleSongEnd} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
          )}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-emojis">
            <span className="footer-emoji bear-emoji" onClick={(e) => { e.stopPropagation(); handleNewCharacterClick(e); }}>🐻</span>
          </div>
          <div className="footer-text">
            <p className="footer-made">Made with <span className="footer-heart">💕</span> by Victoria Chunikhovska</p>
            <p className="footer-copy">© 2026 All rights reserved</p>
          </div>
          <div className="footer-socials">
            <a href={`https://www.snapchat.com/add/${contacts.snapchat}`} target="_blank" rel="noopener noreferrer" className="footer-social-link"><img src={snapchatIcon} alt="Snapchat" /></a>
            <a href={`https://instagram.com/${contacts.instagram}`} target="_blank" rel="noopener noreferrer" className="footer-social-link"><img src={instagramIcon} alt="Instagram" /></a>
            <a href={`https://wa.me/${contacts.whatsapp}`} target="_blank" rel="noopener noreferrer" className="footer-social-link"><img src={whatsappIcon} alt="WhatsApp" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;