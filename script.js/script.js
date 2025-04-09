document.addEventListener('DOMContentLoaded', function() {
    // Elemen DOM
    const romanticMessage = document.getElementById('romantic-message');
    const backgroundHearts = document.querySelector('.background-hearts');
    const photoSlider = document.getElementById('photo-slider');
    const prevPhotoBtn = document.getElementById('prev-photo');
    const nextPhotoBtn = document.getElementById('next-photo');
    const photoCount = document.getElementById('photo-count');
    const playMusicBtn = document.getElementById('play-music');
    const pauseMusicBtn = document.getElementById('pause-music');
    const volumeControl = document.getElementById('volume-control');
    const romanticMusic = document.getElementById('romantic-music');
    
    // Daftar foto (ganti dengan foto Anda)
    const photos = [
        './assets/a1.jpg',
        './assets/a2.jpg',
        './assets/a3.jpg',
        './assets/a4.jpg',
        './assets/a5.jpg',
        './assets/a6.jpg',
        './assets/a7.jpg',
        './assets/a8.jpg',
        './assets/a9.jpg',
        './assets/a10.jpg',
        './assets/a11.jpg',
        './assets/a13.jpg',
        './assets/a12.jpg'
    ];
    
    let currentPhotoIndex = 0;
    let autoSlideInterval;
    
    // Inisialisasi galeri foto
    function initPhotoGallery() {
        photos.forEach((photo, index) => {
            const img = document.createElement('img');
            img.src = photo;
            img.alt = `Foto ${index + 1}`;
            img.classList.add('gallery-photo');
            if (index === 0) img.classList.add('active');
            photoSlider.appendChild(img);
        });
        updatePhotoCounter();
    }
    
    // Ganti foto
    function changePhoto(direction) {
        const photos = document.querySelectorAll('.gallery-photo');
        photos[currentPhotoIndex].classList.remove('active');
        
        if (direction === 'next') {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        } else {
            currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        }
        
        photos[currentPhotoIndex].classList.add('active');
        updatePhotoCounter();
    }
    
    // Update counter foto
    function updatePhotoCounter() {
        photoCount.textContent = `${currentPhotoIndex + 1}/${photos.length}`;
    }
    
    // Auto slide foto
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            changePhoto('next');
        }, 4000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Buat animasi hati
    function createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 4 + 3 + 's';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            backgroundHearts.appendChild(heart);
            
            // Hapus hati setelah animasi selesai
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, 300);
    }
    
    // Animasi pesan
    function animateRomanticMessage() {
        const messages = [
            "Kamu Cantik!!!",
            "Kamu Menawan",
            "Kamu Mempesona",
            "Kamu Lucu",
            "Kamu Biancha"
        ];
        let currentIndex = 0;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % messages.length;
            romanticMessage.style.animation = 'none';
            void romanticMessage.offsetWidth; // Trigger reflow
            romanticMessage.style.animation = null;
            romanticMessage.innerHTML = messages[currentIndex] + ' <span class="heart-pulse">❤️</span>';
        }, 3000);
    }
    
    // Event listeners
    prevPhotoBtn.addEventListener('click', () => {
        stopAutoSlide();
        changePhoto('prev');
        startAutoSlide();
    });
    
    nextPhotoBtn.addEventListener('click', () => {
        stopAutoSlide();
        changePhoto('next');
        startAutoSlide();
    });
    
    playMusicBtn.addEventListener('click', () => {
        romanticMusic.play();
    });
    
    pauseMusicBtn.addEventListener('click', () => {
        romanticMusic.pause();
    });
    
    volumeControl.addEventListener('input', () => {
        romanticMusic.volume = volumeControl.value;
    });
    
    // Inisialisasi
    initPhotoGallery();
    createFloatingHearts();
    animateRomanticMessage();
    startAutoSlide();
    
    // Coba mainkan musik otomatis
    document.addEventListener('click', function initMusic() {
        romanticMusic.volume = volumeControl.value;
        romanticMusic.play().catch(e => console.log("Autoplay prevented:", e));
        document.removeEventListener('click', initMusic);
    }, { once: true });
});