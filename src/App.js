import React, { useState, useEffect } from "react";

export default function App() {
  const API_URL = "https://umb-backend-php.onrender.com/tareas";

  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState("");

  // Obtener tareas (GET)
  const cargarTareas = async () => {
    try {
      const respuesta = await fetch(API_URL);
      const datos = await respuesta.json();
      setTareas(datos);
    } catch (error) {
      console.log("Error conectando con la API:", error);
    }
  };

  // Crear tarea (POST)
  const agregarTarea = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titulo: texto }),
      });

      setTexto("");
      cargarTareas();
    } catch (error) {
      console.log("Error creando tarea:", error);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  return (
    <div style={{ width: "300px", margin: "50px auto" }}>
      <h2>Gestor de Tareas</h2>

      {/* Formulario */}
      <form onSubmit={agregarTarea}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      {/* Lista */}
      <ul>
        {tareas.map((t) => (
          <li key={t.id}>{t.titulo}</li>
        ))}
      </ul>
    </div>
  );
}
