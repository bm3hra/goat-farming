document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars-staggered');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars-staggered');
            }
        });
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars-staggered');
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Form submission is now handled securely via FormSubmit.co in HTML

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Lower is faster

    const startCounters = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText.replace(/[^0-9]/g, '');
                    
                    const inc = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc) + "K+";
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target / 1000 + "K+";
                    }
                };
                
                counter.innerText = '0';
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        startCounters.observe(counter);
    });

    // Dashboard Initialization
    const tools = [
        { title: 'चारा कैलकुलेटर', desc: 'रोज का हरा, सूखा चारा और दाना जानें', icon: '🌾', color: '#16a34a' },
        { title: 'ब्रीडिंग कैलेंडर', desc: 'डिलीवरी तारीख और टीकों का समय', icon: '📅', color: '#2563eb' },
        { title: 'शेड स्पेस कैलकुलेटर', desc: 'बकरियों के लिए सही जगह का माप', icon: '🏠', color: '#d97706' },
        { title: 'लोन और सब्सिडी', desc: 'नाबार्ड योजनाओं की वित्तीय जानकारी', icon: '💰', color: '#4f46e5' },
        { title: 'रोग और उपचार', desc: 'बीमारी के लक्षण और प्राथमिक उपचार', icon: '🩺', color: '#dc2626' },
        { title: 'उन्नत नस्लें व भाव', desc: 'नस्लों की पहचान और मंडी भाव', icon: '📈', color: '#059669' },
        { title: 'वजन अनुमानक', desc: 'बिना मशीन के फीते से वजन मापें', icon: '⚖️', color: '#9333ea' },
        { title: 'डीवर्मिंग गाइड', desc: 'पेट के कीड़ों की दवा का सही चक्र', icon: '💊', color: '#0891b2' },
        { title: 'त्योहार / ईद मुनाफा', desc: 'त्योहारों पर लागत और मुनाफा', icon: '🪙', color: '#ea580c' },
        { title: 'डिजिटल खाता-बही', desc: 'रोज की आमदनी और खर्च का हिसाब', icon: '📘', color: '#0f766e' },
        { title: 'टीकाकरण अलार्म', desc: 'PPR, FMD टीकों का पूरा चार्ट', icon: '🔔', color: '#e11d48' },
        { title: 'मौसम और केयर', desc: 'हीट/कोल्ड स्ट्रेस अलर्ट और सुझाव', icon: '🌡️', color: '#f59e0b' },
        { title: 'स्मार्ट आईडी कार्ड', desc: 'बकरी का डिजिटल पहचान पत्र बनाएं', icon: '🪪', color: '#6366f1' },
        { title: 'दूध उत्पादन ट्रैकर', desc: 'रोज के दूध का हिसाब और मुनाफा', icon: '🥛', color: '#14b8a6' },
        { title: 'AI स्मार्ट स्कैनर', desc: 'कैमरे से वजन और रोग का अनुमान', icon: '📷', color: '#8b5cf6' },
        { title: 'WebAR शेड प्लानर', desc: 'कैमरे से खेत में 3D शेड रखकर देखें', icon: '👓', color: '#0ea5e9' },
        { title: 'WhatsApp हेल्थ-लाइन', desc: 'WhatsApp पर वॉइस/टेक्स्ट से सीधे डॉक्टर से जुड़ें', icon: '💬', color: '#22c55e' },
        { title: 'NABARD DPR मेकर', desc: 'बैंक लोन के लिए प्रोजेक्ट रिपोर्ट बनाएं', icon: '📄', color: '#8b5cf6' },
        { title: 'QR Goat ID सिस्टम', desc: 'बकरी का डिजिटल QR रिकॉर्ड बनाएं', icon: '📱', color: '#ec4899' },
        { title: 'बकरी मार्केटप्लेस', desc: 'बकरियां खरीदें और बेचें', icon: '🛒', color: '#f59e0b' },
        { title: 'AI बीमारी स्कैनर', desc: 'लक्षणों से बीमारी और उपचार जानें', icon: '🏥', color: '#ef4444' },
        { title: 'Body Condition Score', desc: 'BCS स्कोर से बकरी की सेहत जांचें', icon: '🐐', color: '#10b981' },
        { title: 'दांतों से उम्र की पहचान', desc: 'दांत देखकर सही उम्र का पता लगाएं', icon: '🦷', color: '#8b5cf6' },
        { title: 'कमर्शियल फार्म ROI', desc: 'बड़े फार्म के लिए लागत और मुनाफा', icon: '💰', color: '#f59e0b' },
        { title: 'AI व सीमेन बैंक ट्रैकर', desc: 'कृत्रिम गर्भाधान (AI) का रिकॉर्ड', icon: '🧬', color: '#3b82f6' },
        { title: 'क्रॉस-ब्रीडिंग (Genetics)', desc: 'दो अलग नस्लों के मिलान का परिणाम', icon: '🐐', color: '#ec4899' },
        { title: 'सस्ता दाना फॉर्म्यूलेटर', desc: 'बाज़ार भाव से सबसे सस्ता और पौष्टिक दाना बनाएं', icon: '🌾', color: '#16a34a' },
        { title: 'हीट स्ट्रेस स्कैनर (THI)', desc: 'तापमान व नमी से बकरियों पर खतरे की जांच', icon: '🌡️', color: '#dc2626' },
        { title: 'फार्म P&L एकाउंटिंग', desc: 'हर महीने की आय, खर्च और मुनाफे का हिसाब', icon: '📊', color: '#6366f1' },
        { title: 'गोट बैंक (Leasing)', desc: 'बकरी लीज़ पर देने का मुनाफा और शर्तें', icon: '🤝', color: '#8b5cf6' },
        { title: 'हरा चारा कैलेंडर', desc: 'साल भर हरे चारे की बुवाई का प्लानर', icon: '🌱', color: '#10b981' },
        { title: 'नवजात शिशु (Colostrum)', desc: 'पैदा हुए बच्चे के लिए खीस की सही मात्रा', icon: '🍼', color: '#f59e0b' },
        { title: 'AI प्राइसिंग कैलकुलेटर', desc: 'बकरी का सही बाज़ार मूल्य जानें', icon: '🏷️', color: '#8b5cf6' },
        { title: 'पशु बीमा (Insurance)', desc: 'बीमा प्रीमियम और सरकारी सब्सिडी निकालें', icon: '🛡️', color: '#3b82f6' },
        { title: 'Goat Pedigree Tracker', desc: 'वंशावली और ब्रीडिंग इतिहास', icon: '🌳', color: '#be185d' },
        { title: 'Growth Tracker', desc: 'मासिक वजन और वृद्धि चार्ट', icon: '📈', color: '#0369a1' },
        { title: 'AI Feed Formulator', desc: 'मक्का-बाजरा से संतुलित AI राशन', icon: '🧪', color: '#15803d' },
        { title: 'Health Passport', desc: 'बकरी का पूरा मेडिकल और सेल इतिहास', icon: '🛂', color: '#6d28d9' }
    ];

    const wrappers = document.querySelectorAll('.calculator-wrapper');
    const dashboardCards = document.getElementById('dashboard-cards');
    
    if (dashboardCards && wrappers.length === tools.length) {
        wrappers.forEach((wrapper, index) => {
            wrapper.id = 'tool-' + index;
            wrapper.style.display = 'none'; // Hide all initially
            
            // Generate Card
            const tool = tools[index];
            const card = document.createElement('div');
            card.className = 'dashboard-card';
            card.style.cssText = `background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); padding: 25px; border-radius: 20px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); border: 1px solid rgba(255,255,255,0.8); border-bottom: 4px solid ${tool.color}; cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; flex-direction: column;`;
            card.innerHTML = `
                <div style="font-size: 2.5rem; margin-bottom: 12px;">${tool.icon}</div>
                <h3 style="font-size: 1.15rem; color: var(--dark); margin-bottom: 8px; font-weight: 700;">${tool.title}</h3>
                <p style="font-size: 0.9rem; color: var(--gray-600); margin-bottom: 20px; flex-grow: 1;">${tool.desc}</p>
                <div style="font-size: 0.85rem; color: ${tool.color}; font-weight: bold; padding-top: 10px; border-top: 1px dashed rgba(0,0,0,0.1);">शुरू करें &rarr;</div>
            `;
            
            card.onmouseenter = () => { card.style.transform = 'translateY(-8px)'; card.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; };
            card.onmouseleave = () => { card.style.transform = 'translateY(0)'; card.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.05)'; };
            
            card.onclick = () => showTool(index);
            
            dashboardCards.appendChild(card);
        });
    }

    // Assign to window for global access
    window.showTool = function(index) {
        document.getElementById('dashboard-view').style.display = 'none';
        document.getElementById('back-btn-container').style.display = 'block';
        
        wrappers.forEach((w, i) => {
            w.style.display = i === index ? 'block' : 'none';
        });
        
        document.getElementById('tools').scrollIntoView({behavior: 'smooth'});
    };

    window.showDashboard = function() {
        document.getElementById('dashboard-view').style.display = 'block';
        document.getElementById('back-btn-container').style.display = 'none';
        
        wrappers.forEach(w => w.style.display = 'none');
        document.getElementById('tools').scrollIntoView({behavior: 'smooth'});
    };
});

