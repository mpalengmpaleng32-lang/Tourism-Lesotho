
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');

function applyTheme(theme) {
    root.setAttribute('data-bs-theme', theme);

    if (themeBtn) {
        themeBtn.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
}

let savedTheme = 'light';

try {
    savedTheme = localStorage.getItem('theme') || 'light';
} catch (e) {
   
}

applyTheme(savedTheme);

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const next = root.getAttribute('data-bs-theme') === 'dark'
            ? 'light'
            : 'dark';

        applyTheme(next);

        try {
            localStorage.setItem('theme', next);
        } catch (e) {
            // Theme still works even if it cannot be saved.
        }
    });
}



const currentPage = location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.navbar .nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
    }
});



const destinations = [
    {
        id: 1,
        name: 'Maletsunyane Falls',
        category: 'nature',
        label: 'Nature',
        region: 'Semonkong, Maseru District',
        bestTime: 'Summer (Nov - Mar)',
        price: 'Free viewing',
        img: 'maletsunyane.webp',
        alt: 'Maletsunyane Falls dropping into a deep green gorge',
        short: 'A 192 m single-drop waterfall near Semonkong.',
        desc: 'Maletsunyane Falls is a 192 m single-drop waterfall on the Maletsunyane River, near Semonkong. The water plunges off a basalt ledge into a deep gorge. It is also home to a 204 m commercial abseil run operated by Semonkong Lodge, which holds a Guinness World Record.'
    },

    {
        id: 2,
        name: 'Katse Dam',
        category: 'nature',
        label: 'Nature',
        region: 'Thaba-Tseka District',
        bestTime: 'All year',
        price: 'Free viewing',
        img: 'katse-dam.jpg',
        alt: 'Katse Dam wall and reservoir among green mountains',
        short: 'One of the highest dams in Africa, deep in the Maloti.',
        desc: 'Katse Dam is a 185 m high arch dam in the Maloti Mountains and a key part of the Lesotho Highlands Water Project. The reservoir is surrounded by rolling highland scenery, making it a great stop for photography, scenic drives and dam tours.'
    },

    {
        id: 3,
        name: 'Thaba Bosiu',
        category: 'culture',
        label: 'Culture',
        region: 'Maseru District',
        bestTime: 'All year',
        price: 'M60 per person',
        img: 'thaba-bosiu.jpg',
        alt: 'Thaba Bosiu flat-topped sandstone mountain',
        short: 'The royal stronghold and birthplace of the Basotho nation.',
        desc: 'Thaba-Bosiu is a flat-topped sandstone mountain about 24 km east of Maseru. King Moshoeshoe I made it his stronghold in 1824, and it became the heart of the Basotho nation. Visitors can take guided walks to the top to see old passes, springs and the royal graves, with views over the valley below. It was declared a national monument in 1967.'
    },

    {
        id: 4,
        name: 'Kome Caves',
        category: 'culture',
        label: 'Culture',
        region: 'Berea District (near Teyateyaneng)',
        bestTime: 'All year',
        price: 'M80 per person',
        img: 'kome-caves.webp',
        alt: 'Mud-walled Kome cave dwelling with orange doorway',
        short: 'Homes built from mud into the sandstone cliffs.',
        desc: 'Tucked beneath sandstone cliffs, the Kome Caves are homes built from mud into the rock itself. Basia families first sheltered here in the early 1800s, and their descendants still live here today. Go with respect: greet your hosts, ask before taking photos and support the community by buying local crafts. Best for: culture, history and photography.'
    },

    {
        id: 5,
        name: 'Sani Pass',
        category: 'adventure',
        label: 'Adventure',
        region: 'Mokhotlong District',
        bestTime: 'Spring and autumn',
        price: 'M450 guided 4x4',
        img: 'sani-pass.jpg',
        alt: 'Winding gravel road of Sani Pass in the mountains',
        short: 'A steep gravel road climbing to 2,874 m above sea level.',
        desc: 'Sani Pass is a steep, bumpy gravel road climbing from KwaZulu-Natal in South Africa up into the Lesotho highlands. At the top, 2,874 m above sea level, is a pub often called the highest in Africa. Along the way you will see the Twelve Apostles mountains, eland and baboons. Go with a guide, bring your passport and pack warm, since snow can last into October.'
    },

    {
        id: 6,
        name: 'Sehlabathebe National Park',
        category: 'nature',
        label: 'Nature',
        region: "Qacha's Nek District",
        bestTime: 'Spring and autumn',
        price: 'M100 per person',
        img: 'sehlabathebe.jpg',
        alt: 'Rock pool reflecting red cliffs in Sehlabathebe National Park',
        short: 'A remote highland wilderness and World Heritage Site.',
        desc: 'Sehlabathebe National Park is a remote highland wilderness in southeastern Lesotho, about 69.5 km² at roughly 2,400 m. It has open grassland, cliffs, rock pools and waterfalls, and it is part of the Maloti-Drakensberg World Heritage Site. It is a haven for birdwatchers and walkers, with rare vultures and very few people.'
    },

    {
        id: 7,
        name: 'Afriski Mountain Resort',
        category: 'adventure',
        label: 'Adventure',
        region: 'Near Mahlasela Pass, Butha-Buthe District',
        bestTime: 'June - August (snow)',
        price: 'From M650 per day',
        img: 'afriski-snow-resort.jpg',
        alt: 'Snow-covered Afriski Mountain Resort chalets',
        short: 'Skiing and snowboarding in southern Africa.',
        desc: "Afriski Mountain Resort is a ski resort in northern Lesotho, just below Mahlasela Pass and about 4.5 hours from Johannesburg. Skiing and snowboarding run from June to August, with six trails, a beginners' slope and terrain parks. In summer it offers mountain biking, hiking and paintball."
    }
];



