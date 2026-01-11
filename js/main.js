document.addEventListener('DOMContentLoaded', () => {

    /* ======================
       MODAL DE SERVICIOS
    ====================== */

    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeModal = document.querySelector('.close-modal');
    const modalTabs = document.getElementById('modalTabs');
    const modalGallery = document.querySelector('.gallery-track');
    const floorDesc = document.getElementById('floorDesc');


    let sliderInterval = null;

    const services = {
        estadia: {
            title: 'Estadia',
            desc: 'Un refugio campestre donde la calma y el descanso se viven naturalmente, espacios rodeados de tranquilidad, pensados para el descanso y el confort.',
            floors: {
                'Primer Piso': {
                    desc: 'Cuenta con:',
                    images: [
                        'img/tm-img-01.jpg',
                        'img/tm-img-02.jpg',
                        'img/tm-img-03.jpg',
                        'img/tm-img-04.jpg'
                    ]
                },
                'Segundo Piso': {
                    desc: 'Vista panorámica, balcón privado y mayor privacidad.',
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
            desc: 'Disfruta un día completo de relax.',
            floors: {
                'Primer Piso': [
                    'img/tm-img-01.jpg',
                    'img/tm-img-02.jpg'
                ],
                'Segundo Piso': [
                    'img/tm-img-03.jpg',
                    'img/tm-img-04.jpg'
                ]
            }
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

    function makeInfiniteSlider(track) {
        const items = Array.from(track.children);

        // Clonamos cada imagen
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
    }

    function loadGallery(images) {
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
            startInfiniteSlider(track, images.length);
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

    let animationId;
    let translateX = 0;
    let speed = 1.5; // 👈 controla la lentitud (0.2 = más lento)

    function startInfiniteSlider(track, originalCount) {
        cancelAnimationFrame(animationId);
        translateX = 0;

        const firstBlockWidth = Array
            .from(track.children)
            .slice(0, originalCount)
            .reduce((total, el) => total + el.offsetWidth + 16, 0);

        function animate() {
            translateX -= speed;

            if (Math.abs(translateX) >= firstBlockWidth) {
                translateX = 0; // 🔁 reinicio INVISIBLE
            }

            track.style.transform = `translateX(${translateX}px)`;
            animationId = requestAnimationFrame(animate);
        }

        animate();
    }

});