import { expect, describe, it, cy } from "local-cypress";
import React from "react";
import { mount } from "@cypress/react";

import NotFoundPage from "./NotFoundPage";
import { Box, colors } from "@imtbl/design-system";

describe("<AssetDetailsContent />", () => {
  it("test 1", () => {
    mount(
      <Box backgroundColor={colors.bg[700]} padding="30px">
        <NotFoundPage />
      </Box>
    );
  });

  it("test 2", () => {
    mount(
      <Box backgroundColor={colors.bg[700]} padding="30px">
        <NotFoundPage />
      </Box>
    );
  });
});
