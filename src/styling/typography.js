import Typography from 'typography';
import 'typeface-crimson-text';
import 'typeface-fira-mono';
import 'typeface-raleway';

const typography = new Typography({
  baseFontSize: '21px',
  baseLineHeight: 1.25,
  bodyFontFamily: ['Crimson Text', 'serif'],
  bodyColor: 'rgba(0, 0, 0, 0.9)', // Read at bottom.
  bodyWeight: 400,
  boldWeight: 600,
  headerFontFamily: ['Raleway', 'sans-serif'],
  headerWeight: 400,
  includeNormalize: false,
  scaleRatio: 1.65,
  overrideStyles: () => ({
    '@media only screen and (max-width: 576px)': {
      html: {
        fontSize: '19px',
      },
    },
  }),
});

const { rhythm } = typography;

export default typography;
export { rhythm };
