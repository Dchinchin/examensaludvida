'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Cita } from '../interfaces/cita';
import { Medico } from '../interfaces/medico';
import { Paciente } from '../interfaces/paciente';

export default function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [editingCita, setEditingCita] = useState<Cita | null>(null);
  const [newCita, setNewCita] = useState<Omit<Cita, 'citaID' | 'fechaHora' | 'estado'>>({
    pacienteID: 0,
    medicoID: 0,
    tipoConsulta: '',
    notas: '',
  });

  const API_URL_CITAS = 'http://localhost:5171/api/Citas';
  const API_URL_MEDICOS = 'http://localhost:5171/api/Medicos';
  const API_URL_PACIENTES = 'http://localhost:5171/api/Paciente';

  useEffect(() => {
    fetchCitas();
    fetchMedicos();
    fetchPacientes();
  }, []);

  const fetchCitas = async () => {
    try {
      const response = await axios.get<Cita[]>(API_URL_CITAS);
      setCitas(response.data);
    } catch (error) {
      console.error("Error fetching citas:", error);
    }
  };

  const fetchMedicos = async () => {
    try {
      const response = await axios.get<Medico[]>(API_URL_MEDICOS);
      setMedicos(response.data);
    } catch (error) {
      console.error("Error fetching medicos:", error);
    }
  };

  const fetchPacientes = async () => {
    try {
      const response = await axios.get<Paciente[]>(API_URL_PACIENTES);
      setPacientes(response.data);
    } catch (error) {
      console.error("Error fetching pacientes:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingCita) {
      setEditingCita({ ...editingCita, [name]: value });
    } else {
      setNewCita({ ...newCita, [name]: Number(value) || value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCita) {
        await axios.put(`${API_URL_CITAS}/${editingCita.citaID}`, editingCita);
        setEditingCita(null);
      } else {
        const citaToCreate = {
          ...newCita,
          fechaHora: new Date().toISOString(),
          estado: 'Programada',
        };
        await axios.post(API_URL_CITAS, citaToCreate);
        setNewCita({
          pacienteID: 0,
          medicoID: 0,
          tipoConsulta: '',
          notas: '',
        });
      }
      fetchCitas();
    } catch (error) {
      console.error("Error saving cita:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro que desea eliminar esta cita?')) return;
    try {
      await axios.delete(`${API_URL_CITAS}/${id}`);
      fetchCitas();
    } catch (error) {
      console.error("Error deleting cita:", error);
    }
  };

  const handleEdit = (cita: Cita) => {
    setEditingCita(cita);
  };

  const getMedicoName = (medicoID: number) => {
    const medico = medicos.find(m => m.medicoID === medicoID);
    return medico ? `${medico.nombre} ${medico.apellido}` : 'Desconocido';
  };

  const getPacienteName = (pacienteID: number) => {
    const paciente = pacientes.find(p => p.pacienteID === pacienteID);
    return paciente ? `${paciente.nombre} ${paciente.apellido}` : 'Desconocido';
  };

  const getEstadoColor = (estado: string) => {
    switch(estado) {
      case 'Programada':
        return 'bg-blue-100 text-blue-800';
      case 'Completada':
        return 'bg-green-100 text-green-800';
      case 'Cancelada':
        return 'bg-red-100 text-red-800';
      case 'NoPresento':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
      <div className="container mx-auto p-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Citas Médicas</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {editingCita ? 'Editar Cita' : 'Agregar Nueva Cita'}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Columna 1 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paciente*</label>
                <select
                    name="pacienteID"
                    value={editingCita ? editingCita.pacienteID : newCita.pacienteID}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="0">Seleccione un paciente</option>
                  {pacientes.map((paciente) => (
                      <option key={paciente.pacienteID} value={paciente.pacienteID}>
                        {paciente.nombre} {paciente.apellido}
                      </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Médico*</label>
                <select
                    name="medicoID"
                    value={editingCita ? editingCita.medicoID : newCita.medicoID}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="0">Seleccione un médico</option>
                  {medicos.map((medico) => (
                      <option key={medico.medicoID} value={medico.medicoID}>
                        {medico.nombre} {medico.apellido}
                      </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Columna 2 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Consulta*</label>
                <select
                    name="tipoConsulta"
                    value={editingCita ? editingCita.tipoConsulta : newCita.tipoConsulta}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccione tipo</option>
                  <option value="Consulta General">Consulta General</option>
                  <option value="Control">Control</option>
                  <option value="Emergencia">Emergencia</option>
                  <option value="Examen">Examen</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              {editingCita && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado*</label>
                    <select
                        name="estado"
                        value={editingCita.estado}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Programada">Programada</option>
                      <option value="Completada">Completada</option>
                      <option value="Cancelada">Cancelada</option>
                      <option value="NoPresento">No se presentó</option>
                    </select>
                  </div>
              )}
            </div>

            {/* Textarea full width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
              <textarea
                  name="notas"
                  value={editingCita ? editingCita.notas : newCita.notas}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
              {editingCita && (
                  <button
                      type="button"
                      onClick={() => setEditingCita(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
              )}
              <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {editingCita ? 'Actualizar Cita' : 'Agregar Cita'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-700 p-6 pb-0">Lista de Citas</h2>

          <div className="overflow-x-auto p-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Médico</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consulta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notas</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {citas.map((cita) => (
                  <tr key={cita.citaID} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getPacienteName(cita.pacienteID)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getMedicoName(cita.medicoID)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(cita.fechaHora).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cita.tipoConsulta}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(cita.estado)}`}>
                      {cita.estado}
                    </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {cita.notas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {cita.estado !== 'Cancelada' && cita.estado !== 'Completada' ? (
                          <>
                            <button
                                onClick={() => handleEdit(cita)}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              Editar
                            </button>
                            <button
                                onClick={() => handleDelete(cita.citaID)}
                                className="text-red-600 hover:text-red-900"
                            >
                              Eliminar
                            </button>
                          </>
                      ) : (
                          <span className="text-gray-400">No editable</span>
                      )}
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