'use client';
import React, { useEffect, useState } from 'react';
import LocationForm from '@/components/admin/locations/LocationForm';
import { api } from '@/lib/api';

export default function EditLocationPage({ params }: { params: Promise<{ id: string }> }) {
  const [initialData, setInitialData] = useState<SafeAny>(null);
  const [loading, setLoading] = useState(true);
  
  // Use React.use to unwrap params correctly in Next.js 15+
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.get(`/locations/${id}`);
        setInitialData((data as SafeAny).data);
      } catch (error) {
        console.error('Failed to fetch location:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!initialData) return <div>Location not found</div>;

  return <LocationForm initialData={initialData} isEdit />;
}
