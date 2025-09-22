import React, { useEffect, useState, useContext } from "react";
import { ApiContext, AuthContext } from "../App";

export default function Profile({ i18n }) {
  const { api } = useContext(ApiContext);
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!auth.token) return;

    fetch(`${api}/api/user`, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${auth.token}`
      }
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, [api, auth.token]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>{i18n.profile}</h2>
      <p><strong>{i18n.name}:</strong> {user.name}</p>
      <p><strong>{i18n.email}:</strong> {user.email}</p>
    </div>
  );
}
