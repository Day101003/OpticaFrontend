<template>
  <footer id="footer" class="bg-dark text-light pt-5 pb-3">
    <div class="container">
      <div class="row gy-4 justify-content-between">
        <!-- Columna 1: Logo y redes -->
        <div class="col-lg-4 col-md-6">
           <img src="../assets/images/logo1.png" class="logo-icon" alt="logo icon" />
          <p class="mt-3 small" >Tu salud visual es nuestra prioridad. ¡Contáctanos para más información!</p>
          <div class="d-flex gap-3 mt-2" style="color: aliceblue;">
            <a href="#"><svg class="icon"><use xlink:href="#facebook" /></svg></a>
            <a href="#"><svg class="icon"><use xlink:href="#instagram" /></svg></a>
            <a href="#"><svg class="icon"><use xlink:href="#twitter" /></svg></a>
          </div>
        </div>

        <!-- Columna 2: Enlaces -->
        <div class="col-lg-2 col-md-6">
          <h5 class="text-uppercase mb-3" style="color: aliceblue;">Enlaces</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-light text-decoration-none">Inicio</router-link></li>
            <li><router-link to="/shop" class="text-light text-decoration-none">Tienda</router-link></li>
            <li><router-link to="/contact" class="text-light text-decoration-none">Contacto</router-link></li>
          </ul>
        </div>

        <!-- Columna 3: Contacto -->
        <div class="col-lg-4 col-md-6">
          <h5 class="text-uppercase mb-3" style="color: aliceblue;">Contacto</h5>
          <p class="small mb-1">Correo: <a href="mailto:info@optica.com" class="text-info">info@optica.com</a></p>
          <p class="small mb-1">Teléfono: <a href="tel:+50688888888" class="text-info">+506 8888-8888</a></p>
          <p class="small">Dirección: Turrialba, Cartago, Costa Rica</p>
        </div>
      </div>

      <hr class="my-4 text-secondary" />

      <!-- Parte inferior -->
      <div class="row justify-content-between align-items-center">
        <div class="col-md-6 small" style="color: aliceblue;">
          © 2025 OptiView. Todos los derechos reservados.
        </div>
        <div class="col-md-6 d-flex justify-content-md-end mt-2 mt-md-0">
          <img :src="visaImage" alt="Visa" height="30" class="me-2" />
          <img :src="mastercardImage" alt="MasterCard" height="30" class="me-2" />
          <img :src="paypalImage" alt="PayPal" height="30" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import logoImage from '../assets/images/main-logo.png';
import visaImage from '../assets/images/visa.jpg';
import mastercardImage from '../assets/images/mastercard.jpg';
import paypalImage from '../assets/images/paypal.jpg';

export default {
  name: 'Footer',
  data() {
    return {
      logoImage,
      visaImage,
      mastercardImage,
      paypalImage,
    };
  }
};
</script>

<style scoped>
footer {
  color: #f8f9fa; 
  font-size: 0.95rem;
}

.icon {
  width: 24px;
  height: 24px;
  fill: #fff;
  transition: fill 0.3s ease;
}
.icon:hover {
  fill: #0dcaf0; 
}
</style>