const destGrid = document.getElementById('destGrid');
const noResults = document.getElementById('noResults');
const resultCount = document.getElementById('resultCount');
const searchBox = document.getElementById('searchBox');

let activeCategory = 'all';

function renderCards(list) {

    if (!destGrid) return;

    destGrid.innerHTML = list.map(d => `
        <div class="col-12 col-md-6 col-lg-4">
            <article class="card h-100 shadow-sm dest-card">

                <img
                    src="${d.img}"
                    class="card-img-top"
                    alt="${d.alt}"
                    loading="lazy">

                <div class="card-body d-flex flex-column">

                    <span class="badge badge-cat mb-2 align-self-start">
                        ${d.label}
                    </span>

                    <h3 class="h5 card-title">${d.name}</h3>

                    <p class="card-text">${d.short}</p>

                    <button
                        type="button"
                        class="btn btn-lesotho mt-auto"
                        data-id="${d.id}">
                        More details
                    </button>

                </div>
            </article>
        </div>
    `).join('');

    if (noResults) {
        noResults.classList.toggle('d-none', list.length > 0);
    }

    if (resultCount) {
        resultCount.textContent =
            list.length + ' destination' +
            (list.length === 1 ? '' : 's') +
            ' found';
    }
}


function applyFilters() {

    const q = searchBox
        ? searchBox.value.trim().toLowerCase()
        : '';

    const filtered = destinations.filter(d => {

        const matchCat =
            activeCategory === 'all' ||
            d.category === activeCategory;

        const text = (
            d.name + ' ' +
            d.short + ' ' +
            d.region + ' ' +
            d.label
        ).toLowerCase();

        return matchCat && text.includes(q);
    });

    renderCards(filtered);
}


if (destGrid) {

    applyFilters();

    if (searchBox) {
        searchBox.addEventListener('input', applyFilters);
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {

        btn.addEventListener('click', () => {

            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
            });

            btn.classList.add('active');

            activeCategory = btn.dataset.cat || 'all';

            applyFilters();
        });
    });


    // Destination Details Modal

    const detailModalEl = document.getElementById('detailModal');

    const detailModal = detailModalEl && typeof bootstrap !== 'undefined'
        ? new bootstrap.Modal(detailModalEl)
        : null;

    destGrid.addEventListener('click', e => {

        const btn = e.target.closest('button[data-id]');

        if (!btn || !detailModal) return;

        const d = destinations.find(x => x.id === Number(btn.dataset.id));

        if (!d) return;

        document.getElementById('detailTitle').textContent = d.name;

        const img = document.getElementById('detailImg');

        if (img) {
            img.src = d.img;
            img.alt = d.alt;
        }

        document.getElementById('detailDesc').textContent = d.desc;
        document.getElementById('detailRegion').textContent = d.region;
        document.getElementById('detailBest').textContent = d.bestTime;
        document.getElementById('detailPrice').textContent = d.price;

        detailModal.show();
    });
}



