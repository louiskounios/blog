import styled from 'styled-components';

import media from 'styling/media';
import { rhythm } from 'styling/typography';

const MainContent = styled.main`
  display: flex;
  flex-direction: column;

  margin: 0 auto ${rhythm(2)} auto;
  ${media.phone`
    margin-bottom: ${rhythm(1.2)};
  `}
  max-width: 800px;
  z-index: 2;
`;

export default MainContent;