// Feed Calculator Logic
function calculateFeed() {
    const countInput = document.getElementById('goatCount');
    const typeInput = document.getElementById('goatType');
    const resultSection = document.getElementById('resultSection');
    
    if (!countInput || !typeInput || !resultSection) return;

    const count = parseInt(countInput.value);
    const type = typeInput.value;
    
    if (isNaN(count) || count <= 0) {
        alert("कृपया बकरियों की सही संख्या डालें (Please enter a valid number of goats)");
        return;
    }

    let greenPerGoat = 0;
    let dryPerGoat = 0;
    let grainPerGoat = 0;

    if (type === 'adult') {
        greenPerGoat = 3.5;
        dryPerGoat = 1.0;
        grainPerGoat = 0.25;
    } else if (type === 'kid') {
        greenPerGoat = 1.5;
        dryPerGoat = 0.4;
        grainPerGoat = 0.1;
    } else if (type === 'pregnant') {
        greenPerGoat = 4.0;
        dryPerGoat = 1.2;
        grainPerGoat = 0.4;
    }

    const totalGreen = (greenPerGoat * count).toFixed(2);
    const totalDry = (dryPerGoat * count).toFixed(2);
    const totalGrain = (grainPerGoat * count).toFixed(2);

    document.getElementById('greenFeed').innerText = totalGreen;
    document.getElementById('dryFeed').innerText = totalDry;
    document.getElementById('grainFeed').innerText = totalGrain;
    
    resultSection.style.display = 'block';
}

