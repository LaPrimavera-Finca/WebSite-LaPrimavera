document.addEventListener('DOMContentLoaded', () => {

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
                        'img/est-pp-sala-comedor.jpeg',
                        'img/est-pp-sala.jpg',
                        'img/est-pp-comedor.jpg',
                        'img/est-pp-baño.png'
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
                        'img/estadia-sp-sala.jpg',
                        'img/estadia-sp-cp.jpg',
                        'img/estadia-sp-ca1.jpg',
                        'img/estadia-sp-ca2.jpg',
                        'img/estadia-sp-baño.jpg'
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
                        'img/tm-img-05.jpg',
                        'img/tm-img-06.jpg',
                        'img/tm-img-07.jpg'
                    ]
                }
            }
        },
        pasadias: {
            title: 'Pasadías',
            desc: 'Comparte en un espacio calido y de recreacion lleno de experiencias.',
            spaces: [
                        'Habitación principal',
                        'Baño privado',
                        'Balcón',
                        'Zona de descanso'
            ],
            images: [
                'img/eventos1.jpg',
                'img/eventos2.jpg',
                'img/eventos3.jpg'
            ]
        },
        eventos: {
            title: 'Eventos',
            desc: 'Bodas, reuniones y celebraciones.',
            images: [
                'img/eventos1.jpg',
                'img/eventos2.jpg',
                'img/eventos3.jpg'
            ]
        }
    };

    function openModal(serviceKey) {
        const service = services[serviceKey];
        if (!service) return;

        modalTitle.textContent = service.title;
        modalDesc.textContent = service.desc;

        modalTabs.innerHTML = '';
        spaceSummary.innerHTML = '';

        if (service.floors) {
            modalTabs.style.display = 'flex';

            const floorKeys = Object.keys(service.floors);

            // Crear tabs
            floorKeys.forEach((floorKey, index) => {
                const tab = document.createElement('button');
                tab.className = 'modal-tab' + (index === 0 ? ' active' : '');
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

            floorDesc.textContent = firstFloorData.desc;
            console.log(floorDesc.textContent)
            renderSpaces(firstFloorData.spaces);
            loadGridGallery(firstFloorData.images);
        }
        else {
            
            modalTabs.style.display = 'none';
            floorDesc.textContent = service.desc;
            console.log(floorDesc.textContent)
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