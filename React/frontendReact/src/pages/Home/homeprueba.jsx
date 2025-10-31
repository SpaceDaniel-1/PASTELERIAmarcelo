import "./Home.css";

export function Home() {
  return (
    <div className="container mt-4">
      {/* Bienvenida */}
      <section className="text-center">
        <h1>Somos Marcelo Pastelería</h1>
        <p>Delicias y pasteles artesanales con el toque de Marcelo</p>
        <img src="/img/marcelo.png" alt="Logo Marcelo Pastelería" width="300" />
      </section>

      {/* Sobre nosotros */}
      <section className="mt-5 row align-items-center">
        <div className="col-md-6">
          <h2>Sobre nosotros</h2>
          <p>“Marcelo”, pastelero proveniente de Maipú con años de experiencia en repostería, se dedica a realizar tortas y delicias a pedido.</p>
          <p>Especialistas en cumpleaños, matrimonios, primeras comuniones y celebraciones especiales.</p>
        </div>
        <div className="col-md-6 text-center">
          <img src="/img/nosotros-2.jpg" alt="Pastel destacado" className="img-fluid rounded shadow" />
        </div>
      </section>

      {/* Blog */}
      <section className="mt-5">
        <h2>Blog y Novedades</h2>
        <article className="card shadow-sm p-3 mt-3">
          <h3>Nueva torta Selva Negra 🎂</h3>
          <p>Publicado el 1 de septiembre de 2025</p>
          <p>Hecha con ingredientes de la mejor calidad y apta para celíacos. Disponible ahora en tienda.</p>
          <img src="/img/selvanegra2.png" alt="Selva Negra" width="250" />
        </article>
      </section>
    </div>
  );
}
