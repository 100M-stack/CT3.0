// Navigation functionality - SISTEMA COMPLETO
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close mobile menu when clicking on a link or outside
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle submenu navigation
    const submenuLinks = document.querySelectorAll('.nav-submenu a');
    submenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const tabData = link.getAttribute('data-tab');
            const confrontoTabData = link.getAttribute('data-confronto-tab');
            const href = link.getAttribute('href');
            
            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Scroll to section
            if (href) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Handle tab switching after scroll
                    setTimeout(() => {
                        if (tabData) {
                            const tabButton = document.querySelector(`[data-tab="${tabData}"]`);
                            if (tabButton) tabButton.click();
                        }
                        
                        if (confrontoTabData) {
                            const confrontoButton = document.querySelector(`[data-confronto-tab="${confrontoTabData}"]`);
                            if (confrontoButton) confrontoButton.click();
                        }
                    }, 500);
                }
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks);
    
    function highlightNavigation() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Smooth scroll for navigation links
    navLinksArray.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Confronto tab functionality - SISTEMA ROBUSTO MIGLIORATO
    function initConfrontoTabs() {
        const confrontoTabButtons = document.querySelectorAll('.confronto-tab-btn');
        const confrontoTabPanels = document.querySelectorAll('.confronto-tab-panel');
        
        console.log('Confronto tab system initialized');
        console.log('Buttons found:', confrontoTabButtons.length);
        console.log('Panels found:', confrontoTabPanels.length);
        
        confrontoTabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const targetTab = button.getAttribute('data-confronto-tab');
                console.log('Confronto tab clicked:', targetTab);
                
                // Remove active state from all
                confrontoTabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                
                confrontoTabPanels.forEach(panel => {
                    panel.classList.remove('active');
                    panel.style.display = 'none';
                    panel.setAttribute('hidden', 'true');
                });
                
                // Activate clicked button
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
                
                // Show corresponding panel
                const targetPanel = document.getElementById(`${targetTab}-confronto-tab`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                    targetPanel.style.display = 'block';
                    targetPanel.removeAttribute('hidden');
                    
                    // Smooth appearance
                    requestAnimationFrame(() => {
                        targetPanel.style.opacity = '1';
                        targetPanel.style.transform = 'translateY(0)';
                    });
                    
                    console.log(`Panel "${targetTab}" activated successfully`);
                    
                    // Scroll into view if needed
                    targetPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    console.error(`Panel not found: ${targetTab}-confronto-tab`);
                }
            });
        });
        
        // Initialize first tab as active
        if (confrontoTabButtons.length > 0) {
            const firstButton = confrontoTabButtons[0];
            const firstTabId = firstButton.getAttribute('data-confronto-tab');
            const firstPanel = document.getElementById(`${firstTabId}-confronto-tab`);
            
            firstButton.classList.add('active');
            firstButton.setAttribute('aria-selected', 'true');
            
            if (firstPanel) {
                firstPanel.classList.add('active');
                firstPanel.style.display = 'block';
                firstPanel.removeAttribute('hidden');
            }
            
            console.log('First tab initialized:', firstTabId);
        }
    }
    
    // Initialize confronto tabs
    initConfrontoTabs();
    

    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const targetPanel = document.getElementById(`${targetTab}-tab`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
    
    // Interactive checklist for documents (visual feedback only)
    const checkboxes = document.querySelectorAll('.doc-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.opacity = '0.6';
            } else {
                label.style.textDecoration = 'none';
                label.style.opacity = '1';
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateNavbarBackground);
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.beneficiario-card, .intervento-card, .percentuale-card, .vantaggio-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animate elements on scroll (intersection observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    const animateElements = document.querySelectorAll('section, .beneficiario-card, .intervento-card');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    // Initialize first elements as visible
    setTimeout(() => {
        document.querySelector('#home').style.opacity = '1';
        document.querySelector('#home').style.transform = 'translateY(0)';
    }, 200);
});

// Global functions for button actions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function simulateDownload() {
    // Simulate PDF download
    alert('Funzionalità di download del PDF non implementata. In un\'applicazione reale, qui verrebbe generato e scaricato un file PDF con il riepilogo del Conto Termico 3.0.');
    
    // Optional: Create a fake download experience
    const link = document.createElement('a');
    link.download = 'conto-termico-3.0-riepilogo.pdf';
    link.href = 'data:application/pdf;base64,';
    
    // Show user feedback
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '✓ Download completato';
    button.style.background = 'var(--color-success)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 2000);
}

// Test functionality for confronto tabs
function testConfrontoTabs() {
    console.log('Testing confronto tabs...');
    
    const buttons = document.querySelectorAll('.confronto-tab-btn');
    const panels = document.querySelectorAll('.confronto-tab-panel');
    
    console.log('Found buttons:', buttons.length);
    console.log('Found panels:', panels.length);
    
    buttons.forEach((btn, index) => {
        const tabId = btn.getAttribute('data-confronto-tab');
        const panel = document.getElementById(`${tabId}-confronto-tab`);
        console.log(`Button ${index}: ${tabId}, Panel found: ${!!panel}`);
    });
}

