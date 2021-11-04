import axios from "axios";

export default function buildClient({ req }) {
  const isServerSide = typeof window === "undefined";

  if (isServerSide) {
    const isLocalDev = false; //process.env.NODE_ENV === "development";
    const baseURL = isLocalDev
      ? "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local"
      : "http://my-tickets.shop";

    return axios.create({
      baseURL,
      headers: req.headers,
    });
  }

  return axios.create({
    baseUrl: "/",
  });
}
