"use client";

import React, { useState } from "react";
import { Users, Shield, User } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Admin LankaExplore",
      email: "admin@lankaexplore.com",
      role: "admin",
      country: "Sri Lanka",
      joined: "Jan 2026",
    },
    {
      id: "2",
      name: "Elena Rostova",
      email: "elena@traveler.com",
      role: "user",
      country: "Germany",
      joined: "Feb 2026",
    },
    {
      id: "3",
      name: "Kasun Jayawardena",
      email: "kasun@ceylon.lk",
      role: "user",
      country: "Sri Lanka",
      joined: "Feb 2026",
    },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-brandDark">Registered Users</h1>
        <p className="text-xs text-brandDark/60 mt-1">Platform user accounts, administrators, and contributors.</p>
      </div>

      <div className="rounded-3xl bg-white border border-brandDark/8 shadow-subtle overflow-hidden">
        <table className="w-full text-left text-xs text-brandDark">
          <thead className="bg-brandBg text-brandDark/70 uppercase text-[10px] tracking-wider border-b border-brandDark/8">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Country</th>
              <th className="px-6 py-4">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brandDark/5">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-brandBg/60 transition-colors">
                <td className="px-6 py-4 font-semibold flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    {u.name.charAt(0)}
                  </div>
                  <span>{u.name}</span>
                </td>
                <td className="px-6 py-4 text-brandDark/70">{u.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      u.role === "admin"
                        ? "bg-secondary/20 text-brandDark"
                        : "bg-brandBg text-brandDark/70"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4">{u.country}</td>
                <td className="px-6 py-4 text-brandDark/50">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
