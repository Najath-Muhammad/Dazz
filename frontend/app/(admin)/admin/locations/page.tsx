'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/Button';
import { DataTable, Column } from '@/components/admin/DataTable';
import { Plus, Edit, Trash2, CheckCircle, XCircle, ArrowUp, ArrowDown } from 'lucide-react';

export default function LocationsAdminPage() {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      const data = await api.get('/locations/all');
      setLocations((data as any).data || []);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLocations(); }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this location?')) return;
    try {
      await api.delete(`/locations/${id}`);
      setLocations(locations.filter((loc) => loc._id !== id));
    } catch (error) {
      console.error('Failed to delete location:', error);
      alert('Failed to delete location');
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await api.put(`/locations/${id}`, { isActive: !currentStatus });
      setLocations(locations.map((loc) => loc._id === id ? { ...loc, isActive: !currentStatus } : loc));
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === locations.length - 1)) return;
    const newLocations = [...locations];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const currentOrder = newLocations[index].order || 0;
    const swapOrder = newLocations[swapIndex].order || 0;
    const item1 = newLocations[index];
    const item2 = newLocations[swapIndex];
    try {
      await api.put(`/locations/${item1._id}`, { order: swapOrder === currentOrder ? swapIndex : swapOrder });
      await api.put(`/locations/${item2._id}`, { order: swapOrder === currentOrder ? index : currentOrder });
      fetchLocations();
    } catch (error) {
      console.error('Failed to reorder:', error);
    }
  };

  const columns: Column<any>[] = [
    {
      key: 'order',
      header: 'Order',
      render: (loc, index) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleReorder(index, 'up')}
            disabled={index === 0}
            className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 transition rounded"
          >
            <ArrowUp size={16} />
          </button>
          <button
            onClick={() => handleReorder(index, 'down')}
            disabled={index === locations.length - 1}
            className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 transition rounded"
          >
            <ArrowDown size={16} />
          </button>
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Location Name',
      render: (loc) => (
        <span className="font-semibold text-slate-900">{loc.name?.en || 'Unnamed'}</span>
      ),
    },
    {
      key: 'city',
      header: 'City, Country',
      render: (loc) => (
        <span className="text-slate-600 text-sm">{loc.city?.en}, {loc.country?.en}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (loc) => (
        <button
          onClick={() => handleToggleActive(loc._id, loc.isActive)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
            loc.isActive
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          {loc.isActive ? <CheckCircle size={14} /> : <XCircle size={14} />}
          {loc.isActive ? 'ACTIVE' : 'INACTIVE'}
        </button>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (loc) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/locations/${loc._id}/edit`}
            className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition"
          >
            <Edit size={16} />
          </Link>
          <button
            onClick={() => handleDelete(loc._id)}
            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

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

      <DataTable
        columns={columns}
        data={locations}
        loading={loading}
        emptyMessage="No locations found. Add your first location to display on the map."
        emptyAction={
          <Link href="/admin/locations/new" className="text-dazz-navy font-semibold hover:underline text-sm">
            Add your first location →
          </Link>
        }
      />
    </div>
  );
}
