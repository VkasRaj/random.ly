import React, { Fragment } from "react";

const RandomLy = props => {
  return (
    <Fragment>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 522 435"
        width={props.width}
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="389.81"
            y1="60.79"
            x2="53.81"
            y2="354.79"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00b7b2" />
            <stop offset="1" stopColor="aqua" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-2"
            x1="90.57"
            y1="16.85"
            x2="390.57"
            y2="252.85"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00dd8d" />
            <stop offset="1" stopColor="#0fa" />
          </linearGradient>
        </defs>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <rect
              y="24"
              width="490"
              height="327"
              style={{fill:"url('#linear-gradient')"}}
            />
            <polygon points="0 351 101 351 0 435 0 351" style={{fill:"aqua"}} />
            <rect
              x="32"
              width="490"
              height="327"
              style={{fill:"url('#linear-gradient-2')"}}
            />
            <polygon
              points="522 327 421 327 522 411 522 327"
              style={{fill:"#0fa"}}
            />
            <rect x="124" y="78" width="312" height="29" style={{fill:"#fff"}} />
            <rect x="124" y="149" width="312" height="29" style={{fill:"#fff"}} />
            <rect x="124" y="220" width="312" height="29" style={{fill:"#fff"}} />
          </g>
        </g>
      </svg>
    </Fragment>
  );
};

export default RandomLy;
