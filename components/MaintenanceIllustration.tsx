interface MaintenanceIllustrationProps {
  color?: string;
}

export function MaintenanceIllustration({
  color = "#9333EA",
}: MaintenanceIllustrationProps) {
  return (
    <svg
      viewBox="0 0 300 240"
      width={300}
      height={240}
      className="drop-shadow-md"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Crane */}
      <g>
        {/* Left tower base */}
        <g>
          <line
            x1="60"
            y1="180"
            x2="60"
            y2="60"
            stroke={color}
            strokeWidth="3"
          />
          {/* Diagonal patterns on tower */}
          <line
            x1="57"
            y1="85"
            x2="63"
            y2="80"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.6"
          />
          <line
            x1="57"
            y1="115"
            x2="63"
            y2="110"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.6"
          />
          <line
            x1="57"
            y1="145"
            x2="63"
            y2="140"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.6"
          />
        </g>

        {/* Left crane top */}
        <g>
          <circle cx="60" cy="55" r="5" fill={color} />
          <line
            x1="55"
            y1="55"
            x2="35"
            y2="35"
            stroke={color}
            strokeWidth="2.5"
          />
          <circle cx="35" cy="35" r="4" fill={color} />
        </g>

        {/* Left crane cable */}
        <line
          x1="35"
          y1="39"
          x2="55"
          y2="120"
          stroke={color}
          strokeWidth="2"
          opacity="0.7"
        />
      </g>

      {/* Center building */}
      <g>
        {/* Building base */}
        <rect
          x="110"
          y="110"
          width="80"
          height="70"
          fill={color}
          opacity="0.15"
          stroke={color}
          strokeWidth="2"
        />

        {/* Building details - left side */}
        <rect
          x="120"
          y="125"
          width="15"
          height="20"
          fill={color}
          opacity="0.3"
          stroke={color}
          strokeWidth="1"
        />
        <rect
          x="145"
          y="125"
          width="15"
          height="20"
          fill={color}
          opacity="0.3"
          stroke={color}
          strokeWidth="1"
        />
        <rect
          x="170"
          y="125"
          width="15"
          height="20"
          fill={color}
          opacity="0.3"
          stroke={color}
          strokeWidth="1"
        />

        {/* Building roof lines */}
        <line
          x1="110"
          y1="110"
          x2="150"
          y2="60"
          stroke={color}
          strokeWidth="2.5"
        />
        <line
          x1="150"
          y1="60"
          x2="190"
          y2="110"
          stroke={color}
          strokeWidth="2.5"
        />
        <line
          x1="125"
          y1="95"
          x2="155"
          y2="70"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.5"
        />
        <line
          x1="155"
          y1="70"
          x2="175"
          y2="95"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.5"
        />
      </g>

      {/* Right Crane */}
      <g>
        {/* Right tower base */}
        <g>
          <line
            x1="240"
            y1="180"
            x2="240"
            y2="75"
            stroke={color}
            strokeWidth="3"
          />
          {/* Diagonal patterns on tower */}
          <line
            x1="237"
            y1="100"
            x2="243"
            y2="95"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.6"
          />
          <line
            x1="237"
            y1="130"
            x2="243"
            y2="125"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.6"
          />
          <line
            x1="237"
            y1="160"
            x2="243"
            y2="155"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.6"
          />
        </g>

        {/* Right crane top */}
        <g>
          <circle cx="240" cy="70" r="5" fill={color} />
          <line
            x1="245"
            y1="70"
            x2="265"
            y2="50"
            stroke={color}
            strokeWidth="2.5"
          />
          <circle cx="265" cy="50" r="4" fill={color} />
        </g>

        {/* Right crane cable */}
        <line
          x1="265"
          y1="54"
          x2="175"
          y2="130"
          stroke={color}
          strokeWidth="2"
          opacity="0.7"
        />
      </g>

      {/* Ground line */}
      <line
        x1="20"
        y1="180"
        x2="280"
        y2="180"
        stroke={color}
        strokeWidth="2"
        opacity="0.4"
      />

      {/* Decorative circles */}
      <circle cx="40" cy="30" r="4" fill={color} opacity="0.3" />
      <circle cx="270" cy="160" r="5" fill={color} opacity="0.25" />
    </svg>
  );
}