const factsBody = document.getElementById('factsBody');

if (factsBody) {

    factsBody.innerHTML = destinations.map(d => `
        <tr>
            <th scope="row">${d.name}</th>
            <td>${d.region}</td>
            <td>${d.label}</td>
            <td>${d.bestTime}</td>
        </tr>
    `).join('');
}



const galleryImgs = Array.from(
    document.querySelectorAll('.gallery-img')
);

if (galleryImgs.length) {

    const lightboxEl = document.getElementById('lightbox');

    const lbImg = document.getElementById('lightboxImg');
    const lbCaption = document.getElementById('lightboxCaption');

    const nextBtn = document.getElementById('nextImg');
    const prevBtn = document.getElementById('prevImg');

    const lightbox = lightboxEl && typeof bootstrap !== 'undefined'
        ? new bootstrap.Modal(lightboxEl)
        : null;

    let current = 0;


    function showImage(index) {

        current = (index + galleryImgs.length) % galleryImgs.length;

        if (lbImg) {
            lbImg.src = galleryImgs[current].src;
            lbImg.alt = galleryImgs[current].alt;
        }

        if (lbCaption) {
            lbCaption.textContent =
                galleryImgs[current].alt +
                ' (' + (current + 1) + ' / ' + galleryImgs.length + ')';
        }
    }


    galleryImgs.forEach((img, i) => {

        img.addEventListener('click', () => {

            if (!lightbox) return;

            showImage(i);
            lightbox.show();
        });
    });


    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showImage(current + 1);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showImage(current - 1);
        });
    }


    // Keyboard Navigation

    if (lightboxEl) {

        lightboxEl.addEventListener('keydown', e => {

            if (e.key === 'ArrowRight') {
                showImage(current + 1);
            }

            if (e.key === 'ArrowLeft') {
                showImage(current - 1);
            }
        });
    }
}



const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

const todayStr = `${year}-${month}-${day}`;


// Prevent users from selecting past dates.

document.querySelectorAll('input[type="date"]').forEach(dateInput => {
    dateInput.min = todayStr;
});



document.querySelectorAll('form.needs-validation').forEach(form => {

    const dateInput = form.querySelector('input[type="date"]');


    function extraChecks() {

        if (dateInput) {

            dateInput.setCustomValidity(
                dateInput.value && dateInput.value < todayStr
                    ? 'Date is in the past'
                    : ''
            );
        }
    }


    form.addEventListener('input', extraChecks);


    form.addEventListener('submit', e => {

        e.preventDefault();

        extraChecks();

        if (!form.checkValidity()) {

            form.classList.add('was-validated');

            const firstBad = form.querySelector(':invalid');

            if (firstBad) {
                firstBad.focus();
            }

            return;
        }


        const nameField = form.querySelector('[name="fullName"]');
        const alertBox = form.querySelector('.form-success');

        if (alertBox) {

            const name = nameField
                ? nameField.value.trim()
                : '';

            alertBox.textContent =
                'Thank you, ' + name + '! ' +
                alertBox.dataset.message;

            alertBox.classList.remove('d-none');

            alertBox.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            setTimeout(() => {
                alertBox.classList.add('d-none');
            }, 8000);
        }


        form.reset();

        form.classList.remove('was-validated');

        setTimeout(calcTotal, 0);
    });
});


const bkDest = document.getElementById('bkDest');
const bkPeople = document.getElementById('bkPeople');
const bkGuide = document.getElementById('bkGuide');
const bkTotal = document.getElementById('bkTotal');


function calcTotal() {

    if (!bkDest || !bkPeople || !bkGuide || !bkTotal) {
        return;
    }

    const price = Number(
        bkDest.selectedOptions[0]?.dataset.price || 0
    );

    const people = Math.max(
        0,
        Number(bkPeople.value) || 0
    );

    const guide = bkGuide.checked && price > 0
        ? 300
        : 0;

    const total = (price * people) + guide;

    bkTotal.textContent = 'M' + total.toLocaleString();
}




[bkDest, bkPeople, bkGuide].forEach(el => {

    if (el) {
        el.addEventListener('input', calcTotal);
        el.addEventListener('change', calcTotal);
    }
});



calcTotal();
    
