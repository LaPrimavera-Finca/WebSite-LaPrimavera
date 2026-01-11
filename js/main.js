document.addEventListener('DOMContentLoaded', () => {

    /* ======================
       MODAL DE SERVICIOS
    ====================== */

    const homeSlider = document.getElementById('homeSlider');

    loadGallery(
        [
            'img/est-pp-sala-comedor.jpeg',
            'img/est-pp-sala.jpg',
            'img/est-pp-comedor.jpg'
        ],
        homeSlider
    );

    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeModal = document.querySelector('.close-modal');
    const modalTabs = document.getElementById('modalTabs');
    const modalGallery = document.querySelector('.gallery-track');
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

        if (modalGallery) modalGallery.innerHTML = '';
        if (modalTabs) modalTabs.innerHTML = '';

        // 👉 CASO 1: Estadía (con tabs)
        if (service.floors) {
            modalTabs.style.display = 'flex';

            const floors = Object.keys(service.floors);

            floors.forEach((floor, index) => {
                const tab = document.createElement('button');
                tab.className = 'modal-tab' + (index === 0 ? ' active' : '');
                tab.textContent = floor;

                tab.addEventListener('click', () => {
                document.querySelectorAll('.modal-tab')
                    .forEach(t => t.classList.remove('active'));

                tab.classList.add('active');

                renderSpaces(service.floors[floor].spaces);

                floorDesc.classList.remove('active');
                floorDesc.textContent = service.floors[floor].desc;

                setTimeout(() => {
                    floorDesc.classList.add('active');
                }, 50);

                loadGallery(service.floors[floor].images);
            });

                modalTabs.appendChild(tab);

                if (index === 0) {
                    floorDesc.textContent = service.floors[floor].desc;
                    floorDesc.classList.add('active');
                    renderSpaces(service.floors[floor].spaces);
                    loadGallery(service.floors[floor].images);
                }
            });

        } 
        // 👉 CASO 2: Otros servicios (sin tabs)
        else {
            modalTabs.style.display = 'none';
            loadGallery(service.images);
        }

        modal.classList.add('active');
    }

    function loadGallery(images, container) {
        const track = document.querySelector('.gallery-track');
        if (!track) return;

        track.innerHTML = '';
        currentOffset = 0;

        images.forEach(img => {
            const image = document.createElement('img');
            image.src = img;
            track.appendChild(image);
        });

        images.forEach(img => {
            const image = document.createElement('img');
            image.src = img;
            track.appendChild(image);
        });

        requestAnimationFrame(() => {
            startInfiniteSlider(track, images.length, 0.6);
        });
    }

    document.querySelectorAll('.services-card').forEach(card => {
        card.addEventListener('click', () => {
            const service = card.dataset.service;
            openModal(service);
        });
    });

    function closeServiceModal() {
        modal.classList.remove('active');
        clearInterval(sliderInterval);
    }

    closeModal.addEventListener('click', closeServiceModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) closeServiceModal();
    });


    function startInfiniteSlider(track, originalCount, customSpeed = 1.5) {
        let animationId;
        let translateX = 0;
        
        cancelAnimationFrame(animationId);
        translateX = 0;

        const firstBlockWidth = Array
            .from(track.children)
            .slice(0, originalCount)
            .reduce((total, el) => total + el.offsetWidth + 16, 0);

        function animate() {
            translateX -= customSpeed;
            if (Math.abs(translateX) >= firstBlockWidth) {
                translateX = 0;
            }
            track.style.transform = `translateX(${translateX}px)`;
            animationId = requestAnimationFrame(animate);
        }
        animate();
    }

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