// Add keyboard navigation support  
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu and modal
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
        
        // ESC also closes modal
        closeModal();
    }
    
    // Arrow keys for tab navigation  
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeTab = document.querySelector('.confronto-tab-btn.active');
        if (activeTab) {
            const tabButtons = Array.from(document.querySelectorAll('.confronto-tab-btn'));
            const currentIndex = tabButtons.indexOf(activeTab);
            let newIndex;
            
            if (e.key === 'ArrowRight') {
                newIndex = (currentIndex + 1) % tabButtons.length;
            } else {
                newIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
            }
            
            tabButtons[newIndex].click();
            tabButtons[newIndex].focus();
        }
    }
    
    // Test confronto tabs with T key
    if (e.key === 'T' || e.key === 't') {
        testConfrontoTabs();
    }
});

// Add focus management for accessibility
function manageFocus() {
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Initialize focus management and test tabs
document.addEventListener('DOMContentLoaded', function() {
    manageFocus();
    
    // Test and verify tab system after page load
    setTimeout(() => {
        testConfrontoTabs();
        
        // Verify Focus Fonti Rinnovabili tab is working
        const focusTab = document.querySelector('[data-confronto-tab="fer-dettaglio"]');
        if (focusTab) {
            console.log('✅ Focus Fonti Rinnovabili tab found and ready');
        } else {
            console.error('❌ Focus Fonti Rinnovabili tab NOT found');
        }
        
        // Verify all navigation elements are working
        console.log('📝 Navigation system status:');
        console.log('- Menu toggle:', document.getElementById('nav-toggle') ? '✅' : '❌');
        console.log('- Submenu links:', document.querySelectorAll('.nav-submenu a').length);
        console.log('- Tab buttons:', document.querySelectorAll('.tab-btn').length);
        console.log('- Confronto buttons:', document.querySelectorAll('.confronto-tab-btn').length);
    }, 1500);
});

// Performance optimization: debounced scroll handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Combine scroll handlers for better performance
    const backToTopBtn = document.getElementById('backToTop');
    const navbar = document.getElementById('navbar');
    
    // Back to top visibility
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Navbar background
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

// Global functions for navigation and debugging
window.switchToFocusFontiRinnovabili = function() {
    const focusButton = document.querySelector('[data-confronto-tab="fer-dettaglio"]');
    if (focusButton) {
        focusButton.click();
        console.log('Switched to Focus Fonti Rinnovabili via global function');
        return true;
    } else {
        console.error('Focus button not found');
        return false;
    }
};

// Global function to navigate to sections with tab switching
window.navigateToSection = function(sectionId, tabId = null, confrontoTabId = null) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            if (tabId) {
                const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
                if (tabButton) tabButton.click();
            }
            
            if (confrontoTabId) {
                const confrontoButton = document.querySelector(`[data-confronto-tab="${confrontoTabId}"]`);
                if (confrontoButton) confrontoButton.click();
            }
        }, 500);
        
        return true;
    }
    return false;
};