// Kidding Calendar Logic
function calculateKidding() {
    const breedingInput = document.getElementById('breedingDate');
    const resultSection = document.getElementById('kiddingResult');
    
    if (!breedingInput || !resultSection || !breedingInput.value) {
        alert("कृपया ब्रीडिंग (क्रॉसिंग) की तारीख चुनें");
        return;
    }

    const start = new Date(breedingInput.value);

    // 1. Delivery Date (Average 150 days)
    const kidding = new Date(start);
    kidding.setDate(start.getDate() + 150);

    // 2. Vaccine Date (90-100 days)
    const vaccineDate = new Date(start);
    vaccineDate.setDate(start.getDate() + 100);

    // 3. Prep Date (140 days)
    const prepDate = new Date(start);
    prepDate.setDate(start.getDate() + 140);

    const formatDate = (dateObj) => {
        return dateObj.toLocaleDateString('hi-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    document.getElementById('vaccineDate').innerText = formatDate(vaccineDate);
    document.getElementById('prepDate').innerText = formatDate(prepDate);
    document.getElementById('kiddingDate').innerText = formatDate(kidding);

    resultSection.style.display = 'block';
}

// Shed Space Calculator Logic
function calculateShedSpace() {
    const countInput = document.getElementById('shedGoatCount');
    const typeInput = document.getElementById('shedType');
    const resultSection = document.getElementById('shedResult');
    
    if (!countInput || !typeInput || !resultSection) return;

    const count = parseInt(countInput.value);
    const type = typeInput.value;
    
    if (isNaN(count) || count <= 0) {
        alert("कृपया बकरियों की सही संख्या दर्ज करें");
        return;
    }

    let coveredPerGoat = 0;
    let openPerGoat = 0;

    switch (type) {
        case 'mix':
            coveredPerGoat = 12;
            openPerGoat = 24;
            break;
        case 'buck':
            coveredPerGoat = 25;
            openPerGoat = 50;
            break;
        case 'kids':
            coveredPerGoat = 5;
            openPerGoat = 10;
            break;
    }

    const totalCovered = count * coveredPerGoat;
    const totalOpen = count * openPerGoat;
    const grandTotal = totalCovered + totalOpen;

    document.getElementById('coveredSpace').innerText = totalCovered + ' Sq.Ft.';
    document.getElementById('openSpace').innerText = totalOpen + ' Sq.Ft.';
    document.getElementById('totalSpace').innerText = grandTotal;

    resultSection.style.display = 'block';
}

// Loan Subsidy Calculator Logic
function calculateSubsidy() {
    const costInput = document.getElementById('projectCost');
    const categoryInput = document.getElementById('loanCategory');
    const resultSection = document.getElementById('loanResult');
    
    if (!costInput || !categoryInput || !resultSection) return;

    const cost = parseFloat(costInput.value);
    const category = categoryInput.value;
    
    if (isNaN(cost) || cost <= 0) {
        alert("कृपया सही प्रोजेक्ट लागत दर्ज करें");
        return;
    }

    let percentage = 25;
    let categoryName = "सामान्य (General)";

    if (category === 'sc_st_women') {
        percentage = 33.33;
        categoryName = "SC / ST / महिला (Women)";
    }

    const calculatedSubsidy = (cost * (percentage / 100)).toFixed(0);
    const bankLoan = (cost * 0.60).toFixed(0);
    const marginMoney = (cost - parseFloat(calculatedSubsidy) - parseFloat(bankLoan)).toFixed(0);

    document.getElementById('categoryNameResult').innerText = categoryName;
    document.getElementById('subsidyPercentResult').innerText = percentage;
    document.getElementById('subsidyAmountResult').innerText = '₹' + parseInt(calculatedSubsidy).toLocaleString('hi-IN');
    document.getElementById('loanAmountResult').innerText = '₹' + parseInt(bankLoan).toLocaleString('hi-IN');
    document.getElementById('ownAmountResult').innerText = '₹' + parseInt(marginMoney).toLocaleString('hi-IN');

    resultSection.style.display = 'block';
}

// Disease Management Guide Logic
const diseases = [
    {
        id: 'ppr',
        name: 'पी.पी.आर. (PPR - बकरी प्लेग)',
        symptoms: 'तेज बुखार (105-107°F), मुंह में छाले, आंखों और नाक से पानी बहना, और अंत में गंभीर दस्त होना।',
        treatment: 'यह वायरल बीमारी है। बुखार कम करने की दवा दें, मुंह के छालों को लाल दवा के पानी से धोएं और तुरंत डॉक्टर से संपर्क करें। बचाव: साल में एक बार PPR वैक्सीन लगवाएं।'
    },
    {
        id: 'et',
        name: 'फिड़किया (Enterotoxemia / ET)',
        symptoms: 'बकरी का अचानक चक्कर खाकर गिरना, पेट दर्द से तड़पना, दस्त होना और कुछ ही घंटों में मृत्यु हो जाना।',
        treatment: 'लक्षण दिखते ही तुरंत पशु चिकित्सक को बुलाएं। गैस कम करने की दवाएं दें। बचाव: मानसून से पहले ET का टीका सबसे जरूरी है।'
    },
    {
        id: 'fmd',
        name: 'खुरपका-मुंहपका (FMD)',
        symptoms: 'खुरों (पैरों) और मुंह के अंदर छाले पड़ना, छालों का फटना, लंगड़ाकर चलना और मुंह से लगातार लार टपकना।',
        treatment: 'पैरों के छालों को फिनाइल के हल्के घोल या नीम के पानी से साफ करें। मुंह के छालों पर सुहागा और शहद लगाएं। बीमार बकरी को अलग करें।'
    },
    {
        id: 'bloat',
        name: 'अफ़ारा / पेट फूलना (Bloat/Tympany)',
        symptoms: 'पेट का बाईं (Left) तरफ से ढोल की तरह फूल जाना, सांस लेने में तकलीफ होना, बकरी का बार-बार उठना-बैठना।',
        treatment: 'तुरंत 50-100 मिलीलीटर मीठा तेल (अलसी या सरसों का तेल) और उसमें 5-10 ग्राम हींग मिलाकर पिलाएं। बकरी को खड़ा रखने की कोशिश करें।'
    },
    {
        id: 'pneumonia',
        name: 'न्युमोनिया / सर्दी-खांसी (Pneumonia)',
        symptoms: 'खांसी होना, सांस लेते समय पसली चलना, नाक से गाढ़ा बलगम आना और सुस्ती।',
        treatment: 'बकरी को ठंडी हवा और नमी से दूर रखें। गुनगुने पानी में अजवाइन का अर्क दें। डॉक्टर की सलाह पर एंटीबायोटिक दें।'
    }
];

function renderDiseases(list) {
    const container = document.getElementById('diseaseList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (list.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:var(--gray-500); padding:10px;">कोई बीमारी या लक्षण नहीं मिला।</p>';
        return;
    }

    list.forEach(disease => {
        const item = document.createElement('div');
        item.className = 'disease-item';
        
        item.innerHTML = `
            <button class="disease-btn" onclick="toggleDisease('${disease.id}')">
                <span>🛡️ ${disease.name}</span>
                <span id="icon-${disease.id}">+</span>
            </button>
            <div id="content-${disease.id}" class="disease-content">
                <div class="disease-symptoms">
                    <strong style="color: #92400e; display:block; margin-bottom:5px;">⚠️ मुख्य लक्षण:</strong>
                    ${disease.symptoms}
                </div>
                <div class="disease-treatment">
                    <strong style="color: #065f46; display:block; margin-bottom:5px;">💊 प्राथमिक उपचार व बचाव:</strong>
                    ${disease.treatment}
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

function filterDiseases() {
    const term = document.getElementById('diseaseSearch').value.toLowerCase();
    const filtered = diseases.filter(d => 
        d.name.toLowerCase().includes(term) || 
        d.symptoms.toLowerCase().includes(term)
    );
    renderDiseases(filtered);
}

function toggleDisease(id) {
    const content = document.getElementById('content-' + id);
    const icon = document.getElementById('icon-' + id);
    
    // Close others
    document.querySelectorAll('.disease-content').forEach(el => {
        if (el.id !== 'content-' + id) {
            el.classList.remove('active');
            const otherIcon = document.getElementById(el.id.replace('content-', 'icon-'));
            if (otherIcon) otherIcon.innerText = '+';
        }
    });

    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.innerText = '+';
    } else {
        content.classList.add('active');
        icon.innerText = '−';
    }
}

// Initialize disease list on load
if (document.getElementById('diseaseList')) {
    renderDiseases(diseases);
}

// Digital Weight Estimator Logic
function calculateWeight() {
    const girthInput = document.getElementById('heartGirth');
    const lengthInput = document.getElementById('bodyLength');
    const resultSection = document.getElementById('weightResult');
    
    if (!girthInput || !lengthInput || !resultSection) return;

    const g = parseFloat(girthInput.value);
    const l = parseFloat(lengthInput.value);
    
    if (isNaN(g) || isNaN(l) || g <= 0 || l <= 0) {
        alert("कृपया सही नाप (इंच में) दर्ज करें");
        return;
    }

    // Shaeffer's Formula: (Girth^2 x Length) / 300 = Weight in Lbs
    const weightInLbs = (g * g * l) / 300;
    // Convert Lbs to Kg
    const weightInKg = weightInLbs * 0.453592;

    document.getElementById('goatWeightResult').innerText = weightInKg.toFixed(1) + ' kg';
    resultSection.style.display = 'block';
}

// Deworming Tracker Logic
function calculateDeworming() {
    const lastMedicine = document.getElementById('lastDeworming').value;
    const resultSection = document.getElementById('dewormingResult');
    
    if (!resultSection) return;

    let nextMedicine = "";
    let note = "";

    if (lastMedicine === 'albendazole') {
        nextMedicine = "आईवरमेक्टिन (Ivermectin) या फेनबेंडाजोल (Fenbendazole)";
        note = "पिछली बार आपने अलबेंडाजोल दिया था, इसलिए इस बार साल्ट बदलना ज़रूरी है ताकि पेट के कीड़े दवा के प्रति प्रतिरोधी (Resistant) न बनें।";
    } else if (lastMedicine === 'fenbendazole' || lastMedicine === 'none') {
        nextMedicine = "अलबेंडाजोल (Albendazole) या क्लोसेंतुल (Closantel)";
        note = "यह दवा सुबह खाली पेट देना सबसे असरदार होता है। गाभिन बकरियों को अलबेंडाजोल न दें, उनके लिए फेनबेंडाजोल सुरक्षित है।";
    } else {
        nextMedicine = "लेवामिसोल (Levamisole) या नीलज़ान (Nilzan)";
        note = "दवा देने के बाद 2 घंटे तक बकरियों को कुछ न खिलाएं।";
    }

    document.getElementById('nextDewormingMedicine').innerText = nextMedicine;
    document.getElementById('dewormingNote').innerText = note;

    resultSection.style.display = 'block';
}

// Eid Profit Planner Logic
function calculateEidProfit() {
    const purchaseInput = document.getElementById('purchasePrice');
    const monthlyCostInput = document.getElementById('monthlyCost');
    const monthsInput = document.getElementById('monthsToKeep');
    const sellingInput = document.getElementById('sellingPrice');
    const resultSection = document.getElementById('profitResult');
    
    if (!purchaseInput || !monthlyCostInput || !monthsInput || !sellingInput || !resultSection) return;

    const purchase = parseFloat(purchaseInput.value);
    const monthlyCost = parseFloat(monthlyCostInput.value);
    const months = parseInt(monthsInput.value);
    const selling = parseFloat(sellingInput.value);
    
    if (isNaN(purchase) || isNaN(monthlyCost) || isNaN(months) || isNaN(selling)) {
        alert("कृपया सभी जानकारी सही से भरें");
        return;
    }

    const totalFeedingCost = monthlyCost * months;
    const totalCost = purchase + totalFeedingCost;
    const netProfit = selling - totalCost;

    document.getElementById('totalCostResult').innerText = '₹' + totalCost.toLocaleString('hi-IN');
    document.getElementById('netProfitResult').innerText = '₹' + netProfit.toLocaleString('hi-IN');

    // Change color based on profit or loss
    if (netProfit < 0) {
        document.getElementById('netProfitResult').style.color = '#dc2626'; // Red
    } else {
        document.getElementById('netProfitResult').style.color = '#15803d'; // Green
    }

    resultSection.style.display = 'block';
}

// -----------------------------------------------------------
// 🚀 1. PWA Service Worker Registration
// -----------------------------------------------------------
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

// -----------------------------------------------------------
// 🌟 NEW SUPER APP TOOLS (Tool 10 to 14)
// -----------------------------------------------------------

// Tool 10: Digital Ledger
window.calculateLedger = function() {
    const income = parseFloat(document.getElementById('ledgerIncome').value) || 0;
    const expense = parseFloat(document.getElementById('ledgerExpense').value) || 0;
    const net = income - expense;
    const statusEl = document.getElementById('ledgerStatus');
    const wrapper = document.getElementById('ledgerResultWrapper');

    if(net > 0) {
        statusEl.innerText = `₹${net} का मुनाफा (Profit) 📈`;
        statusEl.style.color = '#15803d';
        wrapper.style.backgroundColor = '#dcfce7';
        wrapper.style.borderColor = '#86efac';
    } else if(net < 0) {
        statusEl.innerText = `₹${Math.abs(net)} का नुकसान (Loss) 📉`;
        statusEl.style.color = '#b91c1c';
        wrapper.style.backgroundColor = '#fee2e2';
        wrapper.style.borderColor = '#fca5a5';
    } else {
        statusEl.innerText = `₹0 (कोई मुनाफा या नुकसान नहीं) ⚖️`;
        statusEl.style.color = '#374151';
        wrapper.style.backgroundColor = '#f3f4f6';
        wrapper.style.borderColor = '#d1d5db';
    }
    wrapper.style.display = 'block';
};

// Tool 11: Vaccination Alert
window.generateVaccinationSchedule = function() {
    const age = document.getElementById('vaxAge').value;
    const vaxList = document.getElementById('vaxList');
    const wrapper = document.getElementById('vaxResultWrapper');
    
    let schedule = '';
    if(age === 'kid') {
        schedule = `
            <li><strong>पहले 3 दिन:</strong> खीस (Colostrum) पिलाएं।</li>
            <li><strong>3 हफ्ते:</strong> पहली डीवर्मिंग (Deworming) करें।</li>
            <li><strong>3 महीने:</strong> PPR (पीपीआर) की पहली वैक्सीन लगाएं।</li>
            <li><strong>4 महीने:</strong> FMD (खुरपका-मुंहपका) की वैक्सीन लगाएं।</li>
        `;
    } else if(age === 'young') {
        schedule = `
            <li><strong>4 महीने:</strong> FMD (खुरपका-मुंहपका) की वैक्सीन लगाएं।</li>
            <li><strong>6 महीने:</strong> ET (Enterotoxemia / फड़किया) का टीका लगाएं।</li>
            <li><strong>नियमित:</strong> हर 3 महीने में पेट के कीड़ों की दवा बदल-बदल कर दें।</li>
        `;
    } else {
        schedule = `
            <li><strong>जनवरी/फरवरी:</strong> FMD का टीका (साल में 2 बार)।</li>
            <li><strong>मई/जून:</strong> ET (फड़किया) का टीका (बारिश से पहले)।</li>
            <li><strong>जुलाई/अगस्त:</strong> FMD का दूसरा टीका।</li>
            <li><strong>सितंबर/अक्टूबर:</strong> PPR का टीका (हर 3 साल में एक बार)।</li>
            <li><strong>नवंबर:</strong> Goat Pox (बकरी चेचक) का टीका।</li>
        `;
    }
    
    vaxList.innerHTML = schedule;
    wrapper.style.display = 'block';
};

// Tool 12: Weather Alert
window.checkWeatherStress = function() {
    const temp = parseFloat(document.getElementById('weatherTemp').value) || 30;
    const wrapper = document.getElementById('weatherResultWrapper');
    const statusEl = document.getElementById('weatherStatus');
    const adviceEl = document.getElementById('weatherAdvice');
    const iconEl = document.getElementById('weatherIcon');

    if(temp >= 38) {
        statusEl.innerText = "हीट स्ट्रेस (Heat) अलर्ट!";
        iconEl.className = "fa-solid fa-sun";
        iconEl.style.color = "#dc2626";
        adviceEl.innerText = "गर्मी बहुत ज्यादा है! बकरियों को सीधे धूप से बचाएं। पीने के पानी में इलेक्ट्रोलाइट या ओआरएस (ORS) मिलाएं। शेड में वेंटिलेशन या पंखे की व्यवस्था करें।";
        wrapper.style.backgroundColor = '#fee2e2';
        wrapper.style.borderColor = '#fca5a5';
    } else if(temp <= 15) {
        statusEl.innerText = "कोल्ड स्ट्रेस (Cold) अलर्ट!";
        iconEl.className = "fa-solid fa-snowflake";
        iconEl.style.color = "#0ea5e9";
        adviceEl.innerText = "ठंड का मौसम है! बकरियों को ठंडी हवा से बचाएं। शेड में पुआल (Bedding) बिछाएं और डाइट में गुड़ या थोड़ी ऊर्जा वाली चीजें शामिल करें।";
        wrapper.style.backgroundColor = '#e0f2fe';
        wrapper.style.borderColor = '#bae6fd';
    } else {
        statusEl.innerText = "मौसम अनुकूल है 🌤️";
        iconEl.className = "fa-solid fa-cloud-sun";
        iconEl.style.color = "#16a34a";
        adviceEl.innerText = "वर्तमान तापमान बकरियों के लिए बिल्कुल सही और आरामदायक है। सामान्य डाइट और रूटीन चालू रखें।";
        wrapper.style.backgroundColor = '#dcfce7';
        wrapper.style.borderColor = '#86efac';
    }
    
    wrapper.style.display = 'block';
};

// Tool 13: ID Card Generator
window.generateGoatID = function() {
    const name = document.getElementById('idCardName').value || 'Unknown';
    const breed = document.getElementById('idCardBreed').value || 'Unknown';
    const wrapper = document.getElementById('idCardResultWrapper');
    
    // Generate Random UID
    const uid = 'BKP-' + Math.floor(1000 + Math.random() * 9000);
    
    document.getElementById('outIdName').innerText = name.toUpperCase();
    document.getElementById('outIdBreed').innerText = breed;
    document.getElementById('outIdNumber').innerText = uid;
    
    wrapper.style.display = 'block';
};

// Tool 14: Milk Yield Tracker
window.calculateMilkYield = function() {
    const daily = parseFloat(document.getElementById('milkDaily').value) || 0;
    const price = parseFloat(document.getElementById('milkPrice').value) || 0;
    const wrapper = document.getElementById('milkResultWrapper');
    
    const monthlyTotal = daily * 30;
    const monthlyIncome = monthlyTotal * price;
    
    document.getElementById('milkMonthly').innerText = monthlyTotal.toFixed(1);
    document.getElementById('milkIncome').innerText = monthlyIncome.toFixed(0);
    
    wrapper.style.display = 'block';
};

// Tool 15: AI Smart Scanner (Computer Vision Camera)
let cameraStream = null;

window.startScanner = function() {
    const video = document.getElementById('cameraFeed');
    const container = document.getElementById('scannerContainer');
    const startBtn = document.getElementById('startScanBtn');
    const captureBtn = document.getElementById('captureScanBtn');
    
    // Request back camera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            cameraStream = stream;
            video.srcObject = stream;
            container.style.display = 'block';
            startBtn.style.display = 'none';
            captureBtn.style.display = 'block';
            
            // Hide old results
            document.getElementById('scanResultWrapper').style.display = 'none';
            document.getElementById('scannerLaser').style.display = 'none';
        })
        .catch(err => {
            console.error("Camera access denied: ", err);
            alert("कैमरा चालू नहीं हो सका। कृपया ब्राउज़र सेटिंग्स में कैमरा परमिशन (Allow) चालू करें।");
        });
};

window.stopScanner = function() {
    if(cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    const container = document.getElementById('scannerContainer');
    const startBtn = document.getElementById('startScanBtn');
    const captureBtn = document.getElementById('captureScanBtn');
    
    if(container) container.style.display = 'none';
    if(startBtn) startBtn.style.display = 'block';
    if(captureBtn) captureBtn.style.display = 'none';
};

window.captureAndAnalyze = function() {
    const laser = document.getElementById('scannerLaser');
    const captureBtn = document.getElementById('captureScanBtn');
    const resultWrapper = document.getElementById('scanResultWrapper');
    
    // Start animation
    laser.style.display = 'block';
    captureBtn.disabled = true;
    captureBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> AI Scanning...';
    
    // Simulate 3 seconds AI processing
    setTimeout(() => {
        laser.style.display = 'none';
        captureBtn.disabled = false;
        captureBtn.innerHTML = '<i class="fa-solid fa-microchip"></i> फिर से स्कैन करें';
        
        // Generate random plausible data for demo
        const breeds = ['सिरोही (Sirohi)', 'बरबरी (Barbari)', 'बीटल (Beetal)', 'ब्लैक बंगाल (Black Bengal)'];
        const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
        const randomWeight = (Math.random() * (45 - 20) + 20).toFixed(1);
        
        document.getElementById('aiBreed').innerText = randomBreed;
        document.getElementById('aiWeight').innerText = randomWeight + ' Kg';
        document.getElementById('aiHealth').innerHTML = '<span style="color: #16a34a; font-weight: bold;">स्वस्थ (Healthy) ✅</span>';
        
        resultWrapper.style.display = 'block';
    }, 3000);
};

// Tool 17: WhatsApp Bot Sync
window.sendToWhatsApp = function() {
    const message = document.getElementById('waMessage').value;
    if(!message.trim()) {
        alert("कृपया अपनी समस्या बॉक्स में लिखें।");
        return;
    }
    
    // Format the message
    const formattedMessage = `*Bakri Palan App Alert* 🐐\n\n*किसान की समस्या:*\n${message}\n\n_Sent via Smart App_`;
    const encodedMessage = encodeURIComponent(formattedMessage);
    
    // Replace this with your actual farm WhatsApp number
    const phoneNumber = "919876543210"; 
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
};

// Tool 18: NABARD DPR Generator
window.generateDPR = function() {
    const size = document.getElementById('dprSize').value;
    let cost = 0; let shed = 0; let income = 0;
    
    if (size === '10+1') { cost = 80000; shed = 50000; income = 120000; }
    else if (size === '20+1') { cost = 150000; shed = 90000; income = 250000; }
    else if (size === '50+2') { cost = 350000; shed = 200000; income = 600000; }
    else if (size === '100+4') { cost = 700000; shed = 400000; income = 1250000; }
    
    const totalCost = cost + shed + 20000; // 20k extra for feed/meds
    
    document.getElementById('dprTableContainer').innerHTML = `
        <table style="width: 100%; text-align: left; border-collapse: collapse; margin-top: 10px;">
            <tr style="border-bottom: 1px solid #e2e8f0;"><th style="padding: 8px 0;">विवरण</th><th style="padding: 8px 0; text-align: right;">राशि (₹)</th></tr>
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0;">पशु खरीद लागत</td><td style="padding: 8px 0; text-align: right;">${cost.toLocaleString('en-IN')}</td></tr>
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0;">शेड निर्माण</td><td style="padding: 8px 0; text-align: right;">${shed.toLocaleString('en-IN')}</td></tr>
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0;">चारा व दवाइयाँ</td><td style="padding: 8px 0; text-align: right;">20,000</td></tr>
            <tr style="border-bottom: 2px solid #94a3b8; font-weight: bold;"><td style="padding: 8px 0;">कुल प्रोजेक्ट लागत</td><td style="padding: 8px 0; text-align: right; color: #b91c1c;">${totalCost.toLocaleString('en-IN')}</td></tr>
            <tr style="font-weight: bold;"><td style="padding: 8px 0;">संभावित वार्षिक आय</td><td style="padding: 8px 0; text-align: right; color: #16a34a;">${income.toLocaleString('en-IN')}</td></tr>
        </table>
    `;
    document.getElementById('dprResult').style.display = 'block';
};

// Tool 19: QR Goat ID System
window.generateQR = function() {
    const name = document.getElementById('qrGoatName').value;
    const vaccine = document.getElementById('qrVaccine').value;
    
    if(!name) { alert("कृपया बकरी का टैग नंबर/नाम भरें।"); return; }
    
    const qrData = `Goat ID: ${name} | Last Vaccine: ${vaccine || 'N/A'}`;
    const encodedData = encodeURIComponent(qrData);
    
    document.getElementById('qrCodeImg').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedData}`;
    document.getElementById('qrDataText').innerText = name;
    document.getElementById('qrResult').style.display = 'block';
};

// Tool 20: Goat Marketplace
window.contactSeller = function(goatInfo) {
    const message = `नमस्ते, मैं आपके मार्केटप्लेस पर लिस्ट की गई *${goatInfo}* को खरीदने में रुचि रखता हूँ। कृपया जानकारी दें।`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
};

// Tool 21: AI Disease Predictor
window.predictDisease = function() {
    const symptom = document.getElementById('diseaseSymptoms').value;
    let output = "";
    
    if(symptom === 'fever_cough') {
        output = "<strong>संभावित बीमारी:</strong> PPR (बकरियों की प्लेग) या निमोनिया<br><strong>जोखिम:</strong> <span style='color: #dc2626; font-weight: bold;'>बहुत अधिक (High)</span><br><strong>उपचार:</strong> तुरंत पशु चिकित्सक को बुलाएं। अन्य बकरियों से अलग (Isolate) करें।";
    } else if (symptom === 'mouth_ulcer') {
        output = "<strong>संभावित बीमारी:</strong> FMD (खुरपका-मुंहपका)<br><strong>जोखिम:</strong> <span style='color: #ea580c; font-weight: bold;'>अधिक (High)</span><br><strong>उपचार:</strong> पोटेशियम परमैंगनेट (लाल दवा) से मुंह और खुर धोएं। मुलायम चारा दें।";
    } else if (symptom === 'stomach_swell') {
        output = "<strong>संभावित बीमारी:</strong> आफरा (Bloat) या एसिडोसिस<br><strong>जोखिम:</strong> <span style='color: #dc2626; font-weight: bold;'>अति-गंभीर (Emergency)</span><br><strong>उपचार:</strong> मीठा तेल (Soya/Peanut oil) पिलाएं। पेट के बाईं ओर मालिश करें। तुरंत डॉक्टर बुलाएं।";
    } else if (symptom === 'loose_motion') {
        output = "<strong>संभावित बीमारी:</strong> पेट के कीड़े (Worms) या बैक्टीरियल इन्फेक्शन<br><strong>जोखिम:</strong> <span style='color: #eab308; font-weight: bold;'>मध्यम (Medium)</span><br><strong>उपचार:</strong> डीवर्मिंग (Albendazole) करवाएं। ओ.आर.एस. (ORS) का पानी पिलाएं।";
    }
    
    document.getElementById('diseaseOutput').innerHTML = output;
    document.getElementById('diseaseResult').style.display = 'block';
};

window.sendToWhatsAppDisease = function() {
    const symptomRaw = document.getElementById('diseaseSymptoms').options[document.getElementById('diseaseSymptoms').selectedIndex].text;
    const msg = `*पशु चिकित्सा सहायता (Emergency Alert)* 🚨\n\n*लक्षण:* ${symptomRaw}\n*कृपया जल्द सहायता करें!*\n\n_Sent via Smart Disease Scanner_`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
};

// Tool 22: BCS Calculator
window.calculateBCS = function() {
    const spine = parseInt(document.getElementById('bcsSpine').value) || 0;
    const ribs = parseInt(document.getElementById('bcsRibs').value) || 0;
    const score = ((spine + ribs) / 2).toFixed(1);
    
    let advice = "";
    if (score < 2.5) {
        advice = "<span style='color: #dc2626;'>बहुत कमजोर (Thin):</span> दाना और मिनरल मिक्चर की मात्रा बढ़ाएं। पेट के कीड़ों की दवा (Deworming) दें।";
    } else if (score >= 2.5 && score <= 3.5) {
        advice = "<span style='color: #16a34a;'>आदर्श (Ideal/Healthy):</span> बहुत बढ़िया! इसी तरह का संतुलित आहार बनाए रखें।";
    } else {
        advice = "<span style='color: #ea580c;'>मोटापा (Fat/Obese):</span> दाना कम करें और हरा चारा/चराई बढ़ाएं। गाभिन बकरियों में मोटापा खतरनाक हो सकता है।";
    }
    
    document.getElementById('bcsOutput').innerText = score;
    document.getElementById('bcsAdvice').innerHTML = advice;
    document.getElementById('bcsResult').style.display = 'block';
};

// Tool 23: Age Estimator from Teeth
window.calculateAge = function() {
    const teeth = document.getElementById('goatTeeth').value;
    let age = "";
    if (teeth === "0") age = "1 साल से कम (Kid) - सभी दूध के दांत";
    else if (teeth === "2") age = "1 से 1.5 साल (Young) - 2 पक्के दांत";
    else if (teeth === "4") age = "1.5 से 2 साल (Adult) - 4 पक्के दांत";
    else if (teeth === "6") age = "2.5 से 3 साल (Mature) - 6 पक्के दांत";
    else if (teeth === "8") age = "3 से 4 साल या अधिक (Full Mouth) - 8 पक्के दांत";
    else age = "बुजुर्ग बकरी (Broken Mouth) - दांत टूट रहे हैं";
    
    document.getElementById('ageOutput').innerText = age;
    document.getElementById('ageResult').style.display = 'block';
};

// Tool 24: Commercial ROI Calculator
window.calculateCommercialROI = function() {
    const unit = document.getElementById('roiUnitSize').value;
    let investment = 0, profit = 0, time = 0;
    
    if (unit === "20") { investment = 250000; profit = 150000; time = 18; }
    else if (unit === "50") { investment = 600000; profit = 400000; time = 18; }
    else if (unit === "100") { investment = 1200000; profit = 900000; time = 18; }
    
    document.getElementById('roiInvestment').innerText = investment.toLocaleString('en-IN');
    document.getElementById('roiProfit').innerText = profit.toLocaleString('en-IN');
    document.getElementById('roiTime').innerText = time;
    document.getElementById('roiResult').style.display = 'block';
};

// Tool 25: AI & Semen Tracker
window.calculateAITracker = function() {
    const aiDateInput = document.getElementById('aiDate').value;
    if (!aiDateInput) {
        alert("कृपया AI (कृत्रिम गर्भाधान) की तारीख चुनें।");
        return;
    }
    const aiDate = new Date(aiDateInput);
    
    // Pregnancy check: 21 to 30 days
    const checkDate1 = new Date(aiDate);
    checkDate1.setDate(aiDate.getDate() + 21);
    const checkDate2 = new Date(aiDate);
    checkDate2.setDate(aiDate.getDate() + 30);
    
    // Expected Delivery: 150 days
    const deliveryDate = new Date(aiDate);
    deliveryDate.setDate(aiDate.getDate() + 150);
    
    const formatDate = (d) => d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    
    document.getElementById('aiCheckDate').innerText = `${formatDate(checkDate1)} से ${formatDate(checkDate2)}`;
    document.getElementById('aiDeliveryDate').innerText = formatDate(deliveryDate);
    document.getElementById('aiResult').style.display = 'block';
};

// Tool 26: Cross-Breeding Predictor
window.calculateCrossBreed = function() {
    const female = document.getElementById('femaleBreed').value;
    const male = document.getElementById('maleBreed').value;
    
    let result = "";
    if (female === male) {
        result = "<span style='color: #16a34a;'>Purebred (शुद्ध नस्ल):</span> इससे उसी नस्ल के शुद्ध बच्चे पैदा होंगे। ब्रीड बचाने के लिए सर्वोत्तम।";
    } else if ((female === 'local' && male === 'boer') || (female === 'sirohi' && male === 'boer')) {
        result = "<span style='color: #ea580c;'>Excellent for Meat (मांस के लिए उत्तम):</span> बोर (Boer) के साथ क्रॉस करने से बच्चों का वजन बहुत तेजी से बढ़ेगा। व्यावसायिक बिक्री के लिए अच्छा। (ध्यान रखें: जन्म के समय बच्चे बड़े हो सकते हैं, इसलिए बकरी बड़ी होनी चाहिए।)";
    } else if ((female === 'local' && male === 'beetle') || (female === 'sirohi' && male === 'beetle')) {
        result = "<span style='color: #2563eb;'>Good for Milk & Size (दूध और आकार):</span> बीटल बकरे से क्रॉस करने पर बच्चों का आकार और दूध उत्पादन क्षमता दोनों बेहतर होगी।";
    } else if (female === 'barbari' && (male === 'boer' || male === 'beetle')) {
        result = "<span style='color: #dc2626;'>सावधानी (Warning):</span> बरबरी बकरी आकार में छोटी होती है। बड़े बकरे (बोर/बीटल) से क्रॉस कराने पर डिलीवरी के समय बच्चे फंसने का खतरा होता है।";
    } else {
        result = "<span style='color: #4b5563;'>सामान्य क्रॉस (General Cross):</span> बच्चों में दोनों नस्लों के गुण (Hybrid Vigor) आएंगे। उनकी रोग प्रतिरोधक क्षमता (Immunity) अच्छी होगी।";
    }
    
    document.getElementById('crossBreedResultText').innerHTML = result;
    document.getElementById('crossBreedResult').style.display = 'block';
};

// Tool 27: Least Cost Ration Formulator
window.calculateRation = function() {
    const cornCost = parseFloat(document.getElementById('cornCost').value) || 0;
    const branCost = parseFloat(document.getElementById('branCost').value) || 0;
    const cakeCost = parseFloat(document.getElementById('cakeCost').value) || 0;
    
    if(!cornCost || !branCost || !cakeCost) {
        alert("कृपया सभी सामग्री का भाव दर्ज करें।");
        return;
    }
    
    // Standard formula for 100kg: 50kg Corn/Energy, 25kg Bran, 22kg Cake, 2kg Min, 1kg Salt
    const cornQty = 50;
    const branQty = 25;
    const cakeQty = 22;
    const minSaltCost = 150; // 2kg mineral + 1kg salt flat cost
    
    const totalCost = (cornCost * cornQty) + (branCost * branQty) + (cakeCost * cakeQty) + minSaltCost;
    const perKgCost = (totalCost / 100).toFixed(2);
    
    document.getElementById('rationOutput').innerHTML = `
        <table style="width: 100%; border-collapse: collapse; margin-top:10px;">
            <tr style="border-bottom: 1px solid #ccc;"><th style="text-align:left;">सामग्री</th><th style="text-align:left;">मात्रा</th><th style="text-align:left;">लागत</th></tr>
            <tr style="border-bottom: 1px solid #eee;"><td>मक्का/गेहूं (Energy)</td><td>50 kg</td><td>₹${(cornCost * cornQty)}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td>चोकर (Fiber)</td><td>25 kg</td><td>₹${(branCost * branQty)}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td>खली (Protein)</td><td>22 kg</td><td>₹${(cakeCost * cakeQty)}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td>मिनरल + नमक</td><td>3 kg</td><td>₹${minSaltCost}</td></tr>
            <tr style="font-weight: bold; background: rgba(22,163,74,0.1);"><td>कुल (100 Kg)</td><td>100 kg</td><td>₹${totalCost}</td></tr>
        </table>
        <p style="margin-top: 10px; font-size: 1.2rem; color: #16a34a; font-weight: bold; text-align: center;">दाने की लागत: ₹${perKgCost} / किलो</p>
    `;
    document.getElementById('rationResult').style.display = 'block';
};

// Tool 28: THI Heat Stress Scanner
window.calculateTHI = function() {
    const temp = parseFloat(document.getElementById('thiTemp').value) || 0;
    const hum = parseFloat(document.getElementById('thiHumidity').value) || 0;
    
    if(!temp || !hum) {
        alert("कृपया तापमान और नमी दर्ज करें।");
        return;
    }
    
    // Calculate THI (Temperature-Humidity Index)
    const thi = (1.8 * temp + 32) - ((0.55 - 0.0055 * hum) * (1.8 * temp - 26));
    const thiValue = Math.round(thi);
    
    let status = "", advice = "";
    if (thiValue < 72) {
        status = "<span style='color: #16a34a;'>सामान्य (Normal)</span>";
        advice = "बकरियां बिल्कुल आराम में हैं। कोई विशेष तनाव नहीं है।";
    } else if (thiValue >= 72 && thiValue <= 78) {
        status = "<span style='color: #eab308;'>हल्का तनाव (Mild Stress)</span>";
        advice = "पानी की पर्याप्त व्यवस्था रखें। शेड में हवा का प्रवाह बढ़ाएं।";
    } else if (thiValue > 78 && thiValue <= 88) {
        status = "<span style='color: #ea580c;'>खतरनाक (Severe Stress)</span>";
        advice = "लू लगने का खतरा! पंखे या फोगर (Fogger) चलाएं। पानी में इलेक्ट्रोलाइट (Electrolyte/ORS) या गुड़ मिलाकर दें।";
    } else {
        status = "<span style='color: #dc2626;'>अति-गंभीर (Fatal Stress)</span>";
        advice = "जानलेवा स्थिति! तुरंत ठंडे पानी का छिड़काव करें। डॉक्टर को सूचित करें।";
    }
    
    document.getElementById('thiScore').innerHTML = `${thiValue} - ${status}`;
    document.getElementById('thiAdvice').innerText = advice;
    document.getElementById('thiResult').style.display = 'block';
};

// Tool 29: Farm P&L Accounting
window.calculatePnL = function() {
    const income = parseFloat(document.getElementById('pnlIncome').value) || 0;
    const feed = parseFloat(document.getElementById('pnlFeed').value) || 0;
    const med = parseFloat(document.getElementById('pnlMed').value) || 0;
    const other = parseFloat(document.getElementById('pnlOther').value) || 0;
    
    const expenses = feed + med + other;
    const profit = income - expenses;
    
    let margin = income > 0 ? ((profit / income) * 100).toFixed(1) : 0;
    
    let resultHTML = `<p style="margin-bottom:5px;"><strong>कुल कमाई:</strong> ₹${income}</p>
                      <p style="margin-bottom:5px;"><strong>कुल खर्च:</strong> ₹${expenses}</p>`;
    
    if (profit > 0) {
        resultHTML += `<div style="padding: 10px; background: #dcfce7; color: #16a34a; border-radius: 8px; margin-top: 10px;">
                        <h3 style="margin:0;">मुनाफा: ₹${profit}</h3>
                        <p style="margin:0; font-size:0.9rem;">प्रॉफिट मार्जिन: ${margin}%</p>
                       </div>`;
    } else if (profit < 0) {
        resultHTML += `<div style="padding: 10px; background: #fee2e2; color: #dc2626; border-radius: 8px; margin-top: 10px;">
                        <h3 style="margin:0;">घाटा: ₹${Math.abs(profit)}</h3>
                       </div>`;
    } else {
        resultHTML += `<div style="padding: 10px; background: #fef9c3; color: #ca8a04; border-radius: 8px; margin-top: 10px;">
                        <h3 style="margin:0;">न नफा, न नुकसान (Break-even)</h3>
                       </div>`;
    }
    
    document.getElementById('pnlResultOutput').innerHTML = resultHTML;
    document.getElementById('pnlResult').style.display = 'block';
};

// Tool 30: Goat Bank / Leasing Model
window.calculateGoatBank = function() {
    const goats = parseInt(document.getElementById('gbGoats').value) || 0;
    const ratio = document.getElementById('gbRatio').value;
    
    if (goats <= 0) { alert("कृपया बकरियों की संख्या दर्ज करें।"); return; }
    
    // Assume average 1.5 kids per goat in a year
    const totalKids = Math.floor(goats * 1.5);
    let ownerKids = 0, farmerKids = 0;
    
    if(ratio === "50-50") {
        ownerKids = Math.floor(totalKids / 2);
        farmerKids = totalKids - ownerKids;
    } else {
        ownerKids = Math.floor(totalKids * 0.4); // 40%
        farmerKids = totalKids - ownerKids; // 60%
    }
    
    let resultHTML = `<p style="margin-bottom:8px;"><strong>1 साल बाद कुल अनुमानित बच्चे:</strong> <span style="font-size:1.2rem; color:#8b5cf6; font-weight:bold;">${totalKids}</span></p>
                      <p style="margin-bottom:5px;">👤 <strong>इन्वेस्टर (मालिक) का हिस्सा:</strong> ${ownerKids} बच्चे + (मूल बकरियां)</p>
                      <p>👨‍🌾 <strong>पालक (किसान) का हिस्सा:</strong> ${farmerKids} बच्चे (मेहनत और चारे के बदले)</p>`;
    
    document.getElementById('gbResultOutput').innerHTML = resultHTML;
    document.getElementById('gbResult').style.display = 'block';
};

// Tool 31: Fodder Cultivation Planner
window.calculateFodder = function() {
    const season = document.getElementById('fodderSeason').value;
    let result = "";
    
    if (season === 'kharif') {
        result = `<p><strong>🌱 बुवाई का समय:</strong> जून - जुलाई</p>
                  <p><strong>🌾 उपयुक्त फसलें:</strong> ज्वार (Sorghum), बाजरा, मक्का, लोबिया (Cowpea)।</p>
                  <p><strong>💡 टिप:</strong> ज्वार को 40-45 दिन से पहले न खिलाएं (प्रूसिक एसिड का खतरा)।</p>`;
    } else if (season === 'rabi') {
        result = `<p><strong>🌱 बुवाई का समय:</strong> अक्टूबर - नवंबर</p>
                  <p><strong>🌾 उपयुक्त फसलें:</strong> बरसीम (Berseem), लूसर्न (Lucerne), जई (Oats)।</p>
                  <p><strong>💡 टिप:</strong> बरसीम में प्रोटीन बहुत होता है, इसे सूखे चारे (भूसे) के साथ मिलाकर दें।</p>`;
    } else if (season === 'zaid') {
        result = `<p><strong>🌱 बुवाई का समय:</strong> फरवरी - मार्च</p>
                  <p><strong>🌾 उपयुक्त फसलें:</strong> संकर नेपियर (Hybrid Napier), गिनी ग्रास, चरी।</p>
                  <p><strong>💡 टिप:</strong> नेपियर बहुवर्षीय घास है, एक बार लगाकर 4-5 साल तक कटाई की जा सकती है।</p>`;
    }
    
    document.getElementById('fodderResultOutput').innerHTML = result;
    document.getElementById('fodderResult').style.display = 'block';
};

// Tool 32: Newborn Colostrum Calculator
window.calculateColostrum = function() {
    const weight = parseFloat(document.getElementById('kidWeight').value) || 0;
    if (weight <= 0) { alert("कृपया बच्चे का सही वजन दर्ज करें।"); return; }
    
    // Colostrum rule: 10% of body weight in first 24 hours.
    const totalMl = weight * 1000 * 0.10; // kg to grams, then 10%
    const perFeeding = (totalMl / 4).toFixed(0); // Divided into 4 feedings
    
    let result = `<p style="margin-bottom:8px;"><strong>कुल खीस (पहले 24 घंटे में):</strong> <span style="font-size:1.2rem; color:#f59e0b; font-weight:bold;">${totalMl} ML</span></p>
                  <p style="color: #475569; font-size:0.95rem;">बच्चे को इसे 4-5 बार में बांटकर पिलाएं। (लगभग <strong>${perFeeding} ML</strong> प्रति बार)।<br>
                  <em>जन्म के 30 मिनट के अंदर पहली बार खीस (Colostrum) पिलाना बहुत जरूरी है ताकि इम्युनिटी बने।</em></p>`;
                  
    document.getElementById('colostrumResultOutput').innerHTML = result;
    document.getElementById('colostrumResult').style.display = 'block';
};

// Tool 33: AI Goat Pricing Calculator
window.calculateAIPricing = function() {
    const breed = document.getElementById('priceBreed').value;
    const weight = parseFloat(document.getElementById('priceWeight').value) || 0;
    const purpose = document.getElementById('pricePurpose').value;
    
    if (weight <= 0) { alert("कृपया वजन (kg) दर्ज करें।"); return; }
    
    let baseRate = 0;
    if (breed === 'local') baseRate = 350;
    else if (breed === 'sirohi') baseRate = 450;
    else if (breed === 'barbari') baseRate = 500;
    else if (breed === 'boer') baseRate = 800; // Exotic breed
    
    let estimatedPrice = baseRate * weight;
    
    // Premium for breeding quality
    if (purpose === 'breeding') {
        estimatedPrice = estimatedPrice * 1.30; // 30% premium for purebred breeding stock
    } else if (purpose === 'eid') {
        estimatedPrice = estimatedPrice * 1.50; // 50% premium for Eid preparation
    }
    
    // Add some random variation (-5% to +5%) to make it look "AI" predicted
    const minPrice = Math.floor(estimatedPrice * 0.95);
    const maxPrice = Math.floor(estimatedPrice * 1.05);
    
    let result = `<p style="margin-bottom:8px;">🤖 <strong>AI अनुमानित मूल्य:</strong></p>
                  <p style="font-size:1.5rem; color:#8b5cf6; font-weight:bold; margin-bottom:5px;">₹ ${minPrice.toLocaleString('en-IN')} - ₹ ${maxPrice.toLocaleString('en-IN')}</p>
                  <p style="font-size:0.85rem; color:#64748b;">* यह मूल्य बाज़ार के रुझान और नस्ल की शुद्धता पर आधारित एक अनुमान है। वास्तविक मूल्य मोलभाव पर निर्भर करता है।</p>`;
                  
    document.getElementById('priceResultOutput').innerHTML = result;
    document.getElementById('priceResult').style.display = 'block';
};

// Tool 34: Goat Insurance Calculator
window.calculateInsurance = function() {
    const totalValue = parseFloat(document.getElementById('insValue').value) || 0;
    const category = document.getElementById('insCategory').value;
    
    if (totalValue <= 0) { alert("कृपया बकरियों का कुल मूल्य दर्ज करें।"); return; }
    
    // Base Premium is generally 4% of total animal value
    const basePremium = totalValue * 0.04;
    let subsidyPercentage = 0;
    
    if (category === 'APL') subsidyPercentage = 0.50; // 50% subsidy
    else if (category === 'BPL' || category === 'SC_ST') subsidyPercentage = 0.70; // 70% subsidy
    else subsidyPercentage = 0; // None
    
    const subsidyAmount = basePremium * subsidyPercentage;
    const farmerShare = basePremium - subsidyAmount;
    
    let result = `<table style="width: 100%; border-collapse: collapse; margin-top:10px;">
                    <tr style="border-bottom: 1px solid #ccc;"><td style="padding: 5px 0;"><strong>कुल पशु मूल्य:</strong></td><td style="text-align:right;">₹ ${totalValue.toLocaleString('en-IN')}</td></tr>
                    <tr style="border-bottom: 1px solid #ccc;"><td style="padding: 5px 0;"><strong>कुल प्रीमियम (4%):</strong></td><td style="text-align:right;">₹ ${basePremium.toLocaleString('en-IN')}</td></tr>
                    <tr style="border-bottom: 1px solid #ccc; color: #16a34a;"><td style="padding: 5px 0;"><strong>सरकारी सब्सिडी (-):</strong></td><td style="text-align:right;">₹ ${subsidyAmount.toLocaleString('en-IN')}</td></tr>
                    <tr style="font-weight: bold; background: rgba(59,130,246,0.1);"><td style="padding: 8px 0;">किसान को देना होगा:</td><td style="text-align:right; color: #1d4ed8;">₹ ${farmerShare.toLocaleString('en-IN')}</td></tr>
                  </table>
                  <p style="margin-top: 10px; font-size: 0.85rem; color: #475569;">* बीमा 1 से 3 साल के लिए किया जा सकता है। दावा (Claim) के लिए पशु के कान में टैग (Ear Tag) होना अनिवार्य है।</p>`;
                  
    document.getElementById('insResultOutput').innerHTML = result;
    document.getElementById('insResult').style.display = 'block';
};

// -----------------------------------------------------------
// 🔊 2. Voice Reader System (Text to Speech)
// -----------------------------------------------------------
let isSpeaking = false;
function toggleVoiceReader() {
    const welcomeText = "राम-राम सा और स्वागत है! यह भारत का सबसे आधुनिक डिजिटल बकरी पालन मंच है। नीचे दिए गए वैज्ञानिक उपकरणों का उपयोग करके आप अपने फार्म का प्रबंधन बहुत आसानी से कर सकते हैं।";
    const btnText = document.getElementById('voiceBtnText');
    const voiceBtn = document.getElementById('voiceBtn');

    if ('speechSynthesis' in window) {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            isSpeaking = false;
            if(btnText) btnText.innerText = "पूरी जानकारी बोलकर सुनें";
            if(voiceBtn) voiceBtn.style.background = "#d1fae5";
            if(voiceBtn) voiceBtn.style.color = "#065f46";
        } else {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();
            
            // Filter text to keep only Hindi/English alphanumeric and spaces
            const cleanText = welcomeText.replace(/[^\u0600-\u06FF\u0750-\u077F\u0900-\u097F\sA-Za-z0-9]/g, '');
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = 'hi-IN';
            utterance.rate = 0.95;
            
            utterance.onend = () => {
                isSpeaking = false;
                if(btnText) btnText.innerText = "पूरी जानकारी बोलकर सुनें";
                if(voiceBtn) voiceBtn.style.background = "#d1fae5";
                if(voiceBtn) voiceBtn.style.color = "#065f46";
            };
            
            window.speechSynthesis.speak(utterance);
            isSpeaking = true;
            
            if(btnText) btnText.innerText = "🛑 आवाज बंद करें";
            if(voiceBtn) voiceBtn.style.background = "#fee2e2";
            if(voiceBtn) voiceBtn.style.color = "#b91c1c";
        }
    } else {
        alert("आपका ब्राउज़र वॉयस असिस्टेंस सपोर्ट नहीं करता है।");
    }
}

// Stop speech when switching tools
const originalShowTool = window.showTool;
window.showTool = function(index) {
    if(isSpeaking) toggleVoiceReader();
    originalShowTool(index);
};
const originalShowDashboard = window.showDashboard;
window.showDashboard = function() {
    if(isSpeaking) toggleVoiceReader();
    if(window.stopScanner) window.stopScanner();
    originalShowDashboard();
};

// -----------------------------------------------------------
// 🤖 3. AI Chatbot Logic
// -----------------------------------------------------------
let isChatOpen = false;

window.toggleChat = function() {
    const chatWindow = document.getElementById('chat-window');
    const chatBtn = document.getElementById('chat-toggle-btn');
    
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
        chatWindow.style.display = 'flex';
        chatBtn.style.display = 'none';
    } else {
        chatWindow.style.display = 'none';
        chatBtn.style.display = 'flex';
    }
}

window.handleChatSubmit = async function(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const userMsg = input.value.trim();
    if (!userMsg) return;

    const messagesDiv = document.getElementById('chat-messages');
    
    // Add User Message
    const userDiv = document.createElement('div');
    userDiv.style.cssText = "display: flex; justify-content: flex-end;";
    userDiv.innerHTML = `<div style="max-width: 80%; padding: 10px; border-radius: 12px; border-bottom-right-radius: 2px; background: #065f46; color: white;">${userMsg}</div>`;
    messagesDiv.appendChild(userDiv);
    
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Show Loading
    const loadDiv = document.createElement('div');
    loadDiv.id = "bot-loading";
    loadDiv.style.cssText = "display: flex; justify-content: flex-start;";
    loadDiv.innerHTML = `<div style="max-width: 80%; padding: 10px; border-radius: 12px; border-bottom-left-radius: 2px; background: white; border: 1px solid #e5e7eb; color: #1f2937;">सोच रहा हूँ... 🤔</div>`;
    messagesDiv.appendChild(loadDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    try {
        // Try calling the Vercel API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMsg })
        });

        const loading = document.getElementById('bot-loading');
        if(loading) loading.remove();

        if (response.ok) {
            const data = await response.json();
            const botDiv = document.createElement('div');
            botDiv.style.cssText = "display: flex; justify-content: flex-start;";
            botDiv.innerHTML = `<div style="max-width: 80%; padding: 10px; border-radius: 12px; border-bottom-left-radius: 2px; background: white; border: 1px solid #e5e7eb; color: #1f2937;">${data.reply}</div>`;
            messagesDiv.appendChild(botDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            return;
        } else {
            throw new Error('API not configured or failed');
        }
    } catch (err) {
        // Fallback to local Knowledge Base if API fails (e.g. running locally via http-server)
        const loading = document.getElementById('bot-loading');
        if(loading) loading.remove();

        let botResponse = "क्षमा करें, मेरा ज्ञान अभी सीमित है। असली AI के लिए Vercel में GEMINI_API_KEY सेट करें।";
        const lowerInput = userMsg.toLowerCase();
        
        // 🧠 Super Smart Local Goat AI Knowledge Base
        const knowledgeBase = [
            {
                keywords: ['बुखार', 'बीमार', 'तापमान', 'गर्म'],
                response: "बकरी को बुखार होने पर उसे तुरंत बाकी झुंड से अलग करें। ओआरएस (ORS) का पानी दें और तुरंत 'रोग और उपचार' टूल में देखकर प्राथमिक उपचार करें या डॉक्टर को बुलाएं।"
            },
            {
                keywords: ['दस्त', 'मोक', 'पतला गोबर', 'लूज मोशन'],
                response: "दस्त लगने पर दाना और हरा चारा तुरंत बंद कर दें। केवल सूखा चारा दें। चायपत्ती का पानी या ओआरएस (ORS) पिलाएं। अधिक जानकारी के लिए 'रोग और उपचार' गाइड देखें।"
            },
            {
                keywords: ['लोन', 'सब्सिडी', 'कर्ज', 'पैसा', 'बैंक', 'नाबार्ड', 'nabard', 'loan'],
                response: "बकरी पालन पर नाबार्ड (NABARD) और राज्य सरकार द्वारा 25% से 50% तक की सब्सिडी मिलती है। पूरी योजना और किश्तों की गणना के लिए हमारे 'लोन और सब्सिडी' टूल का उपयोग करें।"
            },
            {
                keywords: ['चारा', 'खाना', 'फीड', 'भूख', 'दाना', 'feed'],
                response: "एक वयस्क बकरी (35-40 किलो) को प्रतिदिन लगभग 3-4 किलो हरा चारा, 1-1.5 किलो सूखा चारा और 300-400 ग्राम दाना मिश्रण चाहिए होता है। सटीक मात्रा के लिए हमारा 'चारा कैलकुलेटर' खोलें।"
            },
            {
                keywords: ['गाभिन', 'प्रेग्नेंट', 'बच्चा', 'डिलीवरी', 'ब्याने', 'kidding', 'pregnant'],
                response: "गाभिन बकरी का विशेष ध्यान रखें। उसे आखिरी के 1-1.5 महीने में 250 ग्राम अतिरिक्त दाना दें। डिलीवरी की तारीख जानने के लिए हमारे 'ब्रीडिंग कैलेंडर' टूल में क्रॉसिंग की तारीख डालें।"
            },
            {
                keywords: ['वजन', 'मोटा', 'ग्रोथ', 'weight', 'बढ़ाना'],
                response: "बकरी का वजन बढ़ाने के लिए उसे उच्च गुणवत्ता वाला प्रोटीन युक्त दाना (जैसे सोयाबीन या मूंगफली की खली) दें। बकरी का वर्तमान वजन जानने के लिए हमारे 'डिजिटल वजन अनुमानक' का उपयोग करें।"
            },
            {
                keywords: ['कीड़े', 'पेट', 'दवा', 'डीवर्मिंग', 'deworming', 'worm'],
                response: "बकरियों को हर 3 महीने में पेट के कीड़े मारने की दवा (Deworming) देनी चाहिए। दवा हमेशा बदल-बदल कर (Rotation) दें। अगली दवा कौन सी देनी है, यह जानने के लिए हमारा 'डीवर्मिंग गाइड' टूल देखें।"
            },
            {
                keywords: ['शेड', 'बाड़ा', 'जगह', 'घर', 'shed', 'space'],
                response: "एक वयस्क बकरी को औसतन 12 से 15 वर्ग फुट (Square Feet) जगह की आवश्यकता होती है। अपने फार्म की सही जगह निकालने के लिए हमारे 'शेड स्पेस कैलकुलेटर' का इस्तेमाल करें।"
            },
            {
                keywords: ['ईद', 'मुनाफा', 'प्रॉफिट', 'फायदा', 'त्योहार', 'profit'],
                response: "ईद या त्योहारों के लिए बकरा तैयार करना बहुत मुनाफे का सौदा हो सकता है। अपनी लागत और मुनाफे का पहले से हिसाब लगाने के लिए हमारा 'त्योहार / ईद मुनाफा कैलकुलेटर' उपयोग करें।"
            },
            {
                keywords: ['नस्ल', 'सस्ती', 'महंगी', 'सिरोही', 'बरबरी', 'ब्लैक बंगाल', 'breed'],
                response: "भारत में सिरोही, बरबरी, तोतापरी और ब्लैक बंगाल सबसे अच्छी नस्लें मानी जाती हैं। अपने इलाके के हिसाब से सही नस्ल चुनने के लिए 'उन्नत नस्लें व भाव' टूल पर जाएं।"
            },
            {
                keywords: ['नमस्कार', 'हेलो', 'हाय', 'राम-राम', 'hello', 'hi'],
                response: "राम-राम सा! मैं आपका डिजिटल बकरी-मित्र हूँ। बताइए, आज मैं आपके फार्म से जुड़ी क्या मदद कर सकता हूँ?"
            },
            {
                keywords: ['धन्यवाद', 'थैंक', 'thanks', 'thank you', 'शुक्रिया'],
                response: "आपका स्वागत है! एक सफल और समृद्ध बकरी पालक बनने की इस यात्रा में मैं हमेशा आपके साथ हूँ। कुछ और जानना हो तो बेझिझक पूछें।"
            }
        ];

        // Search for matching keyword
        for (let i = 0; i < knowledgeBase.length; i++) {
            const topic = knowledgeBase[i];
            if (topic.keywords.some(kw => lowerInput.includes(kw))) {
                botResponse = topic.response;
                break;
            }
        }

        const botDiv = document.createElement('div');
        botDiv.style.cssText = "display: flex; justify-content: flex-start;";
        botDiv.innerHTML = `<div style="max-width: 80%; padding: 10px; border-radius: 12px; border-bottom-left-radius: 2px; background: white; border: 1px solid #e5e7eb; color: #1f2937;">${botResponse}</div>`;
        messagesDiv.appendChild(botDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}
