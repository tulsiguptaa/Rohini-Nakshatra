// Hackathons Timeline
class HackathonsTimeline {
    constructor() {
        this.hackathons = [];
        this.timelineContainer = document.querySelector('.timeline');
        
        this.init();
    }
    
    init() {
        this.loadHackathons();
        this.setupFilters();
    }
    
    loadHackathons() {
        // Sample hackathons data
        this.hackathons = [
            {
                id: 1,
                name: "Smart India Hackathon 2024",
                date: "2024-03-15",
                description: "National level hackathon focusing on solving real-world problems using technology.",
                location: "Virtual",
                status: "won",
                position: "1st Prize",
                prize: "₹5,00,000",
                theme: "Smart Cities",
                technologies: ["AI/ML", "IoT", "Blockchain"],
                logo: "assets/images/hackathons/sih-logo.png",
                team: "Team Rohini Nakshatra",
                project: "Smart Traffic Management System"
            },
            {
                id: 2,
                name: "Google Solution Challenge 2024",
                date: "2024-02-20",
                description: "Global hackathon by Google Developer Student Clubs focusing on UN Sustainable Development Goals.",
                location: "Online",
                status: "finalist",
                position: "Top 50 Finalist",
                prize: "Mentorship & Swag",
                theme: "Sustainable Development",
                technologies: ["Flutter", "Firebase", "Google Cloud"],
                logo: "assets/images/hackathons/google-logo.png",
                team: "Team Rohini Nakshatra",
                project: "Eco-Educate Platform"
            },
            {
                id: 3,
                name: "Microsoft Imagine Cup 2024",
                date: "2024-01-30",
                description: "Premier student technology competition by Microsoft for innovative solutions.",
                location: "Regional Round",
                status: "participated",
                position: "Semi-Finalist",
                prize: "Certificates",
                theme: "AI for Good",
                technologies: ["Azure", "Power Platform", "React"],
                logo: "assets/images/hackathons/microsoft-logo.png",
                team: "Team Rohini Nakshatra",
                project: "Accessibility AI Assistant"
            },
            {
                id: 4,
                name: "HackTheNorth 2023",
                date: "2023-12-10",
                description: "Canada's biggest hackathon with participants from around the world.",
                location: "University of Waterloo",
                status: "participated",
                position: "Participant",
                prize: "Experience",
                theme: "Open Innovation",
                technologies: ["Web3", "AR/VR", "Mobile"],
                logo: "assets/images/hackathons/htn-logo.png",
                team: "Team Rohini Nakshatra",
                project: "Decentralized Social Network"
            },
            {
                id: 5,
                name: "ETHIndia 2023",
                date: "2023-11-25",
                description: "Largest Ethereum hackathon in India focusing on blockchain and Web3 solutions.",
                location: "Bangalore",
                status: "won",
                position: "Best DeFi Project",
                prize: "₹3,00,000",
                theme: "Web3 & DeFi",
                technologies: ["Solidity", "Ethereum", "React"],
                logo: "assets/images/hackathons/ethindia-logo.png",
                team: "Team Rohini Nakshatra",
                project: "Decentralized Lending Protocol"
            },
            {
                id: 6,
                name: "Flipkart GRID 4.0",
                date: "2023-10-15",
                description: "India's biggest data science hackathon by Flipkart.",
                location: "Online",
                status: "finalist",
                position: "Top 10",
                prize: "Internship Opportunities",
                theme: "Data Science & ML",
                technologies: ["Python", "TensorFlow", "AWS"],
                logo: "assets/images/hackathons/flipkart-logo.png",
                team: "Team Rohini Nakshatra",
                project: "Recommendation System 2.0"
            }
        ];
        
        this.renderTimeline();
    }
    
    setupFilters() {
        const filterBtns = document.querySelectorAll('.hackathon-filter');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const status = btn.dataset.status;
                this.filterHackathons(status);
            });
        });
    }
    
    filterHackathons(status) {
        let filteredHackathons;
        
        if (status === 'all') {
            filteredHackathons = this.hackathons;
        } else {
            filteredHackathons = this.hackathons.filter(h => h.status === status);
        }
        
        this.renderTimeline(filteredHackathons);
    }
    
    renderTimeline(hackathons = this.hackathons) {
        if (!this.timelineContainer) return;
        
        // Sort by date (newest first)
        hackathons.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        this.timelineContainer.innerHTML = '';
        
        hackathons.forEach((hackathon, index) => {
            const timelineItem = this.createTimelineItem(hackathon, index);
            this.timelineContainer.appendChild(timelineItem);
        });
    }
    
    createTimelineItem(hackathon, index) {
        const item = document.createElement('div');
        item.className = `timeline-item animate-on-scroll ${index % 2 === 0 ? 'even' : 'odd'}`;
        
        const formattedDate = new Date(hackathon.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        item.innerHTML = `
            <div class="timeline-content">
                <span class="timeline-date">${formattedDate}</span>
                <div class="hackathon-logo-container">
                    <img src="${hackathon.logo}" alt="${hackathon.name}" class="hackathon-logo">
                </div>
                <h3>${hackathon.name}</h3>
                <p class="hackathon-location">📍 ${hackathon.location}</p>
                <p>${hackathon.description}</p>
                
                <div class="hackathon-details">
                    <div class="detail-item">
                        <strong>Theme:</strong> ${hackathon.theme}
                    </div>
                    <div class="detail-item">
                        <strong>Project:</strong> ${hackathon.project}
                    </div>
                    <div class="detail-item">
                        <strong>Technologies:</strong>
                        <div class="tech-tags">
                            ${hackathon.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="hackathon-results">
                    <div class="result-item">
                        <strong>Position:</strong> ${hackathon.position}
                    </div>
                    ${hackathon.prize ? `<div class="result-item">
                        <strong>Prize:</strong> ${hackathon.prize}
                    </div>` : ''}
                </div>
                
                <span class="hackathon-status status-${hackathon.status}">
                    ${this.getStatusText(hackathon.status)}
                </span>
            </div>
        `;
        
        return item;
    }
    
    getStatusText(status) {
        const statusMap = {
            'won': '🏆 Winner',
            'finalist': '⭐ Finalist',
            'participated': '🚀 Participated'
        };
        return statusMap[status] || status;
    }
    
    // Method to add achievement counters animation
    animateAchievementCounters() {
        const counters = document.querySelectorAll('.achievement-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    }
}

// Initialize hackathons timeline
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.timeline')) {
        const timeline = new HackathonsTimeline();
        
        // Animate achievement counters when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timeline.animateAchievementCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const achievementsSection = document.querySelector('.achievements-section');
        if (achievementsSection) {
            observer.observe(achievementsSection);
        }
    }
});