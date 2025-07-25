'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Medico } from '../interfaces/medico';

export default function MedicosPage() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [editingMedico, setEditingMedico] = useState<Medico | null>(null);
  const [newMedico, setNewMedico] = useState<Omit<Medico, 'medicoID' | 'fechaContratacion' | 'estado'>>({
    cedula: '',
    nombre: '',
    apellido: '',
    especialidad: '',
    telefono: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:5171/api/Medicos';

  useEffect(() => {
    fetchMedicos();
  }, []);

  const fetchMedicos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Medico[]>(API_URL);
      setMedicos(response.data);
    } catch (error) {
      handleError(error, "Error fetching medicos:");
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error: unknown, context: string) => {
    if (axios.isAxiosError(error)) {
      console.error(context, error.message);
      let errorMessage = error.message;

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        errorMessage = error.response.data.message || error.message;
      } else if (error.request) {
        console.error("No response received:", error.request);
      }

      setError(errorMessage);
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error("Unexpected error:", errorMessage);
      setError(errorMessage);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingMedico) {
      setEditingMedico({ ...editingMedico, [name]: value });
    } else {
      setNewMedico({ ...newMedico, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (editingMedico) {
        await axios.put(`${API_URL}/${editingMedico.medicoID}`, editingMedico);
        setEditingMedico(null);
      } else {
        const medicoToCreate = {
          ...newMedico,
          fechaContratacion: new Date().toISOString(),
          estado: 'Activo',
        };
        await axios.post(API_URL, medicoToCreate);
        setNewMedico({
          cedula: '',
          nombre: '',
          apellido: '',
          especialidad: '',
          telefono: '',
          email: '',
        });
      }
      await fetchMedicos();
    } catch (error) {
      handleError(error, editingMedico ? "Error updating medico:" : "Error creating medico:");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro que desea eliminar este médico?')) return;

    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchMedicos();
    } catch (error) {
      handleError(error, "Error deleting medico:");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (medico: Medico) => {
    setEditingMedico({...medico});
  };

  const handleCancelEdit = () => {
    setEditingMedico(null);
  };

  return (
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5">Gestión de Médicos</h1>

        {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="mb-5 border border-gray-300 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{editingMedico ? 'Editar Médico' : 'Agregar Nuevo Médico'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cédula:</label>
              <input
                  type="text"
                  name="cedula"
                  value={editingMedico ? editingMedico.cedula : newMedico.cedula}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
              <input
                  type="text"
                  name="nombre"
                  value={editingMedico ? editingMedico.nombre : newMedico.nombre}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido:</label>
              <input
                  type="text"
                  name="apellido"
                  value={editingMedico ? editingMedico.apellido : newMedico.apellido}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad:</label>
              <input
                  type="text"
                  name="especialidad"
                  value={editingMedico ? editingMedico.especialidad : newMedico.especialidad}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono:</label>
              <input
                  type="tel"
                  name="telefono"
                  value={editingMedico ? editingMedico.telefono : newMedico.telefono}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
              <input
                  type="email"
                  name="email"
                  value={editingMedico ? editingMedico.email : newMedico.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          {editingMedico && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado:</label>
                <select
                    name="estado"
                    value={editingMedico.estado}
                    onChange={(e) => setEditingMedico({...editingMedico, estado: e.target.value})}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
          )}
          <div className="flex items-center gap-2">
            <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Procesando...' : editingMedico ? 'Actualizar Médico' : 'Agregar Médico'}
            </button>
            {editingMedico && (
                <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={isLoading}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
            )}
          </div>
        </form>

        <h2 className="text-xl font-semibold mb-4">Lista de Médicos</h2>
        {isLoading && !medicos.length ? (
            <div className="text-center py-8">Cargando médicos...</div>
        ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Cédula</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Nombre</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Apellido</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Especialidad</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Teléfono</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Estado</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {medicos.length > 0 ? (
                    medicos.map((medico) => (
                        <tr key={medico.medicoID} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">{medico.medicoID}</td>
                          <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">{medico.cedula}</td>
                          <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">{medico.nombre}</td>
                          <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">{medico.apellido}</td>
                          <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">{medico.especialidad}</td>
                          <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">{medico.telefono}</td>
                          <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">{medico.email}</td>
                          <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          medico.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {medico.estado}
                      </span>
                          </td>
                          <td className="py-2 px-4 border-b border-gray-300 text-sm">
                            <div className="flex gap-2">
                              <button
                                  onClick={() => handleEdit(medico)}
                                  disabled={isLoading}
                                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Editar
                              </button>
                              <button
                                  onClick={() => handleDelete(medico.medicoID)}
                                  disabled={isLoading}
                                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                      <td colSpan={9} className="py-4 text-center text-gray-500">
                        No hay médicos registrados
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
        )}
      </div>
  );
}