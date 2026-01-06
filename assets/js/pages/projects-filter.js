// Projects Filtering System
class ProjectsFilter {
    constructor() {
        this.projects = [];
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.projectsGrid = document.querySelector('.projects-container');
        this.currentFilter = 'all';
        
        this.init();
    }
    
    init() {
        // Load projects data
        this.loadProjects();
        
        // Set up filter buttons
        this.setupFilters();
        
        // Initialize search if exists
        this.setupSearch();
    }
    
    loadProjects() {
        // Sample projects data - In real implementation, load from JSON file
        this.projects = [
            {
                id: 1,
                title: "Smart Healthcare System",
                description: "An AI-powered healthcare management system that helps in early disease detection and patient monitoring.",
                category: "ai-ml",
                tags: ["AI", "Machine Learning", "Healthcare", "Python"],
                image: "assets/images/projects/healthcare-system.jpg",
                github: "https://github.com/rohini-nakshatra/healthcare-system",
                demo: "https://demo.rohininakshatra.tech/healthcare",
                date: "2024-01-15",
                featured: true
            },
            {
                id: 2,
                title: "Eco-Tracker Mobile App",
                description: "A mobile application that helps users track and reduce their carbon footprint with actionable insights.",
                category: "mobile",
                tags: ["React Native", "Firebase", "Sustainability", "JavaScript"],
                image: "assets/images/projects/eco-tracker.jpg",
                github: "https://github.com/rohini-nakshatra/eco-tracker",
                demo: "https://demo.rohininakshatra.tech/eco-tracker",
                date: "2023-11-20",
                featured: true
            },
            {
                id: 3,
                title: "Blockchain Voting System",
                description: "A secure and transparent voting system using blockchain technology to ensure election integrity.",
                category: "blockchain",
                tags: ["Solidity", "Ethereum", "Web3.js", "Node.js"],
                image: "assets/images/projects/voting-system.jpg",
                github: "https://github.com/rohini-nakshatra/voting-system",
                demo: "https://demo.rohininakshatra.tech/voting",
                date: "2023-09-10",
                featured: false
            },
            {
                id: 4,
                title: "AR Shopping Assistant",
                description: "Augmented Reality application that helps users visualize products in their space before purchasing.",
                category: "ar-vr",
                tags: ["Unity", "ARKit", "3D Modeling", "C#"],
                image: "assets/images/projects/ar-shopping.jpg",
                github: "https://github.com/rohini-nakshatra/ar-shopping",
                demo: "https://demo.rohininakshatra.tech/ar-shopping",
                date: "2023-12-05",
                featured: true
            },
            {
                id: 5,
                title: "Smart Campus Portal",
                description: "A comprehensive portal for university students with attendance, grading, and resource management.",
                category: "web",
                tags: ["MERN Stack", "REST API", "MongoDB", "React"],
                image: "assets/images/projects/campus-portal.jpg",
                github: "https://github.com/rohini-nakshatra/campus-portal",
                demo: "https://demo.rohininakshatra.tech/campus",
                date: "2023-10-30",
                featured: false
            },
            {
                id: 6,
                title: "IoT Home Automation",
                description: "Internet of Things system for smart home automation with voice control and energy optimization.",
                category: "iot",
                tags: ["Raspberry Pi", "Python", "MQTT", "React"],
                image: "assets/images/projects/home-automation.jpg",
                github: "https://github.com/rohini-nakshatra/home-automation",
                demo: "https://demo.rohininakshatra.tech/iot-home",
                date: "2023-08-15",
                featured: true
            }
        ];
        
        // Render all projects initially
        this.renderProjects(this.projects);
    }
    
    setupFilters() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Get filter category
                this.currentFilter = btn.dataset.filter;
                
                // Filter projects
                this.filterProjects();
            });
        });
    }
    
    setupSearch() {
        const searchInput = document.querySelector('#projectSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchProjects(e.target.value);
            });
        }
    }
    
    filterProjects() {
        let filteredProjects;
        
        if (this.currentFilter === 'all') {
            filteredProjects = this.projects;
        } else if (this.currentFilter === 'featured') {
            filteredProjects = this.projects.filter(project => project.featured);
        } else {
            filteredProjects = this.projects.filter(project => 
                project.category === this.currentFilter || 
                project.tags.includes(this.currentFilter.charAt(0).toUpperCase() + this.currentFilter.slice(1))
            );
        }
        
        this.renderProjects(filteredProjects);
    }
    
    searchProjects(query) {
        if (!query.trim()) {
            this.filterProjects();
            return;
        }
        
        const searchTerm = query.toLowerCase();
        const filteredProjects = this.projects.filter(project => {
            return (
                project.title.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        });
        
        this.renderProjects(filteredProjects);
    }
    
    renderProjects(projects) {
        if (!this.projectsGrid) return;
        
        this.projectsGrid.innerHTML = '';
        
        if (projects.length === 0) {
            this.projectsGrid.innerHTML = `
                <div class="no-projects">
                    <h3>No projects found</h3>
                    <p>Try a different filter or search term</p>
                </div>
            `;
            return;
        }
        
        projects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            this.projectsGrid.appendChild(projectCard);
        });
        
        // Initialize project modals
        this.initProjectModals();
    }
    
    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'card project-card animate-on-scroll';
        card.dataset.category = project.category;
        
        const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="card-img">
            <div class="card-content">
                <h3 class="card-title">${project.title}</h3>
                <p class="card-text">${project.description}</p>
                <div class="card-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-meta">
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" class="project-link" title="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                        ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link" title="Live Demo">
                            <i class="fas fa-external-link-alt"></i>
                        </a>` : ''}
                        <button class="project-link view-details" data-project-id="${project.id}" title="View Details">
                            <i class="fas fa-info"></i>
                        </button>
                    </div>
                    <span class="project-date">${formattedDate}</span>
                </div>
            </div>
        `;
        
        return card;
    }
    
    initProjectModals() {
        const viewDetailsBtns = document.querySelectorAll('.view-details');
        
        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const projectId = parseInt(btn.dataset.projectId);
                const project = this.projects.find(p => p.id === projectId);
                
                if (project) {
                    this.showProjectModal(project);
                }
            });
        });
    }
    
    showProjectModal(project) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${project.image}" alt="${project.title}" class="modal-img">
                <div class="modal-body">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    
                    <div class="modal-tech">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    
                    <h3>Project Details</h3>
                    <p>Developed in ${new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    
                    <div class="modal-links">
                        <a href="${project.github}" target="_blank" class="btn">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
                        ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-outline">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>` : ''}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Close modal
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => modal.remove());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Initialize projects filter on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.projects-container')) {
        new ProjectsFilter();
    }
});