import React from "react";
function MainContent() { 
    return(
        <main className="container py-5">
            <div className="row">
                <div className="col-12">
                    <h2 className="section-title mb-4">Novedades y Comunidad</h2>
                    <div className="row justify-content-center g-4">
                        
                        
                        <div className="col-12 col-md-4">
                            <div className="card h-100 shadow-sm">
                                <img src="img/fotos_perfil.png" className="card-img-top" alt="Gato con dueños" />
                                <div className="card-body">
                                    <h5 className="card-title poppins-font">Sube tu primera foto</h5>
                                    <p className="card-text open-sans-font">Nunca es tarde para unirte a Pet Society y compartir las aventuras de tu mascota.</p>
                                    <a href="#" className="btn btn-primary">Ver más</a>
                                </div>
                            </div>
                        </div>
                        
                       
                        <div className="col-12 col-md-4">
                            <div className="card h-100 shadow-sm">
                                <img src="img/curacion1.png" className="card-img-top" alt="Perro siendo examinado" />
                                <div className="card-body">
                                    <h5 className="card-title poppins-font">Mat se acaba de unir a la familia</h5>
                                    <p className="card-text open-sans-font">Mi bebé se curó hace poco con los veterinarios que hay en el sitio web, excelente servicio.</p>
                                    <a href="explorar" className="btn btn-primary">Ver más</a>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="col-12 col-md-4">
                            <div className="card h-100 shadow-sm">
                                <img src="img/veterinario.jpg" className="card-img-top" alt="Logo de Pet Society" />
                                <div className="card-body">
                                    <h5 className="card-title poppins-font">Conoce al Dr. Maturaga</h5>
                                    <p className="card-text open-sans-font">Uno de los mejores doctores en enfermedades animales. Con una calificación de 5 estrellas.</p>
                                    <a href="veterinarios" className="btn btn-primary">Explorar veterinarios</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MainContent;