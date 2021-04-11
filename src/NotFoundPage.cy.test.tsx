import { expect, describe, it, cy, beforeEach } from "local-cypress";
import React from "react";
import { mount } from "@cypress/react";
import { sheet } from "@emotion/css";
import { Box, colors } from "@imtbl/design-system";

import NotFoundPage from "./NotFoundPage";

describe("<AssetDetailsContent />", () => {
  beforeEach(() => {
    console.log("@@@@@@@", sheet);
    sheet.tags.forEach((tag) => {
      document.body.appendChild(tag);
    });
  });

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