// Add visual indicator when tab is working
function addVisualFeedback() {
    const style = document.createElement('style');
    style.textContent = `
        .confronto-tab-btn {
            transition: all 0.3s ease !important;
            border: 2px solid transparent !important;
        }
        .confronto-tab-btn:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        }
        .confronto-tab-btn.active {
            border-color: var(--color-primary) !important;
            background: var(--color-primary) !important;
            color: white !important;
        }
        .confronto-tab-panel {
            min-height: 400px !important;
        }
        .confronto-tab-panel.active {
            animation: fadeInUp 0.3s ease-out !important;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize visual feedback
document.addEventListener('DOMContentLoaded', addVisualFeedback);

// Replace multiple scroll listeners with single debounced handler
window.addEventListener('scroll', debouncedScrollHandler);

// Add direct click handler as backup for Focus Fonti Rinnovabili
document.addEventListener('DOMContentLoaded', function() {
    // Add additional click handler for Focus Fonti Rinnovabili as backup
    const focusButton = document.querySelector('[data-confronto-tab="fer-dettaglio"]');
    const focusPanel = document.getElementById('fer-dettaglio-confronto-tab');
    
    if (focusButton && focusPanel) {
        focusButton.addEventListener('click', function(e) {
            console.log('BACKUP: Focus Fonti Rinnovabili clicked');
            e.preventDefault();
            e.stopPropagation();
            
            // Hide all panels
            document.querySelectorAll('.confronto-tab-panel').forEach(panel => {
                panel.classList.remove('active');
                panel.style.display = 'none';
            });
            
            // Remove active from all buttons
            document.querySelectorAll('.confronto-tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show Focus panel and activate button
            focusPanel.classList.add('active');
            focusPanel.style.display = 'block';
            focusButton.classList.add('active');
            
            console.log('Focus panel should be visible now');
        });
    }
});

// Modal functionality
function openModal(modalId) {
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    
    const modalData = getModalData(modalId);
    
    if (modalData) {
        title.textContent = modalData.title;
        content.innerHTML = modalData.content;
        overlay.classList.add('active');
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Modal data generator
function getModalData(modalId) {
    const modalDataMap = {
        'isolamento-modal': {
            title: '🧱 Isolamento Termico',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 65% (100% PA condizioni specifiche)</div>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Isolamento termico di pareti esterne (cappotto), coperture, solai verso locali non riscaldati per migliorare le prestazioni energetiche dell'involucro edilizio.</p>
                </div>
                
                <div class="modal-section">
                    <h3>👥 Chi può accedere</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>✅ Ammessi</strong>
                            Pubbliche Amministrazioni, Enti Terzo Settore, Privati settore terziario
                        </div>
                        <div class="modal-info-box">
                            <strong>❌ Esclusi</strong>
                            Privati residenziale
                        </div>
                    </div>
                </div>
                
                <div class="requisiti-tech">
                    <h3>🔧 Requisiti Tecnici</h3>
                    <ul class="modal-list">
                        <li>Rispetto valori trasmittanza termica limite per zona climatica</li>
                        <li>Materiali isolanti con marcatura CE e certificazione</li>
                        <li>Superficie minima intervento ≥ 25% superficie disperdente</li>
                        <li>Conformità alle normative tecniche di settore</li>
                        <li>APE post-intervento obbligatorio</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>💰 Percentuali Incentivo</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>Privati terziario</strong>
                            Fino al 65%
                        </div>
                        <div class="modal-info-box">
                            <strong>PA standard</strong>
                            Fino al 65%
                        </div>
                        <div class="modal-info-box">
                            <strong>PA condizioni speciali</strong>
                            Fino al 100%
                        </div>
                    </div>
                </div>
                
                <div class="spese-ammissibili">
                    <h3>📊 Spese Ammissibili</h3>
                    <ul class="modal-list">
                        <li>Fornitura e posa in opera dei materiali isolanti</li>
                        <li>Demolizioni e rimozioni necessarie</li>
                        <li>Ripristini e finiture</li>
                        <li>Prestazioni professionali</li>
                        <li>Pratiche autorizzative</li>
                    </ul>
                </div>
                
                <div class="documenti-required">
                    <h3>📄 Documenti Richiesti</h3>
                    <ul class="modal-list">
                        <li>Scheda-domanda GSE compilata</li>
                        <li>APE ante e post intervento</li>
                        <li>Relazione tecnica dell'intervento</li>
                        <li>Fatture e bonifici parlanti</li>
                        <li>Certificazioni materiali isolanti</li>
                        <li>Permessi edilizi (se richiesti)</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>⏱️ Tempi</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>Presentazione domanda</strong>
                            90 giorni da fine lavori
                        </div>
                        <div class="modal-info-box">
                            <strong>Erogazione incentivo</strong>
                            60-120 giorni dall'approvazione
                        </div>
                    </div>
                </div>
            `
        },
        
        'pdc-elettriche-modal': {
            title: '🌡️ Pompe di Calore Elettriche',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 65% (100% PA)</div>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Pompe di calore elettriche aria-acqua, acqua-acqua e geotermiche per climatizzazione invernale e produzione di acqua calda sanitaria. Sostituzione di impianti esistenti (eccezione: nuova installazione solo per aziende agricole/forestali).</p>
                </div>
                
                <div class="modal-section">
                    <h3>👥 Chi può accedere</h3>
                    <div class="modal-info-box">
                        <strong>✅ Tutti i beneficiari</strong>
                        PA, Enti Terzo Settore, Privati terziario, Privati residenziale, CER, Imprese
                    </div>
                </div>
                
                <div class="requisiti-tech">
                    <h3>🔧 Requisiti Tecnici Dettagliati</h3>
                    <ul class="modal-list">
                        <li><strong>Certificazione:</strong> UNI EN 14825</li>
                        <li><strong>SCOP minimo:</strong> Secondo Ecodesign zona "average"</li>
                        <li><strong>Conformità:</strong> Regolamenti Ecodesign</li>
                        <li><strong>Contabilizzazione:</strong> Obbligatoria per potenza &gt;200 kW</li>
                        <li><strong>VRF/VRV:</strong> Ammessa sostituzione solo unità esterna</li>
                        <li><strong>Funzione:</strong> Sostituzione impianti esistenti</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>💰 Calcolo Incentivo</h3>
                    <div class="modal-highlight">
                        <h4>Formula: Ia = Ci × Qu</h4>
                        <p><strong>Ia:</strong> Incentivo annuale<br>
                        <strong>Ci:</strong> Coefficiente di valorizzazione energia termica<br>
                        <strong>Qu:</strong> Energia termica incentivata</p>
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>⏰ Durata Erogazione</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>Potenza ≤35 kW</strong>
                            2 anni
                        </div>
                        <div class="modal-info-box">
                            <strong>Potenza 35-2.000 kW</strong>
                            5 anni
                        </div>
                        <div class="modal-info-box">
                            <strong>Soglia rata unica</strong>
                            15.000€ (era 5.000€ nel CT 2.0)
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>🔗 Interventi Abbinabili (solo PA/terziario)</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>Fotovoltaico + accumulo</strong>
                            20-40%, max 1.500€/kW FTV, 1.000€/kWh accumulo
                        </div>
                        <div class="modal-info-box">
                            <strong>Colonnine EV</strong>
                            Fino al 65% (100% PA)
                        </div>
                    </div>
                </div>
                
                <div class="spese-ammissibili">
                    <h3>📊 Spese Ammissibili</h3>
                    <ul class="modal-list">
                        <li>Smontaggio e dismissione generatore esistente</li>
                        <li>Fornitura e posa PDC</li>
                        <li>Opere elettriche e idrauliche</li>
                        <li>Sistema di contabilizzazione</li>
                        <li>Libretto impianto</li>
                        <li>Prestazioni professionali</li>
                    </ul>
                </div>
                
                <div class="novita-ct30">
                    <h3>🎯 Novità CT 3.0</h3>
                    <p><strong>Incentivo basato su SCOP stagionale:</strong> Il nuovo meccanismo premia solo i generatori più performanti, incentivando l'adozione di tecnologie ad alta efficienza.</p>
                    <ul class="modal-list">
                        <li>VRF/VRV: sostituzione solo unità esterna (prima era completa)</li>
                        <li>Soglia rata unica alzata a 15.000€</li>
                        <li>Possibilità di abbinare fotovoltaico e colonnine EV</li>
                    </ul>
                </div>
            `
        },
        
        'fotovoltaico-modal': {
            title: '☀️ Fotovoltaico con Accumulo',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">20-40%</div>
                    <div style="text-align: center; color: var(--color-error); font-weight: bold; margin-top: 8px;">
                        ⚠️ SOLO SE ABBINATO A POMPA DI CALORE ELETTRICA
                    </div>
                </div>
                
                <div class="modal-highlight">
                    <h3>🎯 GRANDE NOVITÀ CT 3.0</h3>
                    <p>Per la prima volta il Conto Termico incentiva impianti fotovoltaici con sistemi di accumulo, ma solo in configurazioni specifiche.</p>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Impianti fotovoltaici abbinati a sistemi di accumulo elettrochimico per ottimizzare l'autoconsumo e ridurre il fabbisogno energetico degli edifici.</p>
                </div>
                
                <div class="modal-section">
                    <h3>👥 Chi può accedere</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>✅ Ammessi</strong>
                            PA, Privati settore terziario
                        </div>
                        <div class="modal-info-box">
                            <strong>❌ Esclusi</strong>
                            Privati residenziale, Enti Terzo Settore
                        </div>
                    </div>
                </div>
                
                <div class="requisiti-tech">
                    <h3>🔧 Requisiti Tecnici Obbligatori</h3>
                    <ul class="modal-list">
                        <li><strong>CONDIZIONE ESSENZIALE:</strong> Abbinamento obbligatorio a pompa di calore elettrica</li>
                        <li>Certificazione CEI EN per componenti FTV</li>
                        <li>BMS (Battery Management System) intelligenti per accumulo</li>
                        <li>Dimostrazione riduzione fabbisogno energetico edificio</li>
                        <li>Integrazione ottimizzata PDC-FTV-accumulo</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>💰 Massimali e Percentuali</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>Fotovoltaico</strong>
                            1.500€/kW (fino 20kW)
                        </div>
                        <div class="modal-info-box">
                            <strong>Accumulo</strong>
                            1.000€/kWh
                        </div>
                        <div class="modal-info-box">
                            <strong>Incentivo</strong>
                            20-40%
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>⚠️ Limite Importante</h3>
                    <div class="modal-highlight">
                        <h4>Incentivo FTV+accumulo ≤ Incentivo PDC</h4>
                        <p>L'incentivo totale per fotovoltaico e accumulo non può superare l'incentivo riconosciuto per la pompa di calore abbinata.</p>
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>⏱️ Durata Erogazione</h3>
                    <div class="modal-info-box">
                        <strong>Durata</strong>
                        2 anni
                    </div>
                </div>
                
                <div class="documenti-required">
                    <h3>📄 Documenti Specifici Richiesti</h3>
                    <ul class="modal-list">
                        <li>Progetto integrato PDC-FTV-accumulo</li>
                        <li>Certificazioni CEI EN componenti</li>
                        <li>Dichiarazione prestazioni energetiche sistema</li>
                        <li>Schema elettrico unifilare</li>
                        <li>Collaudo sistema integrato</li>
                        <li>Attestazione riduzione fabbisogno energetico</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>🔗 Sinergia Obbligatoria</h3>
                    <p>Questo intervento deve essere sempre abbinato a una pompa di calore elettrica per essere ammissibile. L'obiettivo è massimizzare l'efficienza del sistema edificio-impianto attraverso l'integrazione di diverse tecnologie rinnovabili.</p>
                </div>
            `
        },
        
        'biomassa-modal': {
            title: '🪵 Generatori a Biomassa',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 65% (100% PA)</div>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Caldaie, stufe, camini, termocamini e inserti alimentati a biomassa per riscaldamento e/o produzione di acqua calda sanitaria.</p>
                </div>
                
                <div class="modal-section">
                    <h3>👥 Chi può accedere</h3>
                    <div class="modal-info-box">
                        <strong>✅ Tutti i beneficiari</strong>
                        PA, Enti Terzo Settore, Privati terziario, Privati residenziale, CER, Imprese
                    </div>
                </div>
                
                <div class="requisiti-tech">
                    <h3>🔧 Requisiti Tecnici Stringenti</h3>
                    <ul class="modal-list">
                        <li><strong>Classe ambientale da biomassa esistente:</strong> ≥4 stelle (D.M. 186/2017)</li>
                        <li><strong>Classe ambientale da non biomassa esistente:</strong> ≥5 stelle</li>
                        <li><strong>Nuova installazione (solo agricoltura):</strong> ≥5 stelle</li>
                        <li><strong>Emissioni polveri:</strong> ≤20 mg/Nm³</li>
                        <li><strong>Rendimento:</strong> ≥85%</li>
                        <li><strong>Certificazione ambientale obbligatoria</li>
                        <li><strong>Contabilizzazione:</strong> Obbligatoria &gt;200 kW</li>
                        <li><strong>Accumulo tecnico:</strong> Minimo per potenza &gt;20 kW</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>🎯 Distinzione per Provenienza</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>Sostituzione da biomassa</strong>
                            Generatore nuovo ≥4 stelle
                        </div>
                        <div class="modal-info-box">
                            <strong>Sostituzione da non biomassa</strong>
                            Generatore nuovo ≥5 stelle
                        </div>
                        <div class="modal-info-box">
                            <strong>Nuova installazione</strong>
                            Solo agricoltura, ≥5 stelle
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>⏰ Durata Erogazione</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>Piccola potenza</strong>
                            2 anni
                        </div>
                        <div class="modal-info-box">
                            <strong>Media-alta potenza</strong>
                            5 anni
                        </div>
                    </div>
                </div>
                
                <div class="spese-ammissibili">
                    <h3>📊 Spese Ammissibili</h3>
                    <ul class="modal-list">
                        <li>Smontaggio e dismissione generatore esistente</li>
                        <li>Fornitura e installazione nuovo generatore</li>
                        <li>Sistema di accumulo (se richiesto)</li>
                        <li>Canna fumaria e sistema evacuazione fumi</li>
                        <li>Opere idrauliche complementari</li>
                        <li>Sistema di contabilizzazione (se &gt;200kW)</li>
                        <li>Prestazioni professionali</li>
                    </ul>
                </div>
                
                <div class="novita-ct30">
                    <h3>🎯 Novità CT 3.0 - Requisiti Più Stringenti</h3>
                    <p><strong>Era ≥3 stelle nel CT 2.0, ora ≥4-5 stelle:</strong></p>
                    <ul class="modal-list">
                        <li>Maggiore attenzione alla qualità ambientale</li>
                        <li>Emissioni polveri più rigorose (≤20 mg/Nm³)</li>
                        <li>Rendimento minimo garantito (≥85%)</li>
                        <li>Accumulo tecnico obbligatorio per potenze elevate</li>
                        <li>Certificazioni ambientali più severe</li>
                    </ul>
                </div>
                
                <div class="documenti-required">
                    <h3>📄 Documenti Specifici</h3>
                    <ul class="modal-list">
                        <li>Certificato classe stelle generatore</li>
                        <li>Certificato emissioni (≤20 mg/Nm³)</li>
                        <li>Certificato rendimento (≥85%)</li>
                        <li>Libretto impianto aggiornato</li>
                        <li>Certificato canna fumaria</li>
                        <li>Dichiarazione conformità installazione</li>
                    </ul>
                </div>
            `
        },
        
        'solare-modal': {
            title: '☀️ Solare Termico',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 65% (100% PA)</div>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Collettori solari termici per produzione di acqua calda sanitaria, riscaldamento degli ambienti e solar cooling (raffrescamento solare).</p>
                </div>
                
                <div class="modal-section">
                    <h3>👥 Chi può accedere</h3>
                    <div class="modal-info-box">
                        <strong>✅ Tutti i beneficiari</strong>
                        PA, Enti Terzo Settore, Privati terziario, Privati residenziale, CER, Imprese
                    </div>
                </div>
                
                <div class="requisiti-tech">
                    <h3>🔧 Requisiti Tecnici</h3>
                    <ul class="modal-list">
                        <li><strong>Certificazione:</strong> Solar Keymark obbligatoria</li>
                        <li><strong>Dimensionamento:</strong> Proporzionato al fabbisogno</li>
                        <li><strong>Installazione:</strong> Conforme normative UNI</li>
                        <li><strong>Contabilizzazione:</strong> Obbligatoria per superficie &gt;100 m²</li>
                        <li><strong>Superficie incentivabile:</strong> Fino a 2.500 m²</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>💰 Calcolo Incentivo</h3>
                    <div class="modal-highlight">
                        <h4>Formula: Ia = Ci × Qu × Sl</h4>
                        <p><strong>Ia:</strong> Incentivo annuale<br>
                        <strong>Ci:</strong> Coefficiente di valorizzazione<br>
                        <strong>Qu:</strong> Energia termica producibile<br>
                        <strong>Sl:</strong> Superficie lorda collettori</p>
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>📊 Coefficienti Aggiornati CT 3.0</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>ACS ≤12m²</strong>
                            0,35 €/kWh
                        </div>
                        <div class="modal-info-box">
                            <strong>ACS 12-50m²</strong>
                            0,32 €/kWh
                        </div>
                        <div class="modal-info-box">
                            <strong>ACS+riscaldamento ≤12m²</strong>
                            0,36 €/kWh
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>💰 Massimali</h3>
                    <div class="modal-info-box">
                        <strong>Piccole superfici</strong>
                        Fino a 700 €/m²
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>⏰ Durata Erogazione</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>≤50 m²</strong>
                            2 anni
                        </div>
                        <div class="modal-info-box">
                            <strong>&gt;50 m²</strong>
                            5 anni
                        </div>
                    </div>
                </div>
                
                <div class="spese-ammissibili">
                    <h3>📊 Spese Ammissibili</h3>
                    <ul class="modal-list">
                        <li>Collettori solari e accessori</li>
                        <li>Serbatoio di accumulo</li>
                        <li>Scambiatori di calore</li>
                        <li>Circolatori e componentistica</li>
                        <li>Fluido termovettore</li>
                        <li>Sistema di controllo e regolazione</li>
                        <li>Installazione e messa in opera</li>
                        <li>Sistema di contabilizzazione (se &gt;100m²)</li>
                        <li>Prestazioni professionali</li>
                    </ul>
                </div>
                
                <div class="novita-ct30">
                    <h3>🎯 Novità CT 3.0 - Coefficienti Calibrati</h3>
                    <p><strong>Coefficienti calibrati su dimensione:</strong></p>
                    <ul class="modal-list">
                        <li>Premiano gli impianti più potenti ed efficienti</li>
                        <li>Differenziazione per tipologia d'uso (ACS, riscaldamento)</li>
                        <li>Ottimizzazione economica per diverse superfici</li>
                        <li>Maggiore precisione nel calcolo dell'energia producibile</li>
                    </ul>
                </div>
                
                <div class="documenti-required">
                    <h3>📄 Documenti Richiesti</h3>
                    <ul class="modal-list">
                        <li>Certificato Solar Keymark collettori</li>
                        <li>Progetto termotecnico impianto</li>
                        <li>Dimensionamento e calcoli energetici</li>
                        <li>Dichiarazione conformità UNI</li>
                        <li>Collaudo funzionale</li>
                        <li>Libretto impianto solare</li>
                    </ul>
                </div>
            `
        },
        
        'infissi-modal': {
            title: '🪟 Sostituzione Infissi',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 65% (100% PA condizioni specifiche)</div>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Sostituzione di serramenti (finestre, porte-finestre, lucernari) e cassonetti con nuovi elementi ad alta efficienza energetica.</p>
                </div>
                
                <div class="modal-section">
                    <h3>👥 Chi può accedere</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>✅ Ammessi</strong>
                            PA, Enti Terzo Settore, Privati settore terziario
                        </div>
                        <div class="modal-info-box">
                            <strong>❌ Esclusi</strong>
                            Privati residenziale
                        </div>
                    </div>
                </div>
                
                <div class="modal-highlight">
                    <h3>🎯 Novità CT 3.0</h3>
                    <p><strong>Prima volta per privati terziario:</strong> Nel CT 2.0 solo PA erano ammesse, ora anche imprese e edifici del terziario possono accedere agli incentivi.</p>
                </div>
                
                <div class="requisiti-tech">
                    <h3>🔧 Requisiti Tecnici</h3>
                    <ul class="modal-list">
                        <li>Valori di trasmittanza termica conformi ai limiti di zona climatica</li>
                        <li>Certificazioni prestazioni termiche</li>
                        <li>Marcatura CE obbligatoria</li>
                        <li>Posa in opera a regola d'arte</li>
                        <li>Sostituzione integrale del serramento</li>
                    </ul>
                </div>
            `
        },
        
        'schermature-modal': {
            title: '🌞 Schermature Solari',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 65% (100% PA condizioni specifiche)</div>
                </div>
                
                <div class="modal-highlight">
                    <h3>🎯 NOVITÀ CT 3.0</h3>
                    <p><strong>Completamente nuovo:</strong> Le schermature solari sono una delle grandi novità del Conto Termico 3.0.</p>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Frangisole, tende esterne, sistemi ombreggianti e dispositivi per il controllo solare per ridurre i carichi termici estivi e migliorare il comfort.</p>
                </div>
                
                <div class="modal-section">
                    <h3>👥 Chi può accedere</h3>
                    <div class="modal-info-box">
                        <strong>✅ Ammessi</strong>
                        PA, Enti Terzo Settore, Privati settore terziario
                    </div>
                </div>
            `
        },
        
        'led-modal': {
            title: '💡 Illuminazione LED',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 65% (100% PA)</div>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Sostituzione di sistemi di illuminazione esistenti con sistemi LED ad alta efficienza per illuminazione interna ed esterna.</p>
                </div>
                
                <div class="modal-section">
                    <h3>👥 Chi può accedere</h3>
                    <div class="modal-info-box">
                        <strong>✅ Ammessi</strong>
                        PA, Enti Terzo Settore, Privati settore terziario
                    </div>
                </div>
            `
        },
        
        'automation-modal': {
            title: '🤖 Building Automation',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 65% (100% PA)</div>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Sistemi di automazione e controllo degli edifici (BACS) per l'ottimizzazione della gestione energetica.</p>
                </div>
                
                <div class="requisiti-tech">
                    <h3>🔧 Requisiti Tecnici</h3>
                    <ul class="modal-list">
                        <li><strong>Conformità:</strong> CEI EN 15232</li>
                        <li>Controllo climatizzazione, illuminazione, ventilazione</li>
                        <li>Monitoraggio consumi energetici</li>
                    </ul>
                </div>
            `
        },
        
        'colonnine-modal': {
            title: '🚗 Colonnine Ricarica EV',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 65% (100% PA)</div>
                    <div style="text-align: center; color: var(--color-error); font-weight: bold; margin-top: 8px;">
                        ⚠️ SOLO SE ABBINATE A POMPA DI CALORE ELETTRICA
                    </div>
                </div>
                
                <div class="modal-highlight">
                    <h3>🎯 GRANDE NOVITÀ CT 3.0</h3>
                    <p>Per la prima volta il Conto Termico incentiva infrastrutture di ricarica per veicoli elettrici, ma solo se abbinate a pompe di calore elettriche.</p>
                </div>
                
                <div class="modal-section">
                    <h3>👥 Chi può accedere</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>✅ Ammessi</strong>
                            PA, Privati settore terziario
                        </div>
                        <div class="modal-info-box">
                            <strong>❌ Esclusi</strong>
                            Privati residenziale
                        </div>
                    </div>
                </div>
                
                <div class="requisiti-tech">
                    <h3>🔧 Condizione Obbligatoria</h3>
                    <ul class="modal-list">
                        <li><strong>ABBINAMENTO OBBLIGATORIO:</strong> Pompa di calore elettrica</li>
                        <li>Installazione integrata e sinergica</li>
                        <li>Ottimizzazione dei carichi elettrici</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>⏱️ Durata</h3>
                    <div class="modal-info-box">
                        <strong>Durata</strong>
                        2 anni
                    </div>
                </div>
            `
        },
        
        'bivalenti-modal': {
            title: '⚙️ Sistemi Bivalenti a Pompa di Calore',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 65% (100% PA)</div>
                </div>
                
                <div class="modal-highlight">
                    <h3>🎯 NOVITÀ CT 3.0</h3>
                    <p>I sistemi bivalenti installati in loco (NON prefabbricati) sono una novità assoluta del CT 3.0, insieme ai sistemi add-on.</p>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Sistemi composti da pompa di calore abbinata a caldaia, installati e configurati sul posto (non prefabbricati).</p>
                </div>
                
                <div class="requisiti-tech">
                    <h3>🔧 Requisiti Tecnici Stringenti</h3>
                    <ul class="modal-list">
                        <li><strong>Caldaia:</strong> Condensazione, requisiti minimi prestazionali</li>
                        <li><strong>PDC:</strong> Rispetto requisiti pompe di calore elettriche/gas</li>
                        <li><strong>Termoregolazione:</strong> Classi V-VIII (autonomo) o equivalente (centralizzato)</li>
                        <li><strong>Compatibilità:</strong> Dichiarazione fabbricante, lista generatori compatibili</li>
                        <li><strong>Controllo:</strong> Sistema ottimizzazione preferenziale PDC</li>
                        <li><strong>Asseverazione:</strong> Tecnico abilitato se fabbricanti diversi</li>
                    </ul>
                </div>
            `
        },
        
        'ibridi-modal': {
            title: '🔧 Sistemi Ibridi Factory-Made',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 65% (100% PA)</div>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Apparecchio ibrido prefabbricato composto da pompa di calore abbinata a caldaia a condensazione o a biomassa.</p>
                </div>
                
                <div class="requisiti-tech">
                    <h3>🔧 Requisiti Tecnici</h3>
                    <ul class="modal-list">
                        <li><strong>Rapporto potenze:</strong> PDC/caldaia ≤0,5</li>
                        <li><strong>PDC:</strong> Requisiti pompe di calore standard</li>
                        <li><strong>Caldaia gas:</strong> Condensazione, ηs >90% (Pn<400kW)</li>
                        <li><strong>Caldaia biomassa:</strong> ≥4 stelle</li>
                        <li><strong>Regolazione:</strong> Sistema intelligente integrato</li>
                        <li><strong>Documentazione:</strong> Completa del sistema prefabbricato</li>
                    </ul>
                </div>
            `
        },
        
        'scaldacqua-modal': {
            title: '🚿 Scaldacqua a Pompa di Calore',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Cifre Fisse: 400€ - 900€</div>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Bollitori con pompa di calore integrata per la produzione di acqua calda sanitaria in sostituzione di scaldacqua elettrici o a gas.</p>
                </div>
                
                <div class="modal-section">
                    <h3>👥 Chi può accedere</h3>
                    <div class="modal-info-box">
                        <strong>✅ Tutti i beneficiari</strong>
                        PA, Enti Terzo Settore, Privati terziario, Privati residenziale, CER, Imprese
                    </div>
                </div>
                
                <div class="requisiti-tech">
                    <h3>🔧 Requisiti Tecnici</h3>
                    <ul class="modal-list">
                        <li><strong>Classe efficienza:</strong> ≥A (Reg. UE 812/2013)</li>
                        <li><strong>Funzione:</strong> Sostituzione scaldacqua elettrici/gas</li>
                        <li><strong>Certificazione:</strong> Conformità regolamenti europei</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>💰 Incentivi a Cifra Fissa</h3>
                    <div class="modal-grid">
                        <div class="modal-info-box">
                            <strong>Classe A, ≤150L</strong>
                            400€
                        </div>
                        <div class="modal-info-box">
                            <strong>Classe A, &gt;150L</strong>
                            700€
                        </div>
                        <div class="modal-info-box">
                            <strong>Classe &gt;A, ≤150L</strong>
                            500€
                        </div>
                        <div class="modal-info-box">
                            <strong>Classe &gt;A, &gt;150L</strong>
                            900€
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>⏱️ Erogazione</h3>
                    <div class="modal-info-box">
                        <strong>Modalità</strong>
                        Rata unica
                    </div>
                </div>
                
                <div class="spese-ammissibili">
                    <h3>📊 Spese Ammissibili</h3>
                    <ul class="modal-list">
                        <li>Smontaggio scaldacqua esistente</li>
                        <li>Fornitura bollitore PDC</li>
                        <li>Installazione e allacciamenti</li>
                        <li>Opere elettriche ed idrauliche</li>
                        <li>Messa in servizio</li>
                        <li>Prestazioni professionali</li>
                    </ul>
                </div>
                
                <div class="novita-ct30">
                    <h3>🎯 Novità CT 3.0 - Sistema Semplificato</h3>
                    <p><strong>Incentivo a cifra fissa (era percentuale nel CT 2.0):</strong></p>
                    <ul class="modal-list">
                        <li>Calcolo semplificato e immediato</li>
                        <li>Maggiore chiarezza per il beneficiario</li>
                        <li>Differenziazione per classe energetica e capacità</li>
                        <li>Eliminazione complessità di calcolo su spese</li>
                        <li>Incentivo più attrattivo per classi superiori</li>
                    </ul>
                </div>
                
                <div class="documenti-required">
                    <h3>📄 Documenti Richiesti</h3>
                    <ul class="modal-list">
                        <li>Etichetta energetica prodotto (classe ≥A)</li>
                        <li>Scheda tecnica bollitore PDC</li>
                        <li>Certificato capacità (litri)</li>
                        <li>Fattura e bonifico parlante</li>
                        <li>Dichiarazione sostituzione</li>
                        <li>Libretto impianto</li>
                    </ul>
                </div>
            `
        },
        
        'pdc-gas-modal': {
            title: '🔥 Pompe di Calore a Gas',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 65% (100% PA)</div>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Pompe di calore alimentate a gas naturale o GPL per sostituzione di generatori di calore esistenti.</p>
                </div>
                
                <div class="requisiti-tech">
                    <h3>🔧 Requisiti Tecnici</h3>
                    <ul class="modal-list">
                        <li>Efficienza media stagionale minima secondo Ecodesign</li>
                        <li>Emissioni NOx limitate secondo normativa</li>
                        <li>Contabilizzazione obbligatoria per potenza >200 kW</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>⏰ Durata</h3>
                    <div class="modal-info-box">
                        <strong>Durata</strong>
                        2-5 anni secondo potenza
                    </div>
                </div>
            `
        },
        
        'teleriscaldamento-modal': {
            title: '🏭 Teleriscaldamento Efficiente',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 65% (100% PA)</div>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Allaccio a reti di teleriscaldamento alimentate da fonti rinnovabili o sistemi ad alta efficienza.</p>
                </div>
                
                <div class="modal-section">
                    <h3>⏰ Durata</h3>
                    <div class="modal-info-box">
                        <strong>Durata</strong>
                        2-5 anni
                    </div>
                </div>
            `
        },
        
        'nzeb-modal': {
            title: '🏢 Trasformazione in nZEB',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Percentuali massime previste</div>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione Completa</h3>
                    <p>Trasformazione di edifici esistenti in edifici a energia quasi zero (nearly Zero Energy Building) attraverso interventi integrati.</p>
                </div>
            `
        },
        
        'demolizione-modal': {
            title: '🏗️ Demolizione e Ricostruzione nZEB',
            content: `
                <div class="modal-section">
                    <div class="incentivo-value">Fino al 100%</div>
                </div>
                
                <div class="modal-highlight">
                    <h3>🎯 NOVITÀ CT 3.0</h3>
                    <p>Intervento completamente nuovo, riservato esclusivamente alle Pubbliche Amministrazioni.</p>
                </div>
                
                <div class="modal-section">
                    <h3>👥 Chi può accedere</h3>
                    <div class="modal-info-box">
                        <strong>✅ SOLO Pubbliche Amministrazioni</strong>
                        Intervento riservato esclusivamente alla PA
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>📋 Descrizione</h3>
                    <p>Demolizione di edifici pubblici esistenti e ricostruzione con standard nZEB. Possibile ampliamento fino al 25% della superficie.</p>
                </div>
            `
        }
    };
    
    return modalDataMap[modalId] || null;
}

// Add modal data for remaining interventions (completed above)

// Utility function to handle modal clicks on intervention cards
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all intervention cards that don't already have onclick
    const interventoCards = document.querySelectorAll('.intervento-card');
    
    interventoCards.forEach(card => {
        // Skip cards that already have onclick attribute
        if (!card.hasAttribute('onclick')) {
            const title = card.querySelector('h4');
            if (title) {
                const titleText = title.textContent.trim();
                let modalId = '';
                
                // Map titles to modal IDs for cards without onclick
                switch(titleText) {
                    case 'Microcogenerazione da FER':
                        modalId = 'microcogenerazione-modal';
                        break;
                    case 'Pompe di calore add-on':
                        modalId = 'addon-modal';
                        break;
                    // Add more mappings as needed
                }
                
                if (modalId) {
                    card.setAttribute('onclick', `openModal('${modalId}')`);
                    card.style.cursor = 'pointer';
                    
                    // Add action hint if not present
                    if (!card.querySelector('.card-action')) {
                        const actionDiv = document.createElement('div');
                        actionDiv.className = 'card-action';
                        actionDiv.textContent = '👆 Clicca per dettagli';
                        card.appendChild(actionDiv);
                    }
                }
            }
        }
    });
});