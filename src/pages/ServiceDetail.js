import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ApiContext } from '../App';

export default function ServiceDetail({ i18n }) {
  const { id } = useParams();
  const { api } = useContext(ApiContext);
  const [service, setService] = useState(null);

  useEffect(() => {
    fetch(`${api}/api/services`, { headers: { 'Accept': 'application/json' } })
      .then(res => res.json())
      .then(list => setService(list.find(s => s.id === parseInt(id))))
      .catch(() => setService(null));
  }, [api, id]);

  if (!service) return <div>Loading...</div>;

  return (
    <div>
      <h2>{service.name}</h2>
      <p>{service.description}</p>
      <p>Price: ${service.price}</p>
      <Link to={`/book/${service.id}`} className="btn btn-primary">
        {i18n.bookNow}
      </Link>
    </div>
  );
}
