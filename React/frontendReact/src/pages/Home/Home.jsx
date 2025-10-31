import { Navbar } from "@/componentes/Navbar/Navbar";
import { Footer } from "@/componentes/Footer/Footer";
import "@/styles/Home.css";

export function Home() {
  return (
    <>
      <Navbar />

      <section className="bienvenido text-center py-5">
        <h1>🍰 Marcelo Pastelería</h1>
        <p>Delicias artesanales hechas con amor y dedicación</p>
        <img src="/img/marcelo.png" alt="Logo Marcelo Pastelería" width="200" />
      </section>

      <section className="sobre-nosotros d-flex flex-wrap justify-content-center align-items-center px-3">
        <div className="texto col-md-6">
          <h2>Sobre Nosotros</h2>
          <p>
            “Marcelo”, pastelero proveniente de Maipú con años de experiencia en repostería,
            se dedica a realizar tortas y delicias a pedido.
          </p>
          <p>
            Especialistas en cumpleaños, matrimonios, comuniones y celebraciones especiales.
          </p>
        </div>
        <div className="imagen col-md-4">
          <img src="/img/nosotros-2.jpg" alt="Pastel destacado" className="img-fluid rounded-3" />
        </div>
      </section>

      <section className="blog py-5 text-center bg-light">
        <h2>Blog y Novedades</h2>
        <div className="container mt-4">
          <article className="card mx-auto" style={{ maxWidth: "600px" }}>
            <div className="card-body">
              <h5 className="card-title">🎂 Nueva Torta Selva Negra</h5>
              <p className="card-text text-muted">Publicado el 1 de septiembre de 2025</p>
              <p>
                ¡Presentamos nuestra nueva torta Selva Negra, hecha con ingredientes de la mejor
                calidad y apta para celíacos!
              </p>
            </div>
            <img src="/img/selvanegra2.png" alt="Selva Negra" className="card-img-bottom" />
          </article>
        </div>
      </section>

      <Footer />
    </>
  );
}
