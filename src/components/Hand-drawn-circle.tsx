import React, { useRef, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface MarkerProps {
  style: string;
  children?: React.ReactNode;
  run?: () => void;
}

const Marker: React.FC<MarkerProps> = ({ style, children, run }) => {
  const fullURL = typeof window !== "undefined" ? window.location.href : "";
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!markerRef.current) return;

    const ns = "http://www.w3.org/2000/svg";
    const marker = markerRef.current;
    const width = marker.offsetWidth;
    const height = 2 * marker.offsetHeight;
    const svg = document.createElementNS(ns, "svg");

    svg.setAttribute(
      "style",
      `width: ${width}px; height: ${height}px; transform: scale(${
        (2 * width) / height
      }, 1)`
    );
    svg.setAttribute("width", width.toString());
    svg.setAttribute("height", height.toString());
    svg.setAttribute("viewBox", "-1 -1 2 2");

    marker.appendChild(svg);

    const path = document.createElementNS(ns, "path");
    path.setAttribute("pathLength", "100");
    path.setAttribute("vector-effect", "non-scaling-stroke");
    svg.appendChild(path);

    const setCircle = (show_element: boolean) => {
      path.style.visibility = show_element ? "visible" : "hidden";
      const pathLength = 1000 * path.getTotalLength();
      path.setAttribute("d", circlePath(-0.15, 0.05, 150, 190, 0.05, 0.3));
      path.setAttribute("stroke-dasharray", pathLength.toString());
      path.setAttribute("stroke-dashoffset", pathLength.toString());
    };

    const circlePath = (
      dr_min: number,
      dr_max: number,
      θ0_min: number,
      θ0_max: number,
      dθ_min: number,
      dθ_max: number
    ): string => {
      var c = 0.551915024494,
        β = Math.atan(c),
        d = Math.sqrt(c * c + 1 * 1),
        r = 0.9,
        θ = ((θ0_min + Math.random() * (θ0_max - θ0_min)) * Math.PI) / 180,
        path = "M";

      path += [r * Math.sin(θ), r * Math.cos(θ)];
      path += " C" + [d * r * Math.sin(θ + β), d * r * Math.cos(θ + β)];

      for (var i = 0; i < 4; i++) {
        θ += (Math.PI / 2) * (1 + dθ_min + Math.random() * (dθ_max - dθ_min));
        r *= 1 + dr_min + Math.random() * (dr_max - dr_min);
        path +=
          " " +
          (i ? "S" : "") +
          [d * r * Math.sin(θ - β), d * r * Math.cos(θ - β)];
        path += " " + [r * Math.sin(θ), r * Math.cos(θ)];
      }
      return path;
    };

    setCircle(false);
    setCircle(false);

    marker.addEventListener("mouseover", () => setCircle(true));

    return () => marker.removeEventListener("mouseover", () => setCircle(true));
  }, []);
  return (
    <CopyToClipboard
      text={fullURL}
      onCopy={() => {
        console.log({ copied: true, url: fullURL });
      }}
    >
      <span
        className={`${style} marker md:inline-block hidden`}
        ref={markerRef}
        onClick={run}
      >
        {children}
      </span>
    </CopyToClipboard>
  );
};

export default Marker;
