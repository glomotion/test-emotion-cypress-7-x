import { expect, describe, it, cy, beforeEach } from "local-cypress";
import React from "react";
import { mount } from "@cypress/react";
import { sheet } from "@emotion/css";
import { Box, colors } from "@imtbl/design-system";

import App from ".";

describe("<AssetDetailsContent />", () => {
  beforeEach(() => {
    sheet.tags.forEach((tag) => {
      document.body.appendChild(tag);
    });
    cy.intercept(
      {
        method: "GET",
        pathname: "/config.json",
      },
      (req) => {
        req.reply({
          fixture: "config.json",
        });
      }
    ).as("configStub");
  });

  it("test 1", () => {
    mount(<App />);
    cy.waitFor("@collectionsStub");
  });

  it("test 2", () => {
    mount(<App />);
    cy.waitFor("@collectionsStub");
  });
});
