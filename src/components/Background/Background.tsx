import "./Background.css";

export default function Background() {
  return (
    <div className="background">
      <div className="glow"></div>

      <div className="particles">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <div className="fragments">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="fragment"></div>
        ))}
      </div>
    </div>
  );
}