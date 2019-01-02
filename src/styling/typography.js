import Typography from 'typography';
import 'typeface-fira-mono';
import 'typeface-lato';
import 'typeface-spectral';

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.4,
  bodyFontFamily: ['Spectral', 'serif'],
  bodyColor: 'rgba(0, 0, 0, 0.9)', // Read at bottom.
  bodyWeight: 400,
  boldWeight: 500,
  headerFontFamily: ['Lato', 'sans-serif'],
  headerWeight: 400,
  includeNormalize: false,
  scaleRatio: 2,
  overrideStyles: () => ({
    '@media only screen and (max-width: 576px)': {
      html: {
        fontSize: '16px',
      },
    },
  }),
});

const { rhythm } = typography;

export default typography;
export { rhythm };
