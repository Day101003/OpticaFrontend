<template>
  <footer id="footer" class="overflow-hidden">
    <div class="container">
      <div class="row">
        <div class="footer-top-area">
          <div class="row d-flex flex-wrap justify-content-between">
            <div class="col-lg-3 col-sm-6 pb-3">
              <div class="footer-menu">
                <img :src="logoImage" alt="Logo"> <!-- Usando variable para la imagen -->
                <p>Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit.</p>
                <div class="social-links">
                  <ul class="d-flex list-unstyled">
                    <li>
                      <a href="#">
                        <svg class="facebook">
                          <use xlink:href="#facebook" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg class="instagram">
                          <use xlink:href="#instagram" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg class="twitter">
                          <use xlink:href="#twitter" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg class="linkedin">
                          <use xlink:href="#linkedin" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg class="youtube">
                          <use xlink:href="#youtube" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-sm-6 pb-3">
              <div class="footer-menu text-uppercase">
                <h5 class="widget-title pb-2">Quick Links</h5>
                <ul class="menu-list list-unstyled text-uppercase">
                  <li class="menu-item pb-2"><router-link to="/">Home</router-link></li>
                  <li class="menu-item pb-2"><router-link to="/shop">Shop</router-link></li>
                  <li class="menu-item pb-2"><router-link to="/blog">Blogs</router-link></li>
                  <li class="menu-item pb-2"><router-link to="/contact">Contact</router-link></li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 pb-3">
              <div class="footer-menu contact-item">
                <h5 class="widget-title text-uppercase pb-2">Contact Us</h5>
                <p>Do you have any queries or suggestions? <a href="mailto:yourinfo@gmail.com">yourinfo@gmail.com</a></p>
                <p>If you need support? Just give us a call. <a href="tel:+5511122233344">+55 111 222 333 44</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div id="footer-bottom">
      <div class="container">
        <div class="row d-flex flex-wrap justify-content-between">
          <div class="col-md-4 col-sm-6">
            <div class="Shipping d-flex">
              <p>We ship with:</p>
              <div class="card-wrap ps-2">
                <img :src="dhlImage" alt="DHL"> <!-- Usando variable para la imagen -->
                <img :src="shippingCardImage" alt="Shipping Card"> <!-- Usando variable para la imagen -->
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="payment-method d-flex">
              <p>Payment options:</p>
              <div class="card-wrap ps-2">
                <img :src="visaImage" alt="Visa"> <!-- Usando variable para la imagen -->
                <img :src="mastercardImage" alt="MasterCard"> <!-- Usando variable para la imagen -->
                <img :src="paypalImage" alt="PayPal"> <!-- Usando variable para la imagen -->
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="copyright">
              <p>© Copyright 2023 MiniStore. Design by <a href="https://templatesjungle.com/">TemplatesJungle</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import logoImage from '../assets/images/main-logo.png'; // Cambia la ruta aquí
import dhlImage from '../assets/images/dhl.png'; // Cambia la ruta aquí
import shippingCardImage from '../assets/images/shippingcard.png'; // Cambia la ruta aquí
import visaImage from '../assets/images/visa.jpg'; // Cambia la ruta aquí
import mastercardImage from '../assets/images/mastercard.jpg'; // Cambia la ruta aquí
import paypalImage from '../assets/images/paypal.jpg'; // Cambia la ruta aquí

export default {
  name: 'Footer',
  data() {
    return {
      logoImage,
      dhlImage,
      shippingCardImage,
      visaImage,
      mastercardImage,
      paypalImage,
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para Footer */
</style>
