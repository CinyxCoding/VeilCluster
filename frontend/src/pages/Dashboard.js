// src/pages/Dashboard.js
import React from "react";

export default function Dashboard({ user }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Welcome, {user.username}!</h1>
      <p>Faction: {user.faction}</p>
      <p>This is your dashboard. Missions and stats will appear here.</p>
    </div>
  );
}
