/* ==========================================================================
   AGMRCET Client-Side Global Site Search
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('global-search-input');
    const resultsList = document.getElementById('search-results-list');
    const searchTags = document.querySelectorAll('.search-tag');

    // Static site index map for client-side search
    const searchIndex = [
        { title: 'Computer Science & Engineering', category: 'Departments', url: '/departments/cse', keywords: 'computer science programming code cse java python software labs hod' },
        { title: 'CSE (Artificial Intelligence & Machine Learning)', category: 'Departments', url: '/departments/cse-aiml', keywords: 'aiml artificial intelligence machine learning neural network python deep learning' },
        { title: 'Computer Science & Design', category: 'Departments', url: '/departments/csd', keywords: 'csd design ux ui interaction user experience game graphics figma' },
        { title: 'Electronics & Communication Engineering', category: 'Departments', url: '/departments/ece', keywords: 'electronics communication vlsi communication antennas signals telecom ece' },
        { title: 'Electrical & Electronics Engineering', category: 'Departments', url: '/departments/eee', keywords: 'electrical power machines smart grids motor ev green energy eee' },
        { title: 'Mechanical Engineering', category: 'Departments', url: '/departments/me', keywords: 'mechanical structural dynamics thermodynamics fluid machinery workshop lathe design me' },
        { title: 'Civil Engineering', category: 'Departments', url: '/departments/ce', keywords: 'civil structure concrete surveying structural roads bridge soil environment ce' },
        { title: 'Master of Business Administration (MBA)', category: 'Departments', url: '/departments/mba', keywords: 'mba master business administration manager accounting hr finance marketing' },
        { title: 'Master of Computer Applications (MCA)', category: 'Departments', url: '/departments/mca', keywords: 'mca application databases development cloud computing web coding programming' },
        { title: 'Admissions Portal & Brochure', category: 'Admissions', url: '/admissions', keywords: 'admission eligibility criteria fees details prospectus brochure apply online forms register seats' },
        { title: 'Placement Records & Recruiter Stats', category: 'Placements', url: '/placements', keywords: 'placement records recruit training salaries packages statistics highest average tcs capgemini' },
        { title: 'Hostels & Campus Facilities', category: 'Campus Life', url: '/campus-life', keywords: 'hostels dining libraries library ground sports arena virtual 360 tour gym cafeteria' },
        { title: 'Patents & Research Publications', category: 'Research', url: '/research', keywords: 'research papers publications patents mou funding grants projects hackathons innovations' },
        { title: 'Faculty Profiles Directory', category: 'Faculty', url: '/faculty', keywords: 'faculty list directory teachers professors resume contact qualifications experience HOD' },
        { title: 'Media Photos & Videos Gallery', category: 'Gallery', url: '/gallery', keywords: 'gallery photos videos images event photos graduation basketball library lab blocks' },
        { title: 'Contact Phone & Location Map', category: 'Contact', url: '/contact', keywords: 'contact us maps phone email registration location varur hubli emergency numbers helpline' },
        { title: 'News Bulletins & Academic Circulars', category: 'News', url: '/news', keywords: 'news circulars announcements notifications semester timetable VTU classes exam dates' }
    ];

    const performSearch = (query) => {
        if (!resultsList) return;
        resultsList.innerHTML = '';

        if (!query) {
            resultsList.innerHTML = '<div class="text-center p-3 text-muted small">Type above to browse results instantly...</div>';
            return;
        }

        const filtered = searchIndex.filter(item => {
            const matchesTitle = item.title.toLowerCase().includes(query);
            const matchesCat = item.category.toLowerCase().includes(query);
            const matchesKeywords = item.keywords.toLowerCase().includes(query);
            return matchesTitle || matchesCat || matchesKeywords;
        });

        if (filtered.length === 0) {
            resultsList.innerHTML = '<div class="text-center p-3 text-muted small">No matches found for your query.</div>';
            return;
        }

        filtered.forEach(item => {
            const btn = document.createElement('a');
            btn.href = item.url;
            btn.className = 'list-group-item list-group-item-action py-3 d-flex justify-content-between align-items-center transition-all border-0 border-bottom';
            btn.innerHTML = `
                <div>
                    <h6 class="fw-bold text-navy mb-0">${item.title}</h6>
                    <span class="text-muted text-xs">${item.category}</span>
                </div>
                <span class="badge bg-light text-primary text-uppercase border small">Go <i class="bi bi-arrow-right-short"></i></span>
            `;
            resultsList.appendChild(btn);
        });
    };

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            performSearch(query);
        });
    }

    // Trigger tags selection on click
    searchTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const text = tag.innerText.trim();
            if (searchInput) {
                searchInput.value = text;
                performSearch(text.toLowerCase());
            }
        });
    });

    // Reset search on modal hidden
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.addEventListener('hidden.bs.modal', () => {
            if (searchInput) searchInput.value = '';
            performSearch('');
        });
        
        searchModal.addEventListener('shown.bs.modal', () => {
            if (searchInput) searchInput.focus();
        });
    }

    // Initial state
    performSearch('');
});
