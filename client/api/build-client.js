import axios from "axios";

export default function buildClient({ req }) {
  const isServerSide = typeof window === "undefined";

  if (isServerSide) {
    const isLocalDev = process.env.NODE_ENV === "development";
    const baseURL = isLocalDev
      ? "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local"
      : `http://${req.headers.host}`;

    return axios.create({
      baseURL,
      timeout: 1000,
      headers: req.headers,
    });
  }

  return axios.create({
    baseUrl: "/",
  });
}
