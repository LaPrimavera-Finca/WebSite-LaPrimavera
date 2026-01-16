document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.services-card').forEach(card => {
    card.addEventListener('click', () => console.log('CLICK CARD'));
    });
    /* ======================
    Slider infinite with Images
    ====================== */

    const sectionEst = document.getElementById('sectionEst');
    const modalGallery = sectionEst.querySelector('.gallery-track');
    const galleryCache = new Map();

    const homeSlider1 = document.getElementById('homeSlider1');
    const homeSlider2 = document.getElementById('homeSlider2');

    const galleries = {
        slider1: [
            'img/spaces/space1.jpg',
            'img/spaces/space2.jpeg',
            'img/spaces/space3.jpg',
            'img/spaces/space4.jpg',
            'img/spaces/space5.jpg'
        ],
        slider2: [
            'img/spaces/space6.jpg',
            'img/spaces/space7.jpeg',
            'img/spaces/space8.jpg',
            'img/spaces/space9.jpg',
            'img/spaces/space10.jpg'
        ]
    };

    function loadGallerySlider(images, container, speed =0.6, direction = 'left') {
        if (!container) return;

        const track = container.querySelector('.gallery-track');
        if (!track) return;

        const key = images.join('|');
        track.innerHTML = '';

        if (galleryCache.has(key)) {
            galleryCache.get(key).forEach(img => {
                track.appendChild(img.cloneNode(true));
            });
        } else {
            const fragment = document.createDocumentFragment();

            images.concat(images).forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                fragment.appendChild(img);
            });

            track.appendChild(fragment);
            galleryCache.set(key, [...track.children]);
        }

        requestAnimationFrame(() => {
            startInfiniteSlider(track, images.length, speed, direction);
        });
    }

    function startInfiniteSlider(track, originalCount, speed = 0.5, direction = 'left') {
        let animationId;
        let translateX = 0;
        
        cancelAnimationFrame(animationId);
        translateX = direction === 'right' ? -getTrackWidth(track, originalCount) : 0;

        const blockWidth = getTrackWidth(track, originalCount);
        const dirFactor = direction === 'right' ? 1 : -1;
        
        function animate() {
            translateX += speed * dirFactor;
            if (direction === 'left' && Math.abs(translateX) >= blockWidth) {
                translateX = 0;
            }
            if (direction === 'right' && translateX >= 0) {
                translateX = -blockWidth;
            }
            track.style.transform = `translateX(${translateX}px)`;
            animationId = requestAnimationFrame(animate);
        }
        animate();
    }
    
    function getTrackWidth(track, originalCount) {
        return Array
            .from(track.children)
            .slice(0, originalCount)
            .reduce((total, el) => total + el.offsetWidth + 16, 0);
    }

    loadGallerySlider(galleries.slider1, homeSlider1, 0.5, 'left');
    loadGallerySlider(galleries.slider2, homeSlider2, 0.4, 'right');

    
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeModal = document.querySelector('.close-modal');
    const modalTabs = document.getElementById('modalTabs');
    const floorDesc = document.getElementById('floorDesc');
    const spaceSummary = document.getElementById('spaceSummary');


    let sliderInterval = null;

    const services = {
        estadia: {
            title: 'Estadia',
            desc: 'Un refugio campestre donde la calma y el descanso se viven naturalmente, espacios rodeados de tranquilidad, pensados para el descanso y el confort.',
            floors: {
                'Primer Piso': {
                    desc: 'Lugar social para compartir:',
                    spaces: [
                        'Sala–Comedor',
                        'Baño',
                        'Cocina amplia (equipada)',
                        'Habitación (4 camarotes)',
                        'Lavadero grande',
                        'Alcoba trasera'
                    ],
                    images: [
                        'img/estadia-pp/pp-sala-comedor.jpeg',
                        'img/estadia-pp/pp-sala.jpg',
                        'img/estadia-pp/pp-baño.png',
                        'img/estadia-pp/pp-cocina.jpg',
                        'img/estadia-pp/pp-cuarto.jpg',
                        'img/estadia-pp/pp-lavadero.jpg'
                    ]
                },
                'Segundo Piso': {
                    desc: 'Vista panorámica, balcón y mayor privacidad.',
                    spaces: [
                        'Sala',
                        'Baño',
                        'Balcón frontal',
                        'Balcón trasero',
                        'Habitacion principal',
                        '2 Habitaciones auxiliares'
                    ],
                    images: [
                        'img/estadia-sp/sp-sala.jpg',
                        'img/estadia-sp/sp-cp.jpg',
                        'img/estadia-sp/sp-ca1.jpg',
                        'img/estadia-sp/sp-ca2.jpg',
                        'img/estadia-sp/sp-baño.jpg',
                        'img/estadia-sp/sp-sala2.jpg'
                    ]
                },
                'Estadero': {
                    desc: 'Espacio ambiental y recreacion',
                    spaces: [
                        'Piscina',
                        'Baños',
                        'Zona de descanso',
                        'Mini Bar',
                        'Cocina (No equipada)',
                        'Nevera',
                        'Asador',
                        'Fogon de leña',
                        'Mini Lavadero'
                    ],
                    images: [
                        'img/estadia-est/est-2.jpg',
                        'img/estadia-est/est-barra.jpg',
                        'img/estadia-est/est-parrilla.jpg',
                        'img/estadia-est/est-cocina.jpg',
                        'img/estadia-est/est-out.jpg',
                        'img/estadia-est/est-1.jpg',
                    ]
                }
            }
        },
        pasadias: {
            title: 'Pasadías',
            desc: 'Comparte en un espacio calido y de recreacion lleno de experiencias.',
            spaces: [
                'Piscina',
                'Baños mixtos',
                'Bar',
                'Estadero',
                'Juego de Sapo',
            ],
            images: [
                'img/pasadia/pas-1.jpg',
                'img/pasadia/pas-2.jpg',
                'img/pasadia/pas-3.jpg'
            ]
        },
        eventos: {
            title: 'Eventos',
            desc: 'Espacios diseñados para reuniones y celebraciones de cualquier indole.',
            spaces: [
                'Piscina',
                'Baños mixtos',
                'Bar',
                'Estadero',
                'Juego de Sapo',
            ],
            images: [
                'img/eventos/eventos-1.jpg',
                'img/eventos/eventos-2.jpg',
                'img/eventos/eventos-3.jpg'
            ]
        }
    };

    function openModal(serviceKey) {
        const service = services[serviceKey];
        if (!service) return;

         resetModal();

        modalTitle.textContent = service.title;
        modalDesc.textContent = service.desc;

        modalTabs.innerHTML = '';
        spaceSummary.innerHTML = '';

        if (service.floors) {
            modalTabs.style.display = 'flex';
            floorDesc.style.display = 'block';

            const floorKeys = Object.keys(service.floors);

            floorKeys.forEach((floorKey, index) => {
                const tab = document.createElement('button');
                tab.className = 'modal-tab';
                tab.textContent = floorKey;

                tab.addEventListener('click', () => {
                    document.querySelectorAll('.modal-tab')
                        .forEach(t => t.classList.remove('active'));

                    tab.classList.add('active');

                    const data = service.floors[floorKey];
                    floorDesc.textContent = data.desc;
                    renderSpaces(data.spaces);
                    loadGridGallery(data.images);
                });

                modalTabs.appendChild(tab);
            });

            const firstFloorKey = floorKeys[0];
            const firstFloorData = service.floors[firstFloorKey];

            modalTabs.children[0].classList.add('active');
            floorDesc.textContent = firstFloorData.desc;
            renderSpaces(firstFloorData.spaces);
            loadGridGallery(firstFloorData.images);
        }
        else {
            modalTabs.style.display = 'none';
            floorDesc.style.display = 'none';

            floorDesc.textContent = service.desc;
            renderSpaces(service.spaces || []);
            loadGridGallery(service.images);
        }

        modal.classList.add('active');
    }
    
    document.querySelectorAll('.services-card').forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.dataset.service;
            openModal(serviceKey);
        });
    });

    function resetModal() {
        modalTabs.innerHTML = '';
        modalTabs.style.display = 'none';

        floorDesc.textContent = '';
        floorDesc.classList.remove('active');
        floorDesc.style.display = 'block';

        spaceSummary.innerHTML = '';

        const grid = document.getElementById('modalGrid');
        if (grid) grid.innerHTML = '';
    }

    function loadGridGallery(images = []) {
        const grid = document.getElementById('modalGrid');
        if (!grid) return;

        grid.innerHTML = '';

        images.slice(0, 12).forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;

            img.style.animationDelay = `${index * 0.12}s`;

            grid.appendChild(img);
        });
    }


    function closeServiceModal() {
        modal.classList.remove('active');
        clearInterval(sliderInterval);
        resetModal();
    }

    closeModal.addEventListener('click', closeServiceModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) closeServiceModal();
    });    

    function renderSpaces(spaces = []) {
        if (!spaceSummary) return;

        spaceSummary.innerHTML = '';

        spaces.forEach(text => {
            const span = document.createElement('span');
            span.textContent = text;
            spaceSummary.appendChild(span);
        });
    }

});