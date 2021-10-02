import axios from "axios";

export default function buildClient({ req }) {
  const isServerSide = typeof window === "undefined";
  if (isServerSide) {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  }

  return axios.create({
    baseUrl: "/",
  });
}
