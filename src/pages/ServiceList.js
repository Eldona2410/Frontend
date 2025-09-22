import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApiContext } from '../App';

export default function ServiceList({ i18n }) {
  const { type } = useParams();
  const { api } = useContext(ApiContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${api}/api/services`, { headers: { 'Accept': 'application/json' } })
      .then(res => res.json())
      .then(data => setServices(Array.isArray(data) ? data : data.data || []))
      .catch(() => setServices([]));
  }, [api]);

  const filtered = services.filter(s => s.type === type);

  return (
    <div>
      <h2>{type === 'workshop' ? i18n.workshops : i18n.carWash}</h2>
      <div className="row">
        {filtered.map(service => (
          <div className="col-md-4" key={service.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5>{service.name}</h5>
                <p>{service.description}</p>
                <div className="d-flex justify-content-between">
                  <Link to={`/service/${service.id}`} className="btn btn-sm btn-outline-primary">
                    {i18n.viewDetails}
                  </Link>
                  <Link to={`/book/${service.id}`} className="btn btn-sm btn-primary">
                    {i18n.bookNow}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="alert alert-info">No services found.</div>}
      </div>
    </div>
  );
}
