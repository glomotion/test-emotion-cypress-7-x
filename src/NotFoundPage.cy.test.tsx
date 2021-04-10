import { expect, describe, it, cy } from "local-cypress";
import React from "react";
import { mount } from "@cypress/react";
import { Box, colors } from "@imtbl/design-system";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import NotFoundPage from "./NotFoundPage";

const cssCache = createCache({
  key: "mooo-cow",
  container: document.body,
  prepend: true,
});

describe("<AssetDetailsContent />", () => {
  it("test 1", () => {
    mount(
      <CacheProvider value={cssCache}>
        <Box backgroundColor={colors.bg[700]} padding="30px">
          <NotFoundPage />
        </Box>
      </CacheProvider>
    );
  });

  it("test 2", () => {
    mount(
      <CacheProvider value={cssCache}>
        <Box backgroundColor={colors.bg[700]} padding="30px">
          <NotFoundPage />
        </Box>
      </CacheProvider>
    );
  });
});
