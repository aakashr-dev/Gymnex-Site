import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useDashboardOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const res = await api.getDashboardOverview();
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { data, loading, error, refetch };
};

export const useBranches = (params = {}) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await api.getBranches(params);
      if (data && data.length > 0) setBranches(data);
      setLoading(false);
    };
    load();
  }, [JSON.stringify(params)]);

  return { branches, loading };
};

export const useMembers = (params = {}) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await api.getMembers(params);
      if (data && data.length > 0) setMembers(data);
      setLoading(false);
    };
    load();
  }, [JSON.stringify(params)]);

  return { members, loading };
};

export const useTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await api.getTrainers();
      if (data && data.length > 0) setTrainers(data);
      setLoading(false);
    };
    load();
  }, []);

  return { trainers, loading };
};

export const usePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await api.getPrograms();
      if (data && data.length > 0) setPrograms(data);
      setLoading(false);
    };
    load();
  }, []);

  return { programs, loading };
};

export const useMemberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await api.getMemberships();
      if (data && data.length > 0) setMemberships(data);
      setLoading(false);
    };
    load();
  }, []);

  return { memberships, loading };
};

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await api.getEvents();
      if (data && data.length > 0) setEvents(data);
      setLoading(false);
    };
    load();
  }, []);

  return { events, loading };
};

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await api.getReviews();
      if (data && data.length > 0) setReviews(data);
      setLoading(false);
    };
    load();
  }, []);

  return { reviews, loading };
};
