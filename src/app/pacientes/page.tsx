'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Paciente } from '../interfaces/paciente';

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null);
  const [newPaciente, setNewPaciente] = useState<Omit<Paciente, 'pacienteID' | 'fechaRegistro' | 'estado'>>({
    cedula: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    genero: '',
    direccion: '',
    telefono: '',
    email: '',
    tipoSangre: '',
    alergias: '',
  });

  const API_URL = 'http://localhost:5171/api/Paciente';

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const response = await axios.get<Paciente[]>(API_URL);
      setPacientes(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching pacientes:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editingPaciente) {
      setEditingPaciente({ ...editingPaciente, [name]: value });
    } else {
      setNewPaciente({ ...newPaciente, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPaciente) {
        await axios.put(`${API_URL}/${editingPaciente.pacienteID}`, editingPaciente);
        setEditingPaciente(null);
      } else {
        const pacienteToCreate = {
          ...newPaciente,
          fechaRegistro: new Date().toISOString(),
          estado: 'Activo',
        };
        await axios.post(API_URL, pacienteToCreate);
        setNewPaciente({
          cedula: '',
          nombre: '',
          apellido: '',
          fechaNacimiento: '',
          genero: '',
          direccion: '',
          telefono: '',
          email: '',
          tipoSangre: '',
          alergias: '',
        });
      }
      fetchPacientes();
    } catch (error) {
      console.error("Error saving paciente:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro que desea eliminar este paciente?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPacientes();
    } catch (error) {
      console.error("Error deleting paciente:", error);
    }
  };

  const handleEdit = (paciente: Paciente) => {
    setEditingPaciente(paciente);
  };

  return (
      <div className="container mx-auto p-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Pacientes</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {editingPaciente ? 'Editar Paciente' : 'Agregar Nuevo Paciente'}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Columna 1 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cédula*</label>
                <input
                    type="text"
                    name="cedula"
                    value={editingPaciente ? editingPaciente.cedula : newPaciente.cedula}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
                <input
                    type="text"
                    name="nombre"
                    value={editingPaciente ? editingPaciente.nombre : newPaciente.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido*</label>
                <input
                    type="text"
                    name="apellido"
                    value={editingPaciente ? editingPaciente.apellido : newPaciente.apellido}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento*</label>
                <input
                    type="date"
                    name="fechaNacimiento"
                    value={editingPaciente ? editingPaciente.fechaNacimiento.split('T')[0] : newPaciente.fechaNacimiento}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Género*</label>
                <select
                    name="genero"
                    value={editingPaciente ? editingPaciente.genero : newPaciente.genero}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccione...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro</option>
                </select>
              </div>
            </div>

            {/* Columna 2 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección*</label>
                <input
                    type="text"
                    name="direccion"
                    value={editingPaciente ? editingPaciente.direccion : newPaciente.direccion}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono*</label>
                <input
                    type="tel"
                    name="telefono"
                    value={editingPaciente ? editingPaciente.telefono : newPaciente.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input
                    type="email"
                    name="email"
                    value={editingPaciente ? editingPaciente.email : newPaciente.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Sangre*</label>
                <select
                    name="tipoSangre"
                    value={editingPaciente ? editingPaciente.tipoSangre : newPaciente.tipoSangre}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccione...</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alergias</label>
                <input
                    type="text"
                    name="alergias"
                    value={editingPaciente ? editingPaciente.alergias : newPaciente.alergias}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {editingPaciente && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado*</label>
                    <select
                        name="estado"
                        value={editingPaciente.estado}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
              {editingPaciente && (
                  <button
                      type="button"
                      onClick={() => setEditingPaciente(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
              )}
              <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {editingPaciente ? 'Actualizar Paciente' : 'Agregar Paciente'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-700 p-6 pb-0">Lista de Pacientes</h2>

          <div className="overflow-x-auto p-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {pacientes.map((paciente) => (
                  <tr key={paciente.pacienteID} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{paciente.cedula}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{paciente.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{paciente.apellido}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{paciente.telefono}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{paciente.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${paciente.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {paciente.estado}
                    </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                          onClick={() => handleEdit(paciente)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Editar
                      </button>
                      <button
                          onClick={() => handleDelete(paciente.pacienteID)}
                          className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}