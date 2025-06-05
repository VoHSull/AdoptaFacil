let mascotas = [
  {
    id: 1,
    nombre: "Luna",
    edad: "2 años",
    descripcion: "Gatita muy cariñosa y juguetona.",
    imagen: "img/siames.jpg",
    raza: "Siamesa"
  },
  {
    id: 2,
    nombre: "Max",
    edad: "3 años",
    descripcion: "Labrador muy amigable y activo.",
    imagen: "img/labrador.jpg",
    raza: "Labrador"
  },
  {
    id: 3,
    nombre: "Sol",
    edad: "4 años",
    descripcion: "Golden adorable que ama jugar con niños.",
    imagen: "img/golden.jpeg",
    raza: "Golden Retriever"
  },
  {
    id: 4,
    nombre: "Rocky",
    edad: "1 año",
    descripcion: "Un cachorro enérgico y leal.",
    imagen: "img/rocky.jpg",
    raza: "Pastor Alemán"
  },
  {
    id: 5,
    nombre: "Milo",
    edad: "6 meses",
    descripcion: "Curioso y juguetón, ideal para familias.",
    imagen: "img/milo.jpg",
    raza: "Beagle"
  },
  {
    id: 6,
    nombre: "Canela",
    edad: "5 años",
    descripcion: "Tranquila y muy dulce con los niños.",
    imagen: "img/canela.jpg",
    raza: "Cocker Spaniel"
  },
  {
    id: 7,
    nombre: "Chispa",
    edad: "2 años",
    descripcion: "Gata independiente y observadora.",
    imagen: "img/chispa.jpg",
    raza: "Mestiza"
  },
  {
    id: 8,
    nombre: "Simón",
    edad: "1.5 años",
    descripcion: "Travieso y muy cariñoso con otros gatos.",
    imagen: "img/simon.jpg",
    raza: "Angora"
  }
];

let historial = [];

// Mostrar sección activa
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  if (id === 'inicio') renderGaleria('galeriaInicio');
  if (id === 'disponibles') renderGaleria('galeriaDisponibles');
  if (id === 'historial') renderHistorial();
}

// Renderizar galería de mascotas disponibles
function renderGaleria(containerId) {
  const contenedor = document.getElementById(containerId);
  contenedor.innerHTML = '';
  if (mascotas.length === 0) {
    contenedor.innerHTML = '<p>No hay mascotas disponibles para adopción.</p>';
    return;
  }
  mascotas.forEach((mascota, index) => {
    const card = document.createElement('div');
    card.className = 'card card-animal';
    card.innerHTML = `
      <img src="${mascota.imagen}" alt="${mascota.nombre}">
      <h3>${mascota.nombre}</h3>
      <p>${mascota.descripcion}</p>
      <button class="btn" onclick="verDetalle(${index})">Ver Detalle</button>
    `;
    contenedor.appendChild(card);
  });
}

// Mostrar detalle y formulario de adopción
function verDetalle(index) {
  const mascota = mascotas[index];
  const detalle = document.getElementById('detalleContenido');
  detalle.innerHTML = `
    <img src="${mascota.imagen}" alt="${mascota.nombre}">
    <div>
      <h2>${mascota.nombre}</h2>
      <p><strong>Edad:</strong> ${mascota.edad}</p>
      <p><strong>Raza:</strong> ${mascota.raza}</p>
      <p>${mascota.descripcion}</p>
      <form id="formAdopcion" onsubmit="return adoptarMascota(event, ${index})">
        <input type="text" name="nombre" placeholder="Tu nombre" required />
        <input type="email" name="email" placeholder="Tu email" required />
        <input type="text" name="telefono" placeholder="Teléfono" required />
        <button type="submit" class="btn">Confirmar Adopción</button>
      </form>
    </div>
  `;
  showSection('detalle');
}

// Función para adoptar mascota
function adoptarMascota(event, index) {
  event.preventDefault();
  const form = event.target;
  const nombreAdoptante = form.nombre.value.trim();
  const emailAdoptante = form.email.value.trim();
  const telefonoAdoptante = form.telefono.value.trim();

  if (!nombreAdoptante || !emailAdoptante || !telefonoAdoptante) {
    alert('Por favor, complete todos los campos para la adopción.');
    return false;
  }

  const mascota = mascotas[index];

  // Agregar al historial
  historial.push({
    mascota: mascota.nombre,
    nombreAdoptante,
    emailAdoptante,
    telefonoAdoptante,
    fecha: new Date().toLocaleDateString()
  });

  // Remover mascota adoptada
  mascotas.splice(index, 1);

  alert(`¡Has adoptado a ${mascota.nombre}! Muchas gracias por darle un hogar.`);

  showSection('disponibles');
  return false;
}

// Mostrar historial de adopciones
function renderHistorial() {
  const lista = document.getElementById('listaHistorial');
  if (historial.length === 0) {
    lista.innerHTML = '<p>No hay adopciones registradas.</p>';
    return;
  }
  let html = '';
  historial.forEach((item, i) => {
    html += `<li>
      <strong>${item.fecha}</strong>: ${item.nombreAdoptante} (${item.emailAdoptante}, Tel: ${item.telefonoAdoptante}) adoptó a <em>${item.mascota}</em>.
    </li>`;
  });
  lista.innerHTML = html;
}

// Manejo vista previa imagen en publicar mascota
const imagenInput = document.getElementById('imagenInput');
const imagenPreview = document.getElementById('imagenPreview');

imagenInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imagenPreview.src = e.target.result;
      imagenPreview.style.display = 'block';
    }
    reader.readAsDataURL(file);
  } else {
    imagenPreview.style.display = 'none';
  }
});

// Publicar nueva mascota
const formPublicar = document.getElementById('formPublicar');
formPublicar.addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('inputNombre').value.trim();
  const edad = document.getElementById('inputEdad').value.trim();
  const raza = document.getElementById('inputRaza').value.trim();
  const descripcion = document.getElementById('inputDescripcion').value.trim();

  if (!nombre || !edad || !raza || !descripcion) {
    alert('Por favor, complete todos los campos para publicar una mascota.');
    return;
  }

  // Imagen (si no se sube, imagen por defecto)
  let imagen = 'img/default-mascota.jpg';
  if(imagenInput.files && imagenInput.files[0]){
    const file = imagenInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e){
      imagen = e.target.result;

      agregarMascota();
    }
    reader.readAsDataURL(file);
  } else {
    agregarMascota();
  }

  function agregarMascota() {
    mascotas.push({
      id: mascotas.length > 0 ? mascotas[mascotas.length -1].id +1 : 1,
      nombre,
      edad,
      raza,
      descripcion,
      imagen
    });

    alert('Mascota publicada exitosamente');
    formPublicar.reset();
    imagenPreview.style.display = 'none';

    showSection('disponibles');
  }
});

// Inicializamos la vista principal
showSection('inicio');

const inputAvatar = document.getElementById('inputAvatar');
const avatarPerfil = document.getElementById('avatarPerfil');

inputAvatar.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      avatarPerfil.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});