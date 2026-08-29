'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/Button';
import { Plus, Edit, Trash2, CheckCircle, XCircle, ArrowUp, ArrowDown } from 'lucide-react';

export default function LocationsAdminPage() {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      const data = await api.get('/locations/all');
      setLocations(data.data || []);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this location?')) return;
    try {
      await api.delete(`/locations/${id}`);
      setLocations(locations.filter(loc => loc._id !== id));
    } catch (error) {
      console.error('Failed to delete location:', error);
      alert('Failed to delete location');
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await api.put(`/locations/${id}`, { isActive: !currentStatus });
      setLocations(locations.map(loc => loc._id === id ? { ...loc, isActive: !currentStatus } : loc));
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === locations.length - 1)
    ) return;

    const newLocations = [...locations];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap order values
    const currentOrder = newLocations[index].order || 0;
    const swapOrder = newLocations[swapIndex].order || 0;
    
    // Actually, if orders are same, we just assign arbitrary new orders to force the swap
    const item1 = newLocations[index];
    const item2 = newLocations[swapIndex];
    
    try {
      // Update in DB
      await api.put(`/locations/${item1._id}`, { order: swapOrder === currentOrder ? swapIndex : swapOrder });
      await api.put(`/locations/${item2._id}`, { order: swapOrder === currentOrder ? index : currentOrder });
      
      // Refresh list to get accurate sorting from backend
      fetchLocations();
    } catch (error) {
      console.error('Failed to reorder:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Locations Map</h1>
          <p className="text-slate-500 mt-2">Manage interactive map locations for the Contact Us page.</p>
        </div>
        <Link href="/admin/locations/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={18} /> Add Location
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500">
            <tr>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Location Name</th>
              <th className="px-6 py-4">City, Country</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {locations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  No locations found. Add your first location to display on the map.
                </td>
              </tr>
            ) : (
              locations.map((loc, index) => (
                <tr key={loc._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 w-24">
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleReorder(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 transition"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button 
                        onClick={() => handleReorder(index, 'down')}
                        disabled={index === locations.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 transition"
                      >
                        <ArrowDown size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {loc.name?.en || 'Unnamed'}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {loc.city?.en}, {loc.country?.en}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleToggleActive(loc._id, loc.isActive)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        loc.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {loc.isActive ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {loc.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link href={`/admin/locations/${loc._id}/edit`} className="inline-block text-blue-600 hover:text-blue-800 transition">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(loc._id)} className="inline-block text-red-500 hover:text-red-700 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
