export function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="fw-bold text-primary">Bienvenido a Pastelería SpaceDaniel 🍰</h1>
      <p className="lead">Delicias artesanales hechas con amor y dedicación.</p>
      <img
        src="/img/torta.jpg"
        alt="Torta destacada"
        className="img-fluid rounded shadow mt-3"
        style={{ maxWidth: "400px" }}
      />
    </div>
  );
}
