/* ============================================
   API CATALOG - SEARCH & FILTER FUNCTIONALITY
   JavaScript for interactive search and filtering
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // DOM ELEMENTS
    // ============================================
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const filterTags = document.querySelectorAll('.filter-tag');
    const apiCards = document.querySelectorAll('.api-card');
    const statsNumber = document.querySelector('.stat-number');
    
    // Track active filter
    let activeFilter = 'all';
    
    // ============================================
    // SEARCH FUNCTIONALITY
    // Filters cards based on search input
    // ============================================
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        
        apiCards.forEach(card => {
            // Get searchable content from card
            const apiName = card.querySelector('.api-name').textContent.toLowerCase();
            const apiDescription = card.querySelector('.api-description').textContent.toLowerCase();
            const owner = card.querySelector('.meta-value:not(.version)').textContent.toLowerCase();
            const version = card.querySelector('.meta-value.version').textContent.toLowerCase();
            
            // Get environment and status
            const envBadge = card.querySelector('.badge[class*="env-"]');
            const statusBadge = card.querySelector('.badge[class*="status-"]');
            const environment = envBadge ? envBadge.textContent.toLowerCase() : '';
            const status = statusBadge ? statusBadge.textContent.toLowerCase() : '';
            
            // Check if card matches search term
            const matchesSearch = 
                apiName.includes(searchTerm) ||
                apiDescription.includes(searchTerm) ||
                owner.includes(searchTerm) ||
                version.includes(searchTerm) ||
                environment.includes(searchTerm) ||
                status.includes(searchTerm);
            
            // Check if card matches active filter
            const matchesFilter = checkFilter(card, activeFilter);
            
            // Show or hide card based on both conditions
            if (matchesSearch && matchesFilter) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update stats counter
        updateStats(visibleCount);
    }
    
    // ============================================
    // FILTER FUNCTIONALITY
    // Checks if card matches the active filter
    // ============================================
    function checkFilter(card, filter) {
        if (filter === 'all') return true;
        
        const envBadge = card.querySelector('.badge[class*="env-"]');
        const statusBadge = card.querySelector('.badge[class*="status-"]');
        const environment = envBadge ? envBadge.textContent.toLowerCase() : '';
        const status = statusBadge ? statusBadge.textContent.toLowerCase() : '';
        
        // Check various filter conditions
        switch(filter) {
            case 'active':
                return status === 'active';
            case 'production':
            case 'prod':
                return environment === 'prod';
            case 'rest':
                // For demo purposes, assume all APIs are REST unless specified
                return true;
            case 'graphql':
                // For demo purposes, no GraphQL APIs in current catalog
                return false;
            case 'dev':
                return environment === 'dev';
            case 'qa':
                return environment === 'qa';
            case 'deprecated':
                return status === 'deprecated';
            default:
                return true;
        }
    }
    
    // ============================================
    // UPDATE STATS
    // Updates the visible API count
    // ============================================
    function updateStats(count) {
        if (statsNumber) {
            statsNumber.textContent = count;
            // Add a subtle animation
            statsNumber.style.transform = 'scale(1.2)';
            setTimeout(() => {
                statsNumber.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    
    // Search on input (live search)
    searchInput.addEventListener('input', performSearch);
    
    // Search on button click
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch();
    });
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
    
    // Filter tag clicks
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            this.classList.add('active');
            
            // Update active filter
            activeFilter = this.textContent.toLowerCase();
            
            // Perform search with new filter
            performSearch();
        });
    });
    
    // ============================================
    // INITIALIZE
    // Set initial state
    // ============================================
    
    // Set "All" filter as active by default
    filterTags[0]?.classList.add('active');
    
    // Add CSS for fade animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .filter-tag.active {
            background: var(--color-accent-gradient, linear-gradient(135deg, #00d4aa 0%, #0ea5e9 100%));
            color: var(--color-bg-primary, #0a0e17);
            border-color: transparent;
            font-weight: 600;
        }
        
        .stat-number {
            transition: transform 0.15s ease;
        }
        
        .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 3rem;
            color: var(--color-text-muted, #64748b);
        }
        
        .no-results h3 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: var(--color-text-secondary, #94a3b8);
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // NO RESULTS MESSAGE
    // Shows message when no cards match
    // ============================================
    function checkNoResults() {
        const apiGrid = document.querySelector('.api-grid');
        const existingNoResults = apiGrid.querySelector('.no-results');
        const visibleCards = Array.from(apiCards).filter(card => card.style.display !== 'none');
        
        if (visibleCards.length === 0) {
            if (!existingNoResults) {
                const noResultsDiv = document.createElement('div');
                noResultsDiv.className = 'no-results';
                noResultsDiv.innerHTML = `
                    <h3>No APIs Found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                `;
                apiGrid.appendChild(noResultsDiv);
            }
        } else {
            if (existingNoResults) {
                existingNoResults.remove();
            }
        }
    }
    
    // Override performSearch to include no results check
    const originalPerformSearch = performSearch;
    searchInput.removeEventListener('input', performSearch);
    searchButton.removeEventListener('click', performSearch);
    
    function enhancedSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        
        apiCards.forEach(card => {
            const apiName = card.querySelector('.api-name').textContent.toLowerCase();
            const apiDescription = card.querySelector('.api-description').textContent.toLowerCase();
            const owner = card.querySelector('.meta-value:not(.version)').textContent.toLowerCase();
            const version = card.querySelector('.meta-value.version').textContent.toLowerCase();
            
            const envBadge = card.querySelector('.badge[class*="env-"]');
            const statusBadge = card.querySelector('.badge[class*="status-"]');
            const environment = envBadge ? envBadge.textContent.toLowerCase() : '';
            const status = statusBadge ? statusBadge.textContent.toLowerCase() : '';
            
            const matchesSearch = 
                apiName.includes(searchTerm) ||
                apiDescription.includes(searchTerm) ||
                owner.includes(searchTerm) ||
                version.includes(searchTerm) ||
                environment.includes(searchTerm) ||
                status.includes(searchTerm);
            
            const matchesFilter = checkFilter(card, activeFilter);
            
            if (matchesSearch && matchesFilter) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        updateStats(visibleCount);
        checkNoResults();
    }
    
    // Re-attach event listeners with enhanced search
    searchInput.addEventListener('input', enhancedSearch);
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        enhancedSearch();
    });
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            enhancedSearch();
        }
    });
    
    // Update filter tag click handlers
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.textContent.toLowerCase();
            enhancedSearch();
        });
    });
    
    console.log('🚀 API Catalog search initialized');
});

