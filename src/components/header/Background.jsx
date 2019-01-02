import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Trianglify from 'trianglify';

const Canvas = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 1;
`;

class Background extends React.Component {
  static createPaths(polys, strokeWidth) {
    const paths = Array.from({ length: polys.length });
    let d;
    let fill;
    let stroke;
    let poly;
    for (let i = 0; i < polys.length; i += 1) {
      poly = polys[i];

      d = `M${poly[1].join('L')}Z`;
      fill = `${poly[0]}`;
      stroke = `${poly[0]}`;

      paths[i] = <path key={i} d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    }

    return paths;
  }

  render() {
    const {
      polys,
      opts: { stroke_width: strokeWidth },
    } = Trianglify(this.props);
    const { width, height } = this.props;

    return (
      <Canvas>
        <svg width={width} height={height}>
          {Background.createPaths(polys, strokeWidth)}
        </svg>
      </Canvas>
    );
  }
}

Background.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Background;
