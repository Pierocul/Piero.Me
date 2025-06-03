let currentView = 'main';
        let activeScreen = null;

        // Navegación entre pantallas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.addEventListener('click', function() {
                const screenType = this.getAttribute('data-screen');
                activateScreen(screenType);
            });
        });

        function activateScreen(screenType) {
            // Remover estado activo de todas las pantallas
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            
            // Activar pantalla seleccionada
            const screen = document.getElementById(screenType + 'Screen');
            screen.classList.add('active');
            
            // Mantener la imagen del overlay al hacer clic
            bgOverlay.style.backgroundImage = `url(${bgMap[screenType]})`;
            gsap.to(bgOverlay,{opacity:1, duration:0.6, ease:'power2.out'});
            
            activeScreen = screenType;
            
            // Mostrar vista zoom después de un delay
            setTimeout(() => {
                showZoomView(screenType);
            }, 500);
        }

        function showZoomView(screenType) {
            const zoomView = document.getElementById(screenType + 'Zoom');
            if (zoomView) {
                zoomView.classList.add('active');
                currentView = 'zoom';
            }
        }

        function goBack() {
            if (currentView === 'zoom') {
                // Cerrar vista zoom
                document.querySelectorAll('.zoom-view').forEach(view => {
                    view.classList.remove('active');
                });
                
                // Desactivar pantallas
                setTimeout(() => {
                    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
                    activeScreen = null;
                    currentView = 'main';
                }, 300);
            }
        }

        function toggleZoom() {
            // Por ahora solo regresa, pero aquí podrías implementar más niveles de zoom
            goBack();
        }

        // Efectos de sonido simulados (opcional)
        function playBeep() {
            // Aquí podrías agregar efectos de sonido
            console.log('*beep*');
        }

        // Agregar efectos de hover con sonido
        document.querySelectorAll('.screen, .nav-button').forEach(element => {
            element.addEventListener('mouseenter', playBeep);
        });

        // Atajos de teclado
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'Escape':
                    goBack();
                    break;
                case '1':
                    activateScreen('about');
                    break;
                case '2':
                    activateScreen('services');
                    break;
                case '3':
                    activateScreen('contact');
                    break;
            }
        });

        // Efectos de cursor personalizados
        document.addEventListener('mousemove', function(e) {
            // Aquí podrías agregar efectos de partículas o trail del cursor
        });

/* ----------  Cross-fade con GSAP  ---------- */
const mainView   = document.getElementById('mainView');
const bgOverlay  = document.getElementById('bgOverlay');

const bgMap = {
  default : 'assets/default.png',     // ya la tienes
  about   : 'assets/sobre_mi.png',    // añade tus otras imágenes
  services: 'assets/servicios.png',
  contact : 'assets/contacto.png'
};

// MOUSEENTER = mostrar overlay con la imagen y fundirla
document.querySelectorAll('.screen-left, .screen-right').forEach(screen=>{
  const key = screen.dataset.screen;              // about / services
  screen.addEventListener('mouseenter', ()=>{
     bgOverlay.style.backgroundImage = `url(${bgMap[key]})`;
     gsap.to(bgOverlay,{opacity:1, duration:0.6, ease:'power2.out'});
     
     // Actualizar el texto del screen-bottom
     const bottomScreen = document.querySelector('.screen-bottom .screen-indicator');
     bottomScreen.querySelector('.text-default').style.display = 'none';
     bottomScreen.querySelector('.text-about').style.display = key === 'about' ? 'block' : 'none';
     bottomScreen.querySelector('.text-services').style.display = key === 'services' ? 'block' : 'none';
  });
  
  // MOUSELEAVE = volver a default
  screen.addEventListener('mouseleave', ()=>{
     gsap.to(bgOverlay,{opacity:0, duration:0.6, ease:'power2.in'});
     
     // Restaurar el texto default
     const bottomScreen = document.querySelector('.screen-bottom .screen-indicator');
     bottomScreen.querySelector('.text-default').style.display = 'block';
     bottomScreen.querySelector('.text-about').style.display = 'none';
     bottomScreen.querySelector('.text-services').style.display = 'none';
  });
});

// Función para manejar pantalla completa
const fullscreenBtn = document.getElementById('fullscreenBtn');
const container = document.querySelector('.spaceship-container');

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            console.log(`Error al intentar entrar en pantalla completa: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});

// Actualizar el texto del botón según el estado
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenBtn.textContent = '⛶';
    } else {
        fullscreenBtn.textContent = '⛶';
    }
});