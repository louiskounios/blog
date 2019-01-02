import React from 'react';
import Helmet from 'react-helmet';

const SiteBaseMetadata = () => (
  <React.Fragment>
    <Helmet>
      <meta charset="utf=8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
      />

      <html lang="en" />
    </Helmet>
  </React.Fragment>
);

export default SiteBaseMetadata;
