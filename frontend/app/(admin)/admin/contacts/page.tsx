'use client';
import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const data = await api.get<any[]>('/contact');
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch contact messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Contact Messages</h1>
        <p className="text-slate-500 mt-2">View inquiries submitted by users on the website.</p>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email & Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Message Extract</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-4 text-center text-slate-500">Loading messages...</td></tr>
            ) : messages.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-4 text-center text-slate-500">No contact messages received yet.</td></tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{msg.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    <div>{msg.email}</div>
                    <div>{msg.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">{msg.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-dazz-navy hover:text-dazz-gold transition-colors mr-4">View</button>
                    <button className="text-red-600 hover:text-red-900 transition-colors">Delete</button>
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